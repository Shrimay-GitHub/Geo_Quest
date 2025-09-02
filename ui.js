// src/ui.js
import { getState, updateState, checkAchievements } from './state.js';
import { playSound } from './audio.js';
import { stopTimer } from './ux.js';
import { loadCountrySvg } from './data.js';

// DOM Elements cache
const elements = {
    mapContainer: () => document.getElementById('map-container'),
    optionsContainer: () => document.getElementById('options-container'),
    feedbackPanel: () => document.getElementById('feedback-panel'),
    scoreElement: () => document.getElementById('score'),
    streakElement: () => document.getElementById('streak'),
    highScoreElement: () => document.getElementById('high-score'),
    hintButton: () => document.getElementById('hint-btn'),
    nextButton: () => document.getElementById('next-btn'),
    timerBar: () => document.getElementById('timer-bar')
};

// Render the current question
async function renderQuestion() {
    const state = getState();
    const { currentQuestion, mode } = state;
    
    if (!currentQuestion) return;
    
    // Clear previous question
    elements.mapContainer().innerHTML = '';
    elements.optionsContainer().innerHTML = '';
    elements.feedbackPanel().innerHTML = '';
    
    // Load and display the SVG
    try {
        const svgContent = await loadCountrySvg(currentQuestion);
        elements.mapContainer().innerHTML = svgContent;
        
        // Add class to the SVG for styling
        const svgElement = elements.mapContainer().querySelector('svg');
        if (svgElement) {
            svgElement.classList.add('country-svg');
            svgElement.classList.add('fade-in');
        }
    } catch (error) {
        elements.mapContainer().innerHTML = `
            <div class="error">Failed to load map. Please try again.</div>
        `;
    }
    
    // Create options
    const options = [currentQuestion, ...currentQuestion.distractors]
        .sort(() => 0.5 - Math.random());
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn fade-in';
        button.textContent = option.name;
        button.dataset.country = option.iso2;
        
        // Add staggered animation delay
        button.style.animationDelay = `${index * 0.1}s`;
        
        button.addEventListener('click', () => handleAnswer(option, button));
        
        elements.optionsContainer().appendChild(button);
    });
    
    // Reset UI state
    elements.hintButton().disabled = false;
    elements.nextButton().disabled = true;
    
    // Update background if country has a palette
    if (currentQuestion.palette && currentQuestion.palette.length > 0) {
        updateBackground(currentQuestion.palette);
    }
    
    // Start timer if in timed mode
    if (mode === 'timed') {
        import('./ux.js').then(({ startTimer }) => {
            startTimer(10000); // 10 seconds
        });
    }
}

// Handle answer selection
function handleAnswer(selectedCountry, buttonElement) {
    const state = getState();
    const { currentQuestion, mode } = state;
    
    // Stop timer if in timed mode
    if (mode === 'timed') {
        stopTimer();
    }
    
    // Disable all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.disabled = true;
        
        // Mark correct answer
        if (btn.dataset.country === currentQuestion.iso2) {
            btn.classList.add('correct');
        }
    });
    
    // Check if answer is correct
    const isCorrect = selectedCountry.iso2 === currentQuestion.iso2;
    
    if (isCorrect) {
        // Handle correct answer
        buttonElement.classList.add('correct');
        
        // Play sound
        playSound('correct');
        
        // Add confetti effect
        showConfetti();
        
        // Scale up animation
        const svg = elements.mapContainer().querySelector('svg');
        if (svg) {
            svg.classList.add('scale-up');
        }
        
        // Update score
        const points = state.usedHints.has(currentQuestion.iso2) ? 7 : 10;
        const newScore = state.score + points;
        const newStreak = state.streak + 1;
        
        updateState({
            score: newScore,
            streak: newStreak,
            questionsAnswered: state.questionsAnswered + 1
        });
        
    } else {
        // Handle incorrect answer
        buttonElement.classList.add('incorrect');
        
        // Play sound
        playSound('wrong');
        
        // Shake animation
        shakeElement(elements.mapContainer());
        
        // Reset streak
        updateState({
            streak: 0,
            questionsAnswered: state.questionsAnswered + 1
        });
    }
    
    // Show feedback
    showFeedback(isCorrect, currentQuestion);
    
    // Enable next button
    elements.nextButton().disabled = false;
    
    // Check for achievements
    checkAchievements();
}

// Show feedback panel
function showFeedback(isCorrect, country) {
    const feedbackPanel = elements.feedbackPanel();
    feedbackPanel.innerHTML = `
        <div class="feedback-content fade-in">
            <h3>${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
            <p class="fact-text">This is <strong>${country.name}</strong> in ${country.region}.</p>
            <p class="fun-fact fade-in" style="animation-delay: 0.3s">${country.funFact}</p>
            <div class="flag-container fade-in" style="animation-delay: 0.5s">
                <img class="country-flag pulse" src="https://flagcdn.com/w80/${country.iso2.toLowerCase()}.png" alt="${country.name} flag">
            </div>
            <button class="show-globe-btn fade-in" style="animation-delay: 0.7s" onclick="window.geoSilhouette.showOnGlobe('${country.iso2}')">Show on globe</button>
        </div>
    `;
}

// Show country on globe (simplified version)
window.geoSilhouette = window.geoSilhouette || {};
window.geoSilhouette.showOnGlobe = function(iso2) {
    const state = getState();
    const country = state.countries.find(c => c.iso2 === iso2);
    
    if (country && country.bbox) {
        alert(`${country.name} is located between longitudes ${country.bbox[0].toFixed(2)}° and ${country.bbox[2].toFixed(2)}°, and latitudes ${country.bbox[1].toFixed(2)}° and ${country.bbox[3].toFixed(2)}°.`);
    } else {
        alert(`Location data not available for this country.`);
    }
};

// Update UI based on state changes
function updateUI(state = getState()) {
    const { score, streak, highScore, muted, highContrast } = state;
    
    // Update score displays
    if (elements.scoreElement()) {
        elements.scoreElement().textContent = `Score: ${score}`;
    }
    if (elements.streakElement()) {
        elements.streakElement().textContent = `Streak: ${streak}`;
    }
    if (elements.highScoreElement()) {
        elements.highScoreElement().textContent = `Best: ${highScore}`;
    }
    
    // Update theme
    document.documentElement.setAttribute('data-theme', highContrast ? 'high-contrast' : '');
    
    // Update mute button state
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.setAttribute('aria-pressed', muted.toString());
    }
    
    // Update contrast button state
    const contrastBtn = document.getElementById('contrast-btn');
    if (contrastBtn) {
        contrastBtn.setAttribute('aria-pressed', highContrast.toString());
    }
}

// Confetti animation
function showConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `confettiFall ${1 + Math.random() * 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Shake animation
function shakeElement(element) {
    if (!element) return;
    
    // Remove any existing animation classes
    element.classList.remove('shake');
    
    // Force a reflow to restart animation
    void element.offsetWidth;
    
    // Add shake class
    element.classList.add('shake');
    
    setTimeout(() => element.classList.remove('shake'), 500);
}

// Update background gradient
function updateBackground(palette) {
    const color1 = palette[0] || '#667eea';
    const color2 = palette[1] || palette[0] || '#764ba2';
    
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
}

export { renderQuestion, showFeedback, updateUI, showConfetti, shakeElement, updateBackground };