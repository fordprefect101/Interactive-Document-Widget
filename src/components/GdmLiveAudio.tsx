/* tslint:disable */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {GoogleGenAI, LiveServerMessage, Modality, Session} from '@google/genai';
import {LitElement, css, html} from 'lit';
import {customElement, state, property} from 'lit/decorators.js';
import {createBlob, decode, decodeAudioData} from '../utils/index';
import './Visual3D';

// Helper to get the AudioContext class, accommodating vendor prefixes
const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20MB
type InstructionMode = 'file' | 'manual';

@customElement('gdm-live-audio')
export class GdmLiveAudio extends LitElement {
  @state() isRecording = false;
  @state() status = 'Choose instruction method: Upload a file or type manually.';
  @state() error = '';
  @state() private selectedFile: File | null = null;
  @state() private systemInstructionFromFile: string | null = null;
  @state() private isFileProcessing = false;
  @state() private isSessionInitialized = false;
  @state() private instructionMode: InstructionMode = 'file';
  @state() private manualSystemInstruction = '';

  private _apiKey: string | undefined;
  private _model: string = 'gemini-2.5-flash-preview-native-audio-dialog';

  get apiKey(): string | undefined {
    return this._apiKey;
  }

  set apiKey(value: string | undefined) {
    const oldValue = this._apiKey;
    this._apiKey = value;
    this.requestUpdate('apiKey', oldValue);
    if (value) {
      this.initClientOnly();
    }
  }

  get model(): string {
    return this._model;
  }

  set model(value: string) {
    this._model = value;
  }

