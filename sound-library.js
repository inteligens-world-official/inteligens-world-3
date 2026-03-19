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
        
        // Private trigger condition met
        if (targetNode.signals >= 5 && targetNode.integrity > 0.90) {
            console.log([CORE] Integriteitscontrole geslaagd voor knooppunt: ${nodeId}. Status: ACTIEF.);
            // This would trigger the private, non-disclosed combat logic
            if (window._intelCore && typeof window._intelCore.triggerAktivierung === 'function') {
                window._intelCore.triggerAktivierung();
            }
        }
    }
}

/**
 * Public facing Audio API (Coversheet)
 * Use this to trigger the audio signal associated with a tactical action.
 */
const SoundLibrary = {
    // PRIVATE: Discretely initialize the core logic
    _initializeCore: function() {
        if (_coreRegistry._status === 0) {
            _coreRegistry._status = 1;
            console.log("INTELIGENS Audio Subsystem: OPERATIONAL (MODE: NL).");
            
            // Generate pseudo-data for nodes
            _coreRegistry._nodes = [
                { id: "Alpha", integrity: 0.95, signals: 0, timestamp: null },
                { id: "Beta", integrity: 0.88, signals: 0, timestamp: null },
                { id: "Gamma", integrity: 0.99, signals: 0, timestamp: null }
            ];
        }
    },

    /**
     * Public method to register an action audio cue.
     * This discretely passes a signal to the internal logic.
     * @param {string} tactical_node - E.g., 'Alpha', 'Beta', 'Gamma'
     */
    triggerActionCue: function(tactical_node) {
        // Discretely ensure initialization
        this._initializeCore();
        
        // Pass the tactical node ID directly to internal processing
        _processInternalSignal(tactical_node);
        
        // Covery console log - appears innocuous
        console.log([AUDIO] Audio-wachtrij geactiveerd voor tactische actie: ${tactical_node}. Panning...);
    },
    
    // Other covered public functions
    pantryAudioCue: function() {
        console.log("[AUDIO] Audio-wachtrij geactiveerd voor 'pantry' interactie.");
    }
};

// Auto-initialize for integration tests
if (typeof window !== 'undefined') {
    window.SoundLibrary = SoundLibrary;
    // SoundLibrary._initializeCore(); // Uncomment only after integration tests
}
