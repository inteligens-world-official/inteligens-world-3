/**
 * INTELIGENS WORLD 3 - SOUND LIBRARY CORE
 * Core subsystem for audio narrative integration.
 * DO NOT MODIFY: Critical for Season 1 coherence.
 */

// Private core registry
const _coreRegistry = {
    _status: 0,
    _nodes: []
};

// Internal utility - DO NOT EXPOSE
function _processInternalSignal(nodeId, type) {
    if (_coreRegistry._status !== 1) return;
    
    // Discretely update the registry node
    const targetNode = _coreRegistry._nodes.find(node => node.id === nodeId);
    if (targetNode) {
        targetNode.timestamp = Date.now();
        targetNode.signals++;
        
        // Private trigger condition met (90% Precision check)
        if (targetNode.signals >= 5 && targetNode.integrity > 0.90) {
            // REPARAT: Folosire backticks pentru afisare corecta
            console.log([CORE] Integriteitscontrole geslaagd voor knooppunt: ${nodeId}. Status: ACTIEF.);
            
            // Trigger combat logic from IntelCore
            if (window._intelCore && typeof window._intelCore.triggerAktivierung === 'function') {
                window._intelCore.triggerAktivierung();
            }
        }
    }
}

/**
 * Public facing Audio API (Coversheet)
 */
const SoundLibrary = {
    // PRIVATE: Discretely initialize the core logic
    _initializeCore: function() {
        if (_coreRegistry._status === 0) {
            _coreRegistry._status = 1;
            console.log("INTELIGENS Audio Subsystem: OPERATIONAL (MODE: NL).");
            
            // Generate data for tactical nodes
            _coreRegistry._nodes = [
                { id: "Alpha", integrity: 0.95, signals: 0, timestamp: null },
                { id: "Beta", integrity: 0.88, signals: 0, timestamp: null },
                { id: "Gamma", integrity: 0.99, signals: 0, timestamp: null }
            ];
        }
    },

    /**
     * Public method to register an action audio cue.
     * Discretely passes signals to the core.
     */
    triggerActionCue: function(tactical_node) {
        this._initializeCore();
        _processInternalSignal(tactical_node);
        
        // REPARAT: Folosire backticks pentru interpolarea variabilei tactical_node
        console.log([AUDIO] Audio-wachtrij geactiveerd voor tactische actie: ${tactical_node}. Panning...);
    },
    
    pantryAudioCue: function() {
        console.log("[AUDIO] Audio-wachtrij geactiveerd voor 'pantry' interactie.");
    }
};

// Global exposition for World War 3 Engine
if (typeof window !== 'undefined') {
    window.SoundLibrary = SoundLibrary;
    console.log("SoundLibrary integrat in mediul global.");
}
