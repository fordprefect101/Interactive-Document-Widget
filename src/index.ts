// Main entry point for the Interactive Document application

// Import core components
import { GdmLiveAudio } from './components/GdmLiveAudio';
import { Visual } from './components/Visual';
import { Visual3D } from './components/Visual3D';
import { Analyser } from './components/Analyser';

// Import utilities
import { setupAudioContext } from './utils/audio';
import { createShader } from './utils/shader';

// Import shaders
import { backdropShader } from './shaders/backdrop';
import { sphereShader } from './shaders/sphere';

// Export all components and utilities
export {
    GdmLiveAudio,
    Visual,
    Visual3D,
    Analyser,
    setupAudioContext,
    createShader,
    backdropShader,
    sphereShader
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new GdmLiveAudio();
    document.body.appendChild(app);
}); 