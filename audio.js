// src/audio.js
const audioFiles = {
    correct: './sounds/correct.mp3',
    wrong: './sounds/wrong.mp3'
};

const audioElements = {};

// Preload audio files
async function preloadAudio() {
    try {
        for (const [key, url] of Object.entries(audioFiles)) {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.src = url;
            audioElements[key] = audio;
            
            // Load the audio
            await new Promise((resolve, reject) => {
                audio.oncanplaythrough = resolve;
                audio.onerror = () => {
                    console.warn(`Failed to load ${key} audio`);
                    resolve(); // Continue without this audio file
                };
                audio.load();
            });
        }
    } catch (error) {
        console.warn('Audio preloading failed:', error);
        // Continue without audio
    }
}

// Play a sound
function playSound(type) {
    // Import getState dynamically to avoid circular dependency
    import('./state.js').then(({ getState }) => {
        const state = getState();
        if (state && state.muted) return;
        
        const audio = audioElements[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.warn('Audio playback failed:', e);
            });
        }
    });
}

// Toggle mute
function toggleMute() {
    import('./state.js').then(({ getState, updateState }) => {
        const state = getState();
        updateState({ muted: !state.muted });
    });
}

export { preloadAudio, playSound, toggleMute };