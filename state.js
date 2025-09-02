// src/state.js
let gameState = {
    countries: [],
    currentQuestion: null,
    questionsAnswered: 0,
    score: 0,
    streak: 0,
    highScore: 0,
    mode: 'relaxed',
    difficulty: 'medium',
    muted: false,
    highContrast: false,
    questionsHistory: [],
    usedHints: new Set(),
    achievements: new Set(),
    dailyChallenge: {
        date: null,
        questions: [],
        score: 0
    }
};

const stateListeners = [];

// Initialize game state
function initializeState(countries) {
    const savedState = localStorage.getItem('geoSilhouetteState');
    
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            
            // Merge saved state with initial state
            gameState = {
                ...gameState,
                ...parsed,
                // Restore Sets and other non-serializable data
                usedHints: new Set(parsed.usedHints || []),
                achievements: new Set(parsed.achievements || [])
            };
        } catch (e) {
            console.error('Error loading saved state:', e);
        }
    }
    
    gameState.countries = countries;
    gameState.highScore = Math.max(gameState.highScore, gameState.score);
    
    // Initialize daily challenge if needed
    initDailyChallenge();
}

// Get current state
function getState() {
    return { ...gameState };
}

// Update state and notify listeners
function updateState(updates) {
    gameState = { ...gameState, ...updates };
    
    // Special handling for high score
    if (updates.score !== undefined) {
        gameState.highScore = Math.max(gameState.highScore, updates.score);
    }
    
    // Save to localStorage
    saveState();
    
    // Notify all listeners
    stateListeners.forEach(listener => listener(gameState));
}

// Subscribe to state changes
function subscribeToState(listener) {
    stateListeners.push(listener);
    return () => {
        const index = stateListeners.indexOf(listener);
        if (index > -1) stateListeners.splice(index, 1);
    };
}

// Save state to localStorage
function saveState() {
    try {
        const stateToSave = {
            ...gameState,
            // Convert Sets to Arrays for serialization
            usedHints: [...gameState.usedHints],
            achievements: [...gameState.achievements]
        };
        localStorage.setItem('geoSilhouetteState', JSON.stringify(stateToSave));
    } catch (e) {
        console.error('Error saving state:', e);
    }
}

// Initialize daily challenge
function initDailyChallenge() {
    const today = new Date().toDateString();
    
    if (gameState.dailyChallenge.date !== today) {
        gameState.dailyChallenge = {
            date: today,
            questions: [],
            score: 0
        };
    }
}

// Check and unlock achievements
function checkAchievements() {
    const { streak, score, achievements } = gameState;
    const newAchievements = new Set(achievements);
    
    // Streak achievements
    if (streak >= 5 && !achievements.has('streak_5')) {
        newAchievements.add('streak_5');
        showAchievementToast('5 Question Streak!', 'Keep it going!');
    }
    
    if (streak >= 10 && !achievements.has('streak_10')) {
        newAchievements.add('streak_10');
        showAchievementToast('10 Question Streak!', 'Amazing!');
    }
    
    // Score achievements
    if (score >= 100 && !achievements.has('score_100')) {
        newAchievements.add('score_100');
        showAchievementToast('100 Points!', 'Great job!');
    }
    
    // Update achievements if any were added
    if (newAchievements.size > achievements.size) {
        updateState({ achievements: newAchievements });
    }
}

// Show achievement toast notification
function showAchievementToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <strong>${title}</strong>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

export { initializeState, getState, updateState, subscribeToState, checkAchievements };