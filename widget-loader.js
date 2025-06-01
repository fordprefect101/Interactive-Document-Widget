// Import the widget
import { InteractiveDocumentWidget } from './widget.js';

// Create a global function to open the widget
window.openInteractiveDocumentWidget = function() {
    new InteractiveDocumentWidget({
        width: '800px',
        height: '600px'
    });
}; 