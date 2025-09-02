// src/app.js
import { loadGameData } from './data.js';
import { initializeState, getState, updateState, subscribeToState } from './state.js';
import { renderQuestion, showFeedback, updateUI, showConfetti, shakeElement } from './ui.js';
import { preloadAudio, playSound } from './audio.js';
import { setupEventListeners, startTimer, stopTimer } from './ux.js';

// Game initialization
async function initGame() {
    try {
        // Show loading state
        document.getElementById('map-container').innerHTML = '<div class="loading">Loading game...</div>';
        
        // Load game data
        const countries = await loadGameData();
        
        // Initialize state
        initializeState(countries);
        
        // Preload audio files
        await preloadAudio();
        
        // Setup event listeners
        setupEventListeners();
        
        // Render first question
        renderQuestion();
        
        // Update UI with initial state
        updateUI();
        
        // Subscribe to state changes
        subscribeToState(updateUI);
        
    } catch (error) {
        console.error('Failed to initialize game:', error);
        document.getElementById('map-container').innerHTML = `
            <div class="error">
                <p>Failed to load the game. Please refresh the page.</p>
                <button onclick="window.location.reload()">Reload Game</button>
            </div>
        `;
    }
}

// Start the game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// Export for global access if needed
window.geoSilhouette = {
    getState,
    updateState,
    renderQuestion,
    showFeedback,
    playSound,
    showConfetti,
    shakeElement,
    startTimer,
    stopTimer
};