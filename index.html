<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geo Quest - Guess the Country</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            color: #333;
            min-height: 100vh;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
        }

        header {
            text-align: center;
            margin-bottom: 20px;
            width: 100%;
        }

        h1 {
            color: white;
            font-size: 2.8rem;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            font-weight: 700;
        }

        .tagline {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.2rem;
            margin-bottom: 25px;
        }

        .stats {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .stat-box {
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 20px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            min-width: 100px;
            transition: all 0.3s ease;
        }

        .stat-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .stat-value {
            font-size: 1.8rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9rem;
            color: #7f8c8d;
            font-weight: 500;
        }

        .game-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            margin-bottom: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .question-number {
            font-size: 1.1rem;
            color: #7f8c8d;
            font-weight: 600;
        }

        .points-indicator {
            padding: 8px 15px;
            background: #f39c12;
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        .map-container {
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 25px 0;
            background: #f8f9fa;
            border-radius: 15px;
            position: relative;
            overflow: hidden;
            border: 1px solid #e9ecef;
        }

        .country-flag {
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .country-flag:hover {
            transform: scale(1.02);
        }

        .loading {
            color: #7f8c8d;
            font-size: 1.1rem;
        }

        .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 25px;
        }

        .option-btn {
            padding: 18px;
            border: 2px solid #ddd;
            border-radius: 12px;
            background: white;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .option-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            background: #f8f9fa;
            border-color: #3498db;
        }

        .option-btn:active:not(:disabled) {
            transform: translateY(-1px);
        }

        .option-btn.correct {
            background: #2ecc71;
            color: white;
            border-color: #27ae60;
            box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
        }

        .option-btn.incorrect {
            background: #e74c3c;
            color: white;
            border-color: #c0392b;
            box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
        }

        .controls {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin-top: 20px;
        }

        .btn {
            padding: 15px 25px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        .hint-btn {
            background: linear-gradient(135deg, #f39c12, #e67e22);
            color: white;
            box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
        }

        .hint-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(243, 156, 18, 0.6);
        }

        .next-btn {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        }

        .next-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
        }

        .feedback-panel {
            margin: 25px 0;
            padding: 20px;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
            text-align: left;
            border-left: 4px solid #3498db;
        }

        .feedback-panel.correct {
            background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1));
            border-left-color: #2ecc71;
        }

        .feedback-panel.incorrect {
            background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
            border-left-color: #e74c3c;
        }

        .feedback-panel h3 {
            margin-bottom: 10px;
            color: #3498db;
            font-size: 1.3rem;
        }

        .feedback-panel.correct h3 {
            color: #2ecc71;
        }

        .feedback-panel.incorrect h3 {
            color: #e74c3c;
        }

        .fun-fact {
            font-style: italic;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px dashed rgba(0, 0, 0, 0.1);
            color: #7f8c8d;
        }

        .settings {
            display: flex;
            gap: 20px;
            margin-top: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .setting-group {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.95);
            padding: 12px 18px;
            border-radius: 25px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .setting-group:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .setting-group label {
            font-weight: 600;
            color: #2c3e50;
        }

        select {
            background: #ecf0f1;
            border: 2px solid transparent;
            border-radius: 8px;
            padding: 8px 12px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        select:focus {
            outline: none;
            border-color: #3498db;
        }

        .timer {
            height: 8px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            margin-top: 20px;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .timer-bar {
            height: 100%;
            width: 100%;
            background: linear-gradient(90deg, #2ecc71, #f39c12, #e74c3c);
            transition: width 0.1s linear;
            border-radius: 4px;
        }

        /* Animations */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }

        .shake {
            animation: shake 0.6s ease;
        }

        @keyframes scaleUp {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .scale-up {
            animation: scaleUp 0.5s ease;
        }

        .confetti {
            position: fixed;
            width: 12px;
            height: 12px;
            opacity: 0;
            z-index: 1000;
        }

        @keyframes confettiFall {
            0% {
                opacity: 1;
                transform: translateY(-100vh) rotate(0deg) scale(0);
            }
            10% {
                opacity: 1;
                transform: translateY(-90vh) rotate(180deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(100vh) rotate(1080deg) scale(0);
            }
        }

        .progress-container {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
        }

        .level-badge {
            display: inline-block;
            padding: 8px 16px;
            background: #3498db;
            color: white;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        /* Responsive improvements */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .options-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .map-container {
                height: 220px;
            }
            
            .controls {
                flex-direction: column;
            }
            
            .settings {
                flex-direction: column;
                align-items: center;
            }
            
            .stats {
                gap: 10px;
            }
            
            .stat-box {
                min-width: 80px;
                padding: 12px 16px;
            }
            
            .game-card {
                padding: 20px;
            }
            
            h1 {
                font-size: 2.2rem;
            }
        }

        @media (max-width: 480px) {
            .question-header {
                flex-direction: column;
                gap: 10px;
            }
            
            .map-container {
                height: 180px;
            }
            
            h1 {
                font-size: 1.8rem;
            }
            
            .tagline {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌍 Geo Quest</h1>
            <p class="tagline">Test your geography knowledge with country maps</p>
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-value" id="score">0</div>
                    <div class="stat-label">Score</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="streak">0</div>
                    <div class="stat-label">Streak</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="high-score">0</div>
                    <div class="stat-label">Best</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="accuracy">0%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
            </div>
        </header>

        <main>
            <div class="progress-container">
                <div class="level-badge" id="level-badge">Level 1</div>
                <div>Question <span id="question-counter">1</span> of <span id="total-questions">∞</span></div>
            </div>

            <div class="game-card">
                <div class="question-header">
                    <div class="question-number" id="question-text">Which country is this?</div>
                    <div class="points-indicator" id="points-indicator">+10 points</div>
                </div>
                
                <div class="map-container" id="map-container">
                    <div class="loading">Loading map...</div>
                </div>
                
                <div class="options-grid" id="options-container">
                    <!-- Options will be inserted here -->
                </div>
                
                <div class="feedback-panel" id="feedback-panel">
                    <!-- Feedback will be shown here -->
                </div>
                
                <div class="controls">
                    <button id="hint-btn" class="btn hint-btn">💡 Hint</button>
                    <button id="next-btn" class="btn next-btn" disabled>Next Question →</button>
                </div>
            </div>
            
            <div class="timer" id="timer-container">
                <div class="timer-bar" id="timer-bar"></div>
            </div>
            
            <div class="settings">
                <div class="setting-group">
                    <label for="mode-select">⏱️ Mode:</label>
                    <select id="mode-select">
                        <option value="relaxed">Relaxed</option>
                        <option value="timed">Timed (10s)</option>
                        <option value="speed">Speed (5s)</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label for="difficulty-select">🎯 Difficulty:</label>
                    <select id="difficulty-select">
                        <option value="easy">Easy</option>
                        <option value="medium" selected>Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                
                <div class="setting-group">
                    <label for="region-select">🌐 Region:</label>
                    <select id="region-select">
                        <option value="all">All Regions</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Country data with flag image URLs
        const countries = [
            {
                name: "Japan",
                iso2: "JP",
                region: "Asia",
                difficulty: 1,
                capital: "Tokyo",
                population: "125.8 million",
                flagUrl: "https://flagcdn.com/w320/jp.jpg",
                hints: ["Island nation in East Asia", "Capital starts with 'T'", "Famous for sushi and anime"],
                funFact: "Japan consists of over 6,800 islands, with four main islands making up most of its land area."
            },
            {
                name: "Australia",
                iso2: "AU",
                region: "Oceania",
                difficulty: 1,
                capital: "Canberra",
                population: "25.7 million",
                flagUrl: "https://flagcdn.com/w320/au.jpg",
                hints: ["Largest country in Oceania", "Home to kangaroos and koalas", "Island continent"],
                funFact: "Australia is the only country that is also a continent, and it's the world's largest island."
            },
            {
                name: "Italy",
                iso2: "IT",
                region: "Europe",
                difficulty: 1,
                capital: "Rome",
                population: "59.1 million",
                flagUrl: "https://flagcdn.com/w320/it.jpg",
                hints: ["Boot-shaped peninsula in Southern Europe", "Capital is Rome", "Home of pizza and pasta"],
                funFact: "Italy has more UNESCO World Heritage sites than any other country in the world."
            },
            {
                name: "Brazil",
                iso2: "BR",
                region: "Americas",
                difficulty: 1,
                capital: "Brasília",
                population: "215.3 million",
                flagUrl: "https://flagcdn.com/w320/br.jpg",
                hints: ["Largest country in South America", "Home to the Amazon rainforest", "Official language is Portuguese"],
                funFact: "Brazil is the fifth largest country in the world by both area and population."
            },
            {
                name: "United States",
                iso2: "US",
                region: "Americas",
                difficulty: 1,
                capital: "Washington, D.C.",
                population: "331.9 million",
                flagUrl: "https://flagcdn.com/w320/us.jpg",
                hints: ["Located in North America", "Capital is Washington D.C.", "50 states including Alaska and Hawaii"],
                funFact: "The United States is the third largest country by both land area and population."
            },
            {
                name: "India",
                iso2: "IN",
                region: "Asia",
                difficulty: 2,
                capital: "New Delhi",
                population: "1.38 billion",
                flagUrl: "https://flagcdn.com/w320/in.jpg",
                hints: ["Located in South Asia", "Second most populous country", "Capital is New Delhi"],
                funFact: "India has the world's largest democracy and is the birthplace of four major religions."
            },
            {
                name: "France",
                iso2: "FR",
                region: "Europe",
                difficulty: 2,
                capital: "Paris",
                population: "67.8 million",
                flagUrl: "https://flagcdn.com/w320/fr.jpg",
                hints: ["Located in Western Europe", "Capital is Paris", "Famous for the Eiffel Tower"],
                funFact: "France is the most visited country in the world, with over 89 million tourists annually."
            },
            {
                name: "Egypt",
                iso2: "EG",
                region: "Africa",
                difficulty: 2,
                capital: "Cairo",
                population: "109.3 million",
                flagUrl: "https://flagcdn.com/w320/eg.jpg",
                hints: ["Located in Northeast Africa", "Home to ancient pyramids", "The Nile River flows through it"],
                funFact: "Egypt is home to one of the world's oldest civilizations, dating back to around 3100 BCE."
            },
            {
                name: "Canada",
                iso2: "CA",
                region: "Americas",
                difficulty: 2,
                capital: "Ottawa",
                population: "38.0 million",
                flagUrl: "https://flagcdn.com/w320/ca.jpg",
                hints: ["Largest country in North America", "Known for maple syrup", "Home to Niagara Falls"],
                funFact: "Canada has the longest coastline of any country in the world, at 202,080 km."
            },
            {
                name: "South Africa",
                iso2: "ZA",
                region: "Africa",
                difficulty: 2,
                capital: "Pretoria",
                population: "59.3 million",
                flagUrl: "https://flagcdn.com/w320/za.jpg",
                hints: ["Located at the southern tip of Africa", "Has three capital cities", "Known for its biodiversity"],
                funFact: "South Africa is the only country in the world with three capital cities."
            }
        ];

        // Game state
        let gameState = {
            score: 0,
            streak: 0,
            highScore: parseInt(localStorage.getItem('highScore')) || 0,
            currentQuestion: null,
            questionsAnswered: 0,
            questionsCorrect: 0,
            mode: 'relaxed',
            difficulty: 'medium',
            region: 'all',
            usedHints: new Set(),
            questionCounter: 1
        };

        // DOM Elements
        const elements = {
            mapContainer: document.getElementById('map-container'),
            optionsContainer: document.getElementById('options-container'),
            feedbackPanel: document.getElementById('feedback-panel'),
            scoreElement: document.getElementById('score'),
            streakElement: document.getElementById('streak'),
            highScoreElement: document.getElementById('high-score'),
            accuracyElement: document.getElementById('accuracy'),
            hintButton: document.getElementById('hint-btn'),
            nextButton: document.getElementById('next-btn'),
            timerBar: document.getElementById('timer-bar'),
            modeSelect: document.getElementById('mode-select'),
            difficultySelect: document.getElementById('difficulty-select'),
            regionSelect: document.getElementById('region-select'),
            questionCounter: document.getElementById('question-counter'),
            levelBadge: document.getElementById('level-badge'),
            pointsIndicator: document.getElementById('points-indicator'),
            questionText: document.getElementById('question-text')
        };

        // Initialize game
        function initGame() {
            updateUI();
            nextQuestion();
            setupEventListeners();
        }

        // Get a random country based on difficulty and region
        function getRandomCountry() {
            const difficultyMap = {
                easy: 1,
                medium: 2,
                hard: 3
            };
            
            const difficultyLevel = difficultyMap[gameState.difficulty] || 2;
            
            // Filter countries by difficulty and region
            let availableCountries = countries.filter(country => 
                country.difficulty === difficultyLevel
            );
            
            // Filter by region if not "all"
            if (gameState.region !== 'all') {
                availableCountries = availableCountries.filter(country => 
                    country.region === gameState.region
                );
            }
            
            // If no countries available, use all countries
            if (availableCountries.length === 0) {
                availableCountries = countries;
            }
            
            return availableCountries[Math.floor(Math.random() * availableCountries.length)];
        }

        // Get distractors for a country
        function getDistractors(correctCountry, count = 3) {
            const { region, difficulty } = correctCountry;
            let availableCountries = countries.filter(country => country.name !== correctCountry.name);
            
            // Adjust distractor selection based on difficulty
            if (difficulty === 1) {
                // For easy mode, choose countries from different regions
                availableCountries = availableCountries.filter(country => country.region !== region);
            } else if (difficulty >= 3) {
                // For hard mode, choose countries from the same region
                availableCountries = availableCountries.filter(country => country.region === region);
            }
            
            // Shuffle and select the requested number of distractors
            const shuffled = [...availableCountries].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        // Move to next question
        function nextQuestion() {
            // Get a new random country
            const country = getRandomCountry();
            
            // Get distractors
            const distractors = getDistractors(country);
            
            // Create the question object
            gameState.currentQuestion = {
                ...country,
                distractors
            };
            
            // Update question counter
            elements.questionCounter.textContent = gameState.questionCounter;
            
            // Render the new question
            renderQuestion();
            
            // Reset UI state
            elements.hintButton.disabled = false;
            elements.nextButton.disabled = true;
            elements.feedbackPanel.innerHTML = '';
            elements.feedbackPanel.className = 'feedback-panel';
            
            // Update points indicator
            elements.pointsIndicator.textContent = '+10 points';
            
            // Start timer if in timed mode
            if (gameState.mode === 'timed') {
                startTimer(10000); // 10 seconds
            } else if (gameState.mode === 'speed') {
                startTimer(5000); // 5 seconds
            }
        }

        // Render the current question
        function renderQuestion() {
            const { currentQuestion } = gameState;
            
            // Display the flag image
            elements.mapContainer.innerHTML = `
                <img src="${currentQuestion.flagUrl}" alt="Country Flag" class="country-flag">
            `;
            
            // Create options
            elements.optionsContainer.innerHTML = '';
            const options = [currentQuestion, ...currentQuestion.distractors]
                .sort(() => 0.5 - Math.random());
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-btn';
                button.textContent = option.name;
                button.addEventListener('click', () => handleAnswer(option, button));
                elements.optionsContainer.appendChild(button);
            });
        }

        // Handle answer selection
        function handleAnswer(selectedCountry, buttonElement) {
            const { currentQuestion } = gameState;
            
            // Stop timer if in timed mode
            if (gameState.mode === 'timed' || gameState.mode === 'speed') {
                stopTimer();
            }
            
            // Disable all option buttons
            const optionButtons = document.querySelectorAll('.option-btn');
            optionButtons.forEach(btn => {
                btn.disabled = true;
                
                // Mark correct answer
                if (btn.textContent === currentQuestion.name) {
                    btn.classList.add('correct');
                }
            });
            
            // Check if answer is correct
            const isCorrect = selectedCountry.name === currentQuestion.name;
            
            if (isCorrect) {
                // Handle correct answer
                buttonElement.classList.add('correct');
                
                // Add confetti effect
                showConfetti();
                
                // Scale up animation
                const flag = elements.mapContainer.querySelector('img');
                if (flag) {
                    flag.classList.add('scale-up');
                }
                
                // Update score
                const points = gameState.usedHints.has(currentQuestion.iso2) ? 7 : 10;
                gameState.score += points;
                gameState.streak += 1;
                gameState.questionsCorrect += 1;
                
                // Check for high score
                if (gameState.score > gameState.highScore) {
                    gameState.highScore = gameState.score;
                    localStorage.setItem('highScore', gameState.highScore);
                }
                
                // Set feedback panel to correct style
                elements.feedbackPanel.className = 'feedback-panel correct';
                
                // Show feedback
                showFeedback(isCorrect, currentQuestion);
                
            } else {
                // Handle incorrect answer
                buttonElement.classList.add('incorrect');
                
                // Shake animation
                shakeElement(elements.mapContainer);
                
                // Reset streak
                gameState.streak = 0;
                
                // Set feedback panel to incorrect style
                elements.feedbackPanel.className = 'feedback-panel incorrect';
                
                // Show feedback
                showFeedback(isCorrect, currentQuestion);
            }
            
            // Update questions answered
            gameState.questionsAnswered += 1;
            gameState.questionCounter += 1;
            
            // Update UI
            updateUI();
            
            // Enable next button
            elements.nextButton.disabled = false;
        }

        // Show feedback panel
        function showFeedback(isCorrect, country) {
            elements.feedbackPanel.innerHTML = `
                <h3>${isCorrect ? 'Correct!' : 'Incorrect!'}</h3>
                <p>This is <strong>${country.name}</strong> in ${country.region}.</p>
                <p>Capital: ${country.capital} | Population: ${country.population}</p>
                <p class="fun-fact">${country.funFact}</p>
            `;
        }

        // Update UI based on state
        function updateUI() {
            elements.scoreElement.textContent = gameState.score;
            elements.streakElement.textContent = gameState.streak;
            elements.highScoreElement.textContent = gameState.highScore;
            
            // Calculate accuracy
            const accuracy = gameState.questionsAnswered > 0 
                ? Math.round((gameState.questionsCorrect / gameState.questionsAnswered) * 100)
                : 0;
            elements.accuracyElement.textContent = `${accuracy}%`;
            
            // Update level badge based on score
            if (gameState.score >= 100) {
                elements.levelBadge.textContent = "Level 5";
            } else if (gameState.score >= 70) {
                elements.levelBadge.textContent = "Level 4";
            } else if (gameState.score >= 40) {
                elements.levelBadge.textContent = "Level 3";
            } else if (gameState.score >= 20) {
                elements.levelBadge.textContent = "Level 2";
            } else {
                elements.levelBadge.textContent = "Level 1";
            }
        }

        // Handle hint button click
        function handleHint() {
            const { currentQuestion, usedHints } = gameState;
            
            if (!currentQuestion || !currentQuestion.hints || currentQuestion.hints.length === 0) return;
            
            // Get a random hint that hasn't been used yet
            const availableHints = currentQuestion.hints.filter((_, index) => !usedHints.has(`${currentQuestion.iso2}-${index}`));
            
            if (availableHints.length === 0) return;
            
            const randomHint = availableHints[Math.floor(Math.random() * availableHints.length)];
            const hintIndex = currentQuestion.hints.indexOf(randomHint);
            
            // Mark hint as used
            gameState.usedHints.add(`${currentQuestion.iso2}-${hintIndex}`);
            
            // Update points indicator
            elements.pointsIndicator.textContent = '+7 points';
            
            // Display the hint
            alert(`Hint: ${randomHint}`);
            
            // Disable hint button after use
            elements.hintButton.disabled = true;
        }

        // Confetti animation
        function showConfetti() {
            for (let i = 0; i < 80; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                confetti.style.animation = `confettiFall ${1 + Math.random() * 2}s linear forwards`;
                confetti.style.animationDelay = Math.random() * 1 + 's';
                
                document.body.appendChild(confetti);
            }
            
            // Clean up after animation
            setTimeout(() => {
                const confettiElements = document.querySelectorAll('.confetti');
                confettiElements.forEach(el => el.remove());
            }, 3000);
        }

        // Shake animation
        function shakeElement(element) {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 600);
        }

        // Timer functions
        let timerId = null;

        function startTimer(duration) {
            stopTimer(); // Clear any existing timer
            
            elements.timerBar.style.width = '100%';
            
            const startTime = Date.now();
            const endTime = startTime + duration;
            
            timerId = setInterval(() => {
                const now = Date.now();
                const remaining = endTime - now;
                const percentage = (remaining / duration) * 100;
                
                elements.timerBar.style.width = `${Math.max(0, percentage)}%`;
                
                if (remaining <= 0) {
                    stopTimer();
                    handleTimeUp();
                }
            }, 100);
        }

        function stopTimer() {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
        }

        function handleTimeUp() {
            const options = document.querySelectorAll('.option-btn');
            
            if (options.length > 0 && !options[0].disabled) {
                // Find the correct answer
                const correctOption = Array.from(options).find(btn => 
                    btn.textContent === gameState.currentQuestion.name
                );
                
                if (correctOption) {
                    // Show the correct answer
                    options.forEach(btn => btn.disabled = true);
                    correctOption.classList.add('correct');
                    
                    // Set feedback panel to incorrect style (since time ran out)
                    elements.feedbackPanel.className = 'feedback-panel incorrect';
                    
                    // Show feedback
                    showFeedback(false, gameState.currentQuestion);
                    
                    // Reset streak
                    gameState.streak = 0;
                    
                    // Update questions answered
                    gameState.questionsAnswered += 1;
                    gameState.questionCounter += 1;
                    
                    // Update UI
                    updateUI();
                    
                    // Enable next button
                    elements.nextButton.disabled = false;
                }
            }
        }

        // Setup event listeners
        function setupEventListeners() {
            // Hint button
            elements.hintButton.addEventListener('click', handleHint);
            
            // Next button
            elements.nextButton.addEventListener('click', nextQuestion);
            
            // Mode selector
            elements.modeSelect.addEventListener('change', (e) => {
                gameState.mode = e.target.value;
                nextQuestion();
            });
            
            // Difficulty selector
            elements.difficultySelect.addEventListener('change', (e) => {
                gameState.difficulty = e.target.value;
                nextQuestion();
            });
            
            // Region selector
            elements.regionSelect.addEventListener('change', (e) => {
                gameState.region = e.target.value;
                nextQuestion();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                // Number keys 1-4 select options
                if (e.key >= '1' && e.key <= '4') {
                    const index = parseInt(e.key) - 1;
                    const options = document.querySelectorAll('.option-btn');
                    if (index < options.length && !options[index].disabled) {
                        options[index].click();
                    }
                }
                
                // H key for hint
                if (e.key === 'h' && !elements.hintButton.disabled) {
                    handleHint();
                }
                
                // N key for next question
                if (e.key === 'n' && !elements.nextButton.disabled) {
                    nextQuestion();
                }
            });
        }

        // Initialize the game when the page loads
        window.addEventListener('load', initGame);
    </script>
</body>
</html>