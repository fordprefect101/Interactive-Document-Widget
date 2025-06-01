// Interactive Document Widget
// This file bundles the entire Interactive Document application into a pluggable widget

// Get configuration from global CONFIG object
const GLOBAL_API_KEY = window.CONFIG?.apiKey;
const MODEL_NAME = window.CONFIG?.model || 'gemini-2.5-flash-preview-native-audio-dialog';

// Validate configuration
if (!GLOBAL_API_KEY) {
    console.error('API key not provided in CONFIG object');
}

// Import dependencies
import { LitElement, css, html } from 'https://esm.sh/lit@^3.3.0';
import { customElement, property } from 'https://esm.sh/lit@^3.3.0/decorators.js';
import { GoogleGenAI } from 'https://esm.sh/@google/genai@0.9.0';
import * as THREE from 'https://esm.sh/three@^0.176.0';
import { GdmLiveAudio } from './index.tsx';

// Set Lit to production mode
window.lit = { devMode: false };

// Default widget styles
const WIDGET_STYLES = `
  .interactive-document-widget {
    width: 100%;
    height: 100%;
    position: relative;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    display: block;
  }

  .widget-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .widget-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    border-radius: 8px 8px 0 0;
  }

  .widget-title {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .widget-close {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .widget-close:hover {
    color: #333;
  }

  gdm-live-audio {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export class InteractiveDocumentWidget {
  constructor(config = {}) {
    // Default configuration
    this.config = {
      apiKey: config.apiKey || GLOBAL_API_KEY,
      model: config.model || MODEL_NAME,
      width: config.width || '800px',
      height: config.height || '600px',
      ...config
    };

    // Initialize the widget
    this.init();
  }

  async init() {
    try {
      // Create overlay
      this.overlay = document.createElement('div');
      this.overlay.className = 'widget-overlay';
      
      // Create popup container
      this.widgetContainer = document.createElement('div');
      this.widgetContainer.className = 'widget-popup';
      this.widgetContainer.style.width = this.config.width;
      this.widgetContainer.style.height = this.config.height;

      // Create header
      const header = document.createElement('div');
      header.className = 'widget-header';
      
      const title = document.createElement('h3');
      title.className = 'widget-title';
      title.textContent = 'Interactive Document Widget';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'widget-close';
      closeButton.textContent = '×';
      closeButton.onclick = () => this.destroy();
      
      header.appendChild(title);
      header.appendChild(closeButton);
      
      // Create widget content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'interactive-document-widget';
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = WIDGET_STYLES;
      document.head.appendChild(style);

      // Initialize GdmLiveAudio
      await this.initializeGdmLiveAudio(contentContainer);

      // Assemble the popup
      this.widgetContainer.appendChild(header);
      this.widgetContainer.appendChild(contentContainer);
      
      // Add to document
      document.body.appendChild(this.overlay);
      document.body.appendChild(this.widgetContainer);
      
      console.log('Widget initialized with API key:', !!this.config.apiKey);
    } catch (error) {
      console.error('Failed to initialize widget:', error);
      this.handleError(error);
    }
  }

  async initializeGdmLiveAudio(container) {
    try {
      // Create the main element
      this.mainElement = new GdmLiveAudio();
      
      // Set the API key and model
      this.mainElement.apiKey = this.config.apiKey;
      this.mainElement.model = this.config.model;
      
      // Verify API key was set
      if (!this.mainElement.apiKey) {
        throw new Error('Failed to set API key on GdmLiveAudio component');
      }

      // Append to container
      container.appendChild(this.mainElement);
      
      console.log('GdmLiveAudio initialized successfully');
    } catch (error) {
      console.error('Failed to initialize GdmLiveAudio:', error);
      this.handleError(error);
    }
  }

  // Public methods for widget control
  async start() {
    if (this.mainElement && typeof this.mainElement.startRecording === 'function') {
      await this.mainElement.startRecording();
    }
  }

  async stop() {
    if (this.mainElement && typeof this.mainElement.stopRecording === 'function') {
      await this.mainElement.stopRecording();
    }
  }

  async reset() {
    if (this.mainElement && typeof this.mainElement.reset === 'function') {
      await this.mainElement.reset();
    }
  }

  // Error handling
  handleError(error) {
    console.error('Interactive Document Widget Error:', error);
    if (this.widgetContainer) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = `Widget Error: ${error.message}`;
      this.widgetContainer.appendChild(errorDiv);
    }
  }

  // Cleanup method
  destroy() {
    if (this.mainElement && typeof this.mainElement.stopRecording === 'function') {
      this.mainElement.stopRecording();
    }
    if (this.overlay) {
      this.overlay.remove();
    }
    if (this.widgetContainer) {
      this.widgetContainer.remove();
    }
  }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  // Create a global function to open the widget
  window.openInteractiveDocumentWidget = function() {
    new InteractiveDocumentWidget({
      width: '800px',
      height: '600px'
    });
  };
}

// Example usage (for embedding in another HTML page):