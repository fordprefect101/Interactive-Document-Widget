// Audio context setup and management
export const setupAudioContext = async () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    return audioContext;
}; 