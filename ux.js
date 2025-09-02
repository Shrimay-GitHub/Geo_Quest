// src/ux.js
import { getState, updateState } from './state.js';
import { getRandomCountry, getDistractors, loadCountrySvg, preloadSvg } from './data.js';
import { renderQuestion } from './ui.js';
import { toggleMute } from './audio.js';

let timerId = null;

// Setup event listeners
function setupEventListeners() {
    // Hint button
    const hintButton = document.getElementById('hint-btn');
    hintButton.addEventListener('click', handleHint);
    
    // Next button
    const nextButton = document.getElementById('next-btn');
    nextButton.addEventListener('click', nextQuestion);
    
    // Mode selector
    const modeSelect = document.getElementById('mode-select');
    modeSelect.addEventListener('change', (e) => {
        updateState({ mode: e.target.value });
        nextQuestion();
    });
    
    // Difficulty selector
    const difficultySelect = document.getElementById('difficulty-select');
    difficultySelect.addEventListener('change', (e) => {
        updateState({ difficulty: e.target.value });
        nextQuestion();
    });
    
    // Mute button
    const muteButton = document.getElementById('mute-btn');
    muteButton.addEventListener('click', toggleMute);
    
    // Contrast button
    const contrastButton = document.getElementById('contrast-btn');
    contrastButton.addEventListener('click', toggleContrast);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
}

// Handle hint button click
function handleHint() {
    const state = getState();
    const { currentQuestion, usedHints } = state;
    
    if (!currentQuestion || !currentQuestion.hints || currentQuestion.hints.length === 0) return;
    
    // Get a random hint that hasn't been used yet
    const availableHints = currentQuestion.hints.filter((_, index) => !usedHints.has(`${currentQuestion.iso2}-${index}`));
    
    if (availableHints.length === 0) return;
    
    const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
    const hintIndex = currentQuestion.hints.indexOf(randomHint);
    
    // Mark hint as used
    const newUsedHints = new Set(usedHints);
    newUsedHints.add(`${currentQuestion.iso2}-${hintIndex}`);
    
    // Update state
    updateState({ usedHints: newUsedHints });
    
    // Display the hint
    alert(`Hint: ${randomHint}`);
    
    // Disable hint button after use
    document.getElementById('hint-btn').disabled = true;
}

// Move to next question
function nextQuestion() {
    const state = getState();
    const { difficulty, currentQuestion } = state;
    
    // Get a new random country, ensuring it's not the same as the current one
    let country;
    let attempts = 0;
    const maxAttempts = 5; // Prevent infinite loop
    
    do {
        country = getRandomCountry(difficulty);
        attempts++;
    } while (
        currentQuestion && 
        country.iso2 === currentQuestion.iso2 && 
        attempts < maxAttempts
    );
    
    // Get distractors
    const distractors = getDistractors(country, difficulty);
    
    // Load SVG content
    const svgContent = loadCountrySvg(country);
    
    // Create the question object
    const question = {
        ...country,
        distractors,
        svgContent
    };
    
    // Update state
    updateState({
        currentQuestion: question,
        usedHints: new Set() // Reset hints for new question
    });
    
    // Log for debugging
    console.log(`Selected new country: ${country.name} (${country.iso2})`);
    if (currentQuestion) {
        console.log(`Previous country was: ${currentQuestion.name} (${currentQuestion.iso2})`);
    }
    
    // Preload next question's SVG
    preloadNextQuestion();
    
    // Render the new question
    renderQuestion();
}

// Preload next question for better performance
function preloadNextQuestion() {
    // Use requestIdleCallback if available
    const scheduler = window.requestIdleCallback || setTimeout;
    
    scheduler(() => {
        const state = getState();
        const { difficulty } = state;
        
        // Get next country (but don't add to used countries yet)
        const availableCountries = state.countries.filter(country => 
            !usedCountries.has(country.iso2)
        );
        
        if (availableCountries.length > 0) {
            const nextCountry = availableCountries[
                Math.floor(Math.random() * availableCountries.length)
            ];
            
            // Preload the SVG
            preloadSvg(nextCountry.mapSvg).catch(() => {
                // Silent fail - we'll load it when needed
            });
        }
    });
}

// Start a timer
function startTimer(duration) {
    stopTimer(); // Clear any existing timer
    
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    timerId = setInterval(() => {
        const now = Date.now();
        const remaining = endTime - now;
        const percentage = (remaining / duration) * 100;
        
        timerBar.style.width = `${Math.max(0, percentage)}%`;
        
        if (remaining <= 0) {
            stopTimer();
            handleTimeUp();
        }
    }, 100);
}

// Stop the timer
function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

// Handle timer expiration
function handleTimeUp() {
    const options = document.querySelectorAll('.option-btn');
    
    if (options.length > 0 && !options[0].disabled) {
        // Simulate clicking the correct answer to show feedback
        const correctOption = Array.from(options).find(btn => 
            btn.dataset.country === getState().currentQuestion.iso2
        );
        
        if (correctOption) {
            correctOption.click();
        }
    }
}

// Toggle high contrast mode
function toggleContrast() {
    const state = getState();
    updateState({ highContrast: !state.highContrast });
}

// Handle keyboard navigation
function handleKeyDown(e) {
    // Only handle key events if we're not in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
            // Number keys 1-4 select options
            const index = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option-btn');
            if (index < options.length && !options[index].disabled) {
                options[index].click();
            }
            break;
            
        case 'h':
            // H key for hint
            const hintBtn = document.getElementById('hint-btn');
            if (!hintBtn.disabled) hintBtn.click();
            break;
            
        case 'n':
            // N key for next question
            const nextBtn = document.getElementById('next-btn');
            if (!nextBtn.disabled) nextBtn.click();
            break;
            
        case 'm':
            // M key to toggle mute
            toggleMute();
            break;
            
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            // Arrow keys to navigate options
            navigateOptions(e.key);
            break;
            
        case 'Enter':
        case ' ':
            // Enter or Space to select focused option
            const focusedOption = document.activeElement;
            if (focusedOption.classList.contains('option-btn') && !focusedOption.disabled) {
                focusedOption.click();
            }
            break;
    }
}

// Navigate options with arrow keys
function navigateOptions(direction) {
    const options = Array.from(document.querySelectorAll('.option-btn'));
    const currentIndex = options.findIndex(opt => opt === document.activeElement);
    let newIndex = currentIndex;
    
    switch (direction) {
        case 'ArrowUp':
            if (currentIndex > 1) newIndex = currentIndex - 2;
            break;
        case 'ArrowDown':
            if (currentIndex < options.length - 2) newIndex = currentIndex + 2;
            break;
        case 'ArrowLeft':
            if (currentIndex > 0) newIndex = currentIndex - 1;
            break;
        case 'ArrowRight':
            if (currentIndex < options.length - 1) newIndex = currentIndex + 1;
            break;
    }
    
    if (newIndex >= 0 && newIndex < options.length && newIndex !== currentIndex) {
        options[newIndex].focus();
    } else if (currentIndex === -1 && options.length > 0) {
        // If no option is focused, focus the first one
        options[0].focus();
    }
}

export { setupEventListeners, startTimer, stopTimer };