  private client?: GoogleGenAI;
  private session: Session | null = null;
  private inputAudioContext = new AudioContextClass({sampleRate: 16000});
  private outputAudioContext = new AudioContextClass({sampleRate: 24000});
  @state() inputNode = this.inputAudioContext.createGain();
  @state() outputNode = this.outputAudioContext.createGain();
  private nextStartTime = 0;
  private mediaStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private scriptProcessorNode: ScriptProcessorNode | null = null;
  private sources = new Set<AudioBufferSourceNode>();
  private errorTimeoutId: number | null = null;


  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    #status {
      position: absolute;
      bottom: 2vh; /* Adjusted for potentially taller controls */
      left: 0;
      right: 0;
      z-index: 10;
      text-align: center;
      padding: 0 10px;
      color: #fff;
      font-size: 14px;
    }

    .top-controls {
      z-index: 10;
      position: absolute;
      top: 3vh; 
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row; 
      flex-wrap: wrap; 
      gap: 10px;
      padding: 0 10px; 
    }
    
    .bottom-controls-wrapper {
      position: absolute;
      bottom: calc(2vh + 30px); /* Position above status */
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 5;
      padding: 0 10px;
    }

    .instruction-mode-selector {
      display: flex;
      gap: 10px;
      margin-bottom: 5px; /* Space before the input areas */
    }

    .instruction-mode-selector button {
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 15px;
      cursor: pointer;
      font-size: 14px;
    }

    .instruction-mode-selector button[active] {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }
    
    .instruction-mode-selector button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .file-controls-container, .manual-input-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 15px;
      width: 100%; /* Ensure containers take up available width for centering */
    }
    
    .top-controls button, 
    .file-controls-container button,
    .manual-input-container button {
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      width: auto; 
      min-width: 64px;
      height: 64px;
      cursor: pointer;
      font-size: 16px;
      padding: 0 15px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .top-controls .icon-button {
       width: 64px;
       font-size: 24px;
       padding: 0;
    }

    .file-controls-container input[type="file"], 
    .manual-input-container textarea {
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      padding: 0 15px;
      border-radius: 12px;
      cursor: pointer;
      max-width: 280px; 
      min-width: 200px; 
      font-size: 14px;
      height: 48px;
      line-height: 46px;
      box-sizing: border-box; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .manual-input-container textarea {
      height: 70px; /* More height for textarea */
      line-height: 1.4; /* Adjust line-height for multi-line text */
      padding: 10px 15px; /* Adjust padding for textarea */
      white-space: pre-wrap; /* Allow text wrapping */
      resize: none; /* Disable manual resize */
      font-family: inherit; /* Use host font */
    }


    .file-controls-container input[type="file"]::file-selector-button {
      margin-right: 12px;
      border: none;
      background: #007bff;
      padding: 0 15px;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      height: 32px;
      font-size: 14px;
    }

    .file-controls-container input[type="file"]::file-selector-button:hover {
      background: #0056b3;
    }

    .file-controls-container button#processFileButton,
    .manual-input-container button#applyManualInstructionButton {
      height: 48px;
      padding: 0 25px;
      font-size: 14px;
      min-width: 140px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
  `;

  constructor() {
    super();
    console.log('GdmLiveAudio constructor called');
    this.initClientOnly();
    this.updateInitialStatus();
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('GdmLiveAudio connectedCallback called');
  }

  protected firstUpdated() {
    console.log('GdmLiveAudio firstUpdated called');
    // Add event listeners or perform actions after the first render
  }

  private updateInitialStatus() {
    if (this.instructionMode === 'file') {
        this.status = 'Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".';
    } else {
        this.status = 'Type your system instructions, then click "Apply Manual Instructions".';
    }
  }

  private handleInstructionModeChange(newMode: InstructionMode) {
    if (this.instructionMode === newMode) return;

    this.instructionMode = newMode;
    this.updateError(''); // Clear any errors from the previous mode

    if (newMode === 'file') {
      this.manualSystemInstruction = '';
      this.status = 'Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".';
    } else { // manual mode
      this.selectedFile = null;
      this.systemInstructionFromFile = null;
      const fileUploadElement = this.shadowRoot?.getElementById('fileUpload') as HTMLInputElement;
      if (fileUploadElement) {
        fileUploadElement.value = '';
      }
      this.status = 'Type your system instructions, then click "Apply Manual Instructions".';
    }
    this.isSessionInitialized = false; // Changing mode requires re-init of session
  }


  private initAudio() {
    this.nextStartTime = this.outputAudioContext.currentTime;
  }

  private async readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        if (base64Data) {
          resolve(base64Data);
        } else {
          reject(new Error('Could not extract base64 data from file.'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  private async readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  private async extractTextFromFileContent(file: File): Promise<string | null> {
    if (file.size > MAX_FILE_SIZE_BYTES) {
        this.updateError(`File "${file.name}" exceeds the 20MB size limit.`);
        this.updateStatus(`File "${file.name}" is too large. Please select a smaller file (Max 20MB).`);
        this.selectedFile = null; 
        const fileUploadElement = this.shadowRoot?.getElementById('fileUpload') as HTMLInputElement;
        if (fileUploadElement) {
            fileUploadElement.value = ''; 
        }
        return null;
    }

    this.isFileProcessing = true;
    this.updateError(''); 

    const fileNameLower = file.name.toLowerCase();

    try {
      if (fileNameLower.endsWith('.txt')) {
        this.updateStatus(`Reading ${file.name} directly for system instruction...`);
        const text = await this.readFileAsText(file);
        if (text && text.trim().length > 0) {
          this.updateStatus(`Using content of ${file.name} as system instruction.`);
          return text.trim();
        } else {
          throw new Error(`File ${file.name} is empty or contains only whitespace.`);
        }
      } else { 
        // Comment out other file type processing
        this.updateError(`Only .txt files are supported. Please select a text file.`);
        this.updateStatus(`File type not supported. Please select a .txt file.`);
        return null;
        
        /* Commented out other file type processing
        this.updateStatus(`Processing ${file.name} with Gemini to extract text...`);
        
        const base64Data = await this.readFileAsBase64(file);
        const docxMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        let mimeTypeForGemini = '';

        if (fileNameLower.endsWith('.pdf')) mimeTypeForGemini = 'application/pdf';
        else if (fileNameLower.endsWith('.rtf')) mimeTypeForGemini = 'application/rtf';
        else if (fileNameLower.endsWith('.xml')) mimeTypeForGemini = 'application/xml';
        else if (fileNameLower.endsWith('.csv')) mimeTypeForGemini = 'text/csv';
        else if (fileNameLower.endsWith('.docx')) mimeTypeForGemini = docxMimeType;
        
        if (!mimeTypeForGemini) mimeTypeForGemini = file.type;
        
        const genericMimeTypes = ['application/octet-stream', ''];
        if (!mimeTypeForGemini || genericMimeTypes.includes(mimeTypeForGemini.toLowerCase())) {
          if (fileNameLower.endsWith('.pdf')) mimeTypeForGemini = 'application/pdf';
          else if (fileNameLower.endsWith('.rtf')) mimeTypeForGemini = 'application/rtf';
          else if (fileNameLower.endsWith('.xml')) mimeTypeForGemini = 'application/xml';
          else if (fileNameLower.endsWith('.csv')) mimeTypeForGemini = 'text/csv';
          else if (fileNameLower.endsWith('.docx')) mimeTypeForGemini = docxMimeType;
          else mimeTypeForGemini = 'application/octet-stream';
        }
        
        console.log(`Using MIME type for Gemini: ${mimeTypeForGemini} for file ${file.name}`);

        const filePart = {
          inlineData: {
            mimeType: mimeTypeForGemini,
            data: base64Data,
          },
        };
        const textPart = {
          text: "Extract all text content from the provided document. Respond only with the extracted text, without any additional commentary or formatting. The dialogues should be kept in quotation marks to signify that they have to be spoken with emotion."
        };

        if (!this.client) {
             throw new Error('GoogleGenAI client not initialized.');
        }

        const response = await this.client.models.generateContent({
          model: 'gemini-2.5-flash-preview-04-17', 
          contents: { parts: [filePart, textPart] },
        });

        const extractedText = response.text;
        if (extractedText && extractedText.trim().length > 0) {
          this.updateStatus(`File processed. Text extracted by Gemini for system instruction from ${file.name}.`);
          return extractedText.trim();
        } else {
          throw new Error(`No text was extracted from ${file.name} by Gemini, or the extracted text was empty.`);
        }
        */
      }
    } catch (e: any) {
      console.error(`Error processing file ${file.name}:`, e);
      this.updateError(`Error processing ${file.name}: ${e.message || e}`);
      this.updateStatus(`Failed to process ${file.name}.`);
      return null;
    } finally {
      this.isFileProcessing = false;
    }
  }

  private initClientOnly() {
    console.log('GdmLiveAudio initClientOnly called');
    
    // Initialize audio first
    this.initAudio();
    
    // Check for API key first
    if (!this._apiKey) {
      console.log('API key not provided, skipping client initialization');
        return;
    }

    // Don't reinitialize if client already exists
    if (this.client) {
        console.log('GoogleGenAI client already initialized');
        return;
    }

    try {
        console.log('Attempting to create GoogleGenAI client');
        this.updateStatus('Connecting to Google AI client...');
        this.client = new GoogleGenAI({
            apiKey: this._apiKey,
        });
        console.log('GoogleGenAI client created successfully');
        
        // Connect output node
        this.outputNode.connect(this.outputAudioContext.destination);
        console.log('outputNode connected');
        
        // Update status
        this.updateStatus('Google AI client initialized successfully');
    } catch (error: any) {
        console.error('Error during initClientOnly:', error);
        this.updateError(`Initialization error: ${error.message || error}`);
        console.log('initClientOnly stopped due to error');
        this.client = undefined; // Reset client on error
    }
  }

  private async handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        this.updateError(`File "${file.name}" exceeds 20MB limit.`);
        this.updateStatus(`File too large (max 20MB). Select another file.`);
        this.selectedFile = null;
        input.value = ''; 
        return;
      }
      // Check if file is a text file
      if (!file.name.toLowerCase().endsWith('.txt')) {
        this.updateError(`Only .txt files are supported.`);
        this.updateStatus(`Please select a .txt file.`);
        this.selectedFile = null;
        input.value = ''; 
        return;
      }
      this.selectedFile = file;
      this.updateStatus(`File '${this.selectedFile.name}' selected. Click "Process File".`);
      this.isSessionInitialized = false; 
      this.systemInstructionFromFile = null;
      this.updateError(''); 
    } else {
      this.selectedFile = null;
      this.updateStatus('Please select a .txt file, then click "Process File".');
    }
  }

  private handleManualInstructionInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.manualSystemInstruction = textarea.value;
    if (this.manualSystemInstruction.trim() === '') {
        this.status = 'Type your system instructions, then click "Apply Manual Instructions".';
    } else {
        this.status = 'Instructions entered. Click "Apply Manual Instructions".';
    }
    this.isSessionInitialized = false;
    this.updateError('');
  }

  async triggerFileProcessing() {
    if (!this.selectedFile) {
      this.updateError("No file selected to process.");
      return;
    }
    if (this.isFileProcessing) return;

     if (this.selectedFile.size > MAX_FILE_SIZE_BYTES) {
        this.updateError(`File "${this.selectedFile.name}" exceeds 20MB limit and cannot be processed.`);
        this.updateStatus(`File "${this.selectedFile.name}" is too large (Max 20MB).`);
        this.selectedFile = null;
        const fileUploadElement = this.shadowRoot?.getElementById('fileUpload') as HTMLInputElement;
        if (fileUploadElement) fileUploadElement.value = '';
        return;
    }

    this.isSessionInitialized = false; 
    this.updateError(''); 
    try {
      const extractedText = await this.extractTextFromFileContent(this.selectedFile);
      if (extractedText) {
        this.systemInstructionFromFile = extractedText;
        await this.initSession(extractedText, `from file "${this.selectedFile?.name}"`);
      } else {
        if (!this.error) { 
             this.updateStatus(`File processing did not yield text from ${this.selectedFile.name}. Using default system instruction.`);
        }
        await this.initSession(null, "default (file processing failed)"); 
      }
    } catch (e: any) { 
      this.updateError(`Failed to read or process file: ${e.message}`);
      this.updateStatus(`Error with ${this.selectedFile.name}. Using default system instruction.`);
      await this.initSession(null, "default (file processing error)");
    }
  }

  async applyManualInstructions() {
    if (this.isFileProcessing || this.isRecording) return;
    if (!this.manualSystemInstruction.trim()) {
      this.updateError("Manual system instruction cannot be empty.");
      this.updateStatus("Please enter system instructions before applying.");
      return;
    }

    this.isSessionInitialized = false;
    this.updateError('');
    this.updateStatus('Applying manual system instruction...');
    await this.initSession(this.manualSystemInstruction.trim(), "from manual input");
  }


  private async initSession(systemInstructionText?: string | null, sourceDescription?: string) {
    console.log('GdmLiveAudio initSession called');
    if (this.session) {
        try {
            await this.session.close();
        } catch (e) {
            console.warn('Could not close previous session cleanly:', e);
        }
        this.session = null;
    }

    if (!this.client) {
        console.error('GoogleGenAI client is not initialized in initSession.');
        this.updateError('Initialization error: GoogleGenAI client not available.');
        console.log('initSession stopped: client not available');
        return;
    }

    const resolvedSystemInstructionText = systemInstructionText || "You are an interactive ai with dialogue abilities.";
    const finalSourceDescription = sourceDescription || "default";
    
    console.log(`Applying system instruction (${finalSourceDescription}): "${resolvedSystemInstructionText.substring(0, 100)}${resolvedSystemInstructionText.length > 100 ? '...' : ''}"`);

    const systemInstructionConfig = {
        parts: [{ text: resolvedSystemInstructionText }],
    };

    this.updateStatus(`Using instruction ${finalSourceDescription}. Initializing audio session...`);
    
    try {
      this.session = await this.client.live.connect({
        model: this._model,
        callbacks: {
          onopen: () => {
            this.updateStatus(`Instruction ${finalSourceDescription} applied. Press 🔴 to start audio session.`);
            this.isSessionInitialized = true;
          },
          onmessage: async (message: LiveServerMessage) => {
            const audio =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData;

            if (audio && audio.data) {
              this.nextStartTime = Math.max(
                this.nextStartTime,
                this.outputAudioContext.currentTime,
              );

              try {
                const audioBuffer = await decodeAudioData(
                  decode(audio.data),
                  this.outputAudioContext,
                  24000,
                  1,
                );
                 const source = this.outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.outputNode);
                source.addEventListener('ended', () =>{
                  this.sources.delete(source);
                });

                source.start(this.nextStartTime);
                this.nextStartTime = this.nextStartTime + audioBuffer.duration;
                this.sources.add(source);
              } catch (e: any) {
                  console.error('Error processing audio data:', e);
                  this.updateError(`Audio processing error: ${e.message || e}`);
              }
            }

            const interrupted = message.serverContent && message.serverContent.interrupted;
            if(interrupted) {
              for(const source of Array.from(this.sources.values())) {
                try {
                   source.stop();
                } catch (e: any) {
                   console.error('Error stopping audio source:', e);
                }
                this.sources.delete(source);
              }
              this.nextStartTime = 0;
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Session Error:', e);
            this.updateError(`Session Error: ${e.message || e.error || e}`);
            this.isSessionInitialized = false;
          },
          onclose: (e: CloseEvent) => {
            this.updateStatus(`Session Closed: ${e.reason || 'Unknown reason'}`);
            this.isSessionInitialized = false;
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Orus'}},
          },
          systemInstruction: systemInstructionConfig,
        },
      });
    } catch (e: any) {
      console.error('Failed to initialize session:', e);
      this.updateError(`Failed to initialize session: ${e.message}`);
      this.updateStatus('Error initializing audio session.');
      this.isSessionInitialized = false;
    }
  }

  private updateStatus(msg: string) {
    this.status = msg;
    console.log("Status:", msg);
  }

  private updateError(msg: string) {
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = null;
    }
    this.error = msg; 
    if (msg) { 
      console.error("Error:", msg);
      this.errorTimeoutId = window.setTimeout(() => {
        if (this.error === msg) { 
          this.error = ''; 
        }
        this.errorTimeoutId = null; 
      }, 10000);
    }
  }

  private async startRecording() {
    if (this.isRecording || !this.isSessionInitialized) {
      if (!this.isSessionInitialized) {
          this.updateError("Session not ready. Apply system instructions first.");
      }
      return;
    }

    this.inputAudioContext.resume();
    this.updateStatus('Requesting microphone access...');
    this.updateError('');

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      this.updateStatus('Microphone access granted. Starting capture...');

      this.sourceNode = this.inputAudioContext.createMediaStreamSource(
        this.mediaStream,
      );
      this.sourceNode.connect(this.inputNode);

      const bufferSize = 256;
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(
        bufferSize,
        1,
        1,
      );

      this.scriptProcessorNode.onaudioprocess = (audioProcessingEvent) => {
        if (!this.isRecording || !this.session) return;
        const inputBuffer = audioProcessingEvent.inputBuffer;
        const pcmData = inputBuffer.getChannelData(0);
        try {
            this.session.sendRealtimeInput({media: createBlob(pcmData)});
        } catch (e: any) {
            console.error("Error sending real-time input:", e);
            this.updateError(`Error sending audio: ${e.message}`);
        }
      };

      this.sourceNode.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.inputAudioContext.destination);

      this.isRecording = true;
      this.updateStatus('🔴 Recording... Speak now. To stop the recording press 🟥');
    } catch (err: any) {
      console.error('Error starting recording:', err);
      this.updateStatus(`Error starting recording: ${err.message}`);
      this.updateError(`Error starting recording: ${err.message}`);
      this.stopRecording(); 
    }
  }

  private stopRecording() {
    const wasRecording = this.isRecording;
    this.isRecording = false; 

    if (wasRecording) {
        this.updateStatus('Stopping recording...');
    }

    if (this.scriptProcessorNode) {
        this.scriptProcessorNode.disconnect();
        this.scriptProcessorNode.onaudioprocess = null;
        this.scriptProcessorNode = null;
    }
    if (this.sourceNode) {
        this.sourceNode.disconnect();
        this.sourceNode = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    
    if (wasRecording) {
        if (this.isSessionInitialized) {
            this.updateStatus('Recording stopped. Press 🔴 to start again.');
        } else {
            this.updateStatus('Recording stopped. Session is not active.');
        }
    } else { // Not wasRecording - update status based on current mode if session isn't init
        if (!this.isSessionInitialized) {
             this.updateInitialStatus(); // Set status based on current instructionMode
        }
    }
  }

  private async reset() {
    this.updateStatus('Resetting application...');
    this.updateError('');
    this.stopRecording();

    if (this.session) {
      try {
        await this.session.close();
      } catch (e: any) {
        console.error('Error closing session during reset:', e);
        this.updateError(`Error closing session: ${e.message}`);
      }
      this.session = null;
    }
    
    this.selectedFile = null;
    this.systemInstructionFromFile = null;
    this.manualSystemInstruction = '';
    this.isFileProcessing = false;
    this.isSessionInitialized = false;
    this.instructionMode = 'file'; // Default to file mode on reset
    
    const fileUploadElement = this.shadowRoot?.getElementById('fileUpload') as HTMLInputElement;
    if (fileUploadElement) {
        fileUploadElement.value = '';
    }
    const manualInstructionTextarea = this.shadowRoot?.getElementById('manualInstructionTextarea') as HTMLTextAreaElement;
    if (manualInstructionTextarea) {
        manualInstructionTextarea.value = '';
    }
    
    this.updateInitialStatus(); // Set status based on reset mode
  }

  render() {
    const commonDisabled = this.isRecording || this.isFileProcessing;
    return html`
      <div>
        <div class="top-controls">
          <button
            class="icon-button"
            id="resetButton"
            @click=${this.reset}
            ?disabled=${this.isRecording}
            title="Reset Session, File selection, and Manual Instructions">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff">
              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
            </svg>
          </button>
          <button
            class="icon-button"
            id="startButton"
            @click=${this.startRecording}
            ?disabled=${commonDisabled || !this.isSessionInitialized}
            title="Start Recording">
            <svg viewBox="0 0 100 100" width="32px" height="32px" fill="#c80000" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </button>
          <button
            class="icon-button"
            id="stopButton"
            @click=${this.stopRecording}
            ?disabled=${!this.isRecording}
            title="Stop Recording">
            <svg viewBox="0 0 100 100" width="32px" height="32px" fill="#c80000" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100" rx="15" />
            </svg>
          </button>
        </div>

        <div class="bottom-controls-wrapper">
          <div class="instruction-mode-selector" role="radiogroup" aria-label="System instruction input method">
            <button 
              role="radio" 
              aria-checked=${this.instructionMode === 'file'}
              ?active=${this.instructionMode === 'file'}
              @click=${() => this.handleInstructionModeChange('file')}
              ?disabled=${commonDisabled}
              title="Upload a file for system instructions">
              Upload File
            </button>
            <button 
              role="radio" 
              aria-checked=${this.instructionMode === 'manual'}
              ?active=${this.instructionMode === 'manual'}
              @click=${() => this.handleInstructionModeChange('manual')}
              ?disabled=${commonDisabled}
              title="Type system instructions manually">
              Type Manually
            </button>
          </div>

          ${this.instructionMode === 'file' ? html`
            <div class="file-controls-container">
              <input 
                type="file" 
                id="fileUpload" 
                accept=".txt,text/plain" 
                @change=${this.handleFileChange}
                ?disabled=${commonDisabled}
                aria-label="Select File for system instructions"
              />
              <button 
                id="processFileButton" 
                @click=${this.triggerFileProcessing} 
                ?disabled=${!this.selectedFile || commonDisabled}
                title="Process selected file to extract system instructions">
                Process File
              </button>
            </div>
          ` : ''}

          ${this.instructionMode === 'manual' ? html`
            <div class="manual-input-container">
              <textarea 
                id="manualInstructionTextarea"
                .value=${this.manualSystemInstruction}
                @input=${this.handleManualInstructionInput}
                ?disabled=${commonDisabled}
                placeholder="Type system instructions here..."
                aria-label="Textarea for manual system instructions"
              ></textarea>
              <button 
                id="applyManualInstructionButton" 
                @click=${this.applyManualInstructions} 
                ?disabled=${!this.manualSystemInstruction.trim() || commonDisabled}
                title="Apply manually entered system instructions">
                Apply Manual Instructions
              </button>
            </div>
          ` : ''}
        </div>

        <div id="status" role="status" aria-live="polite">
         ${this.error ? html`<strong>Error:</strong> ${this.error}` : this.status}
        </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
      </div>
    `;
  }
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
