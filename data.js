// src/data.js
let countriesData = [];
let usedCountries = new Set();

// Load game data from JSON
async function loadGameData() {
    try {
        const response = await fetch('./countries.json');
        if (!response.ok) throw new Error('Failed to load countries data');
        
        countriesData = await response.json();
        return countriesData;
    } catch (error) {
        console.error('Error loading country data:', error);
        // Return sample data as fallback
        return getSampleData();
    }
}

// Get sample data as fallback
function getSampleData() {
    return [
        {
            "name": "Japan",
            "iso2": "JP",
            "region": "Asia",
            "difficulty": 1,
            "mapSvg": "./maps/jp.svg",
            "hints": ["Island nation in East Asia", "Capital starts with 'T'", "Famous for sushi and anime"],
            "funFact": "Japan consists of over 6,800 islands, with four main islands making up most of its land area.",
            "palette": ["#BC002D", "#FFFFFF"],
            "bbox": [129.408463, 31.029579, 145.543137, 45.551483]
        },
        {
            "name": "Australia",
            "iso2": "AU",
            "region": "Oceania",
            "difficulty": 1,
            "mapSvg": "./maps/au.svg",
            "hints": ["Largest country in Oceania", "Home to kangaroos and koalas", "Island continent"],
            "funFact": "Australia is the only country that is also a continent, and it's the world's largest island.",
            "palette": ["#012169", "#E4002B"],
            "bbox": [113.338953, -43.634597, 153.569469, -10.668185]
        },
        {
            "name": "Italy",
            "iso2": "IT",
            "region": "Europe",
            "difficulty": 1,
            "mapSvg": "./maps/it.svg",
            "hints": ["Boot-shaped peninsula in Southern Europe", "Capital is Rome", "Home of pizza and pasta"],
            "funFact": "Italy has more UNESCO World Heritage sites than any other country in the world.",
            "palette": ["#009246", "#F1F2F1", "#CE2B37"],
            "bbox": [6.749955, 36.619987, 18.480247, 47.115393]
        },
        {
            "name": "Brazil",
            "iso2": "BR",
            "region": "South America",
            "difficulty": 1,
            "mapSvg": "./maps/br.svg",
            "hints": ["Largest country in South America", "Home to the Amazon rainforest", "Official language is Portuguese"],
            "funFact": "Brazil is the fifth largest country in the world by both area and population.",
            "palette": ["#009C3B", "#FFDF00", "#002776"],
            "bbox": [-73.987235, -33.768378, -34.729993, 5.244486]
        },
        {
            "name": "United States",
            "iso2": "US",
            "region": "North America",
            "difficulty": 1,
            "mapSvg": "./maps/us.svg",
            "hints": ["Located in North America", "Capital is Washington D.C.", "50 states including Alaska and Hawaii"],
            "funFact": "The United States is the third largest country by both land area and population.",
            "palette": ["#3C3B6E", "#B22234", "#FFFFFF"],
            "bbox": [-125.00165, 24.9493, -66.9326, 49.5904]
        }
    ];
}

// Track the last selected country to prevent consecutive repeats
let lastSelectedCountryIso = null;

// Get a random country based on difficulty
function getRandomCountry(difficulty) {
    const difficultyMap = {
        easy: 1,
        medium: 2,
        hard: 3
    };
    
    const difficultyLevel = difficultyMap[difficulty] || 1;
    
    // Filter countries by difficulty and exclude recently used ones
    // Also exclude the last selected country to prevent consecutive repeats
    const availableCountries = countriesData.filter(country => 
        country.difficulty <= difficultyLevel && 
        !usedCountries.has(country.iso2) &&
        country.iso2 !== lastSelectedCountryIso
    );
    
    // If no countries available, reset used countries but still avoid the last country
    if (availableCountries.length === 0) {
        usedCountries.clear();
        
        // After clearing, still exclude the last selected country
        const availableAfterReset = countriesData.filter(country => 
            country.difficulty <= difficultyLevel && 
            country.iso2 !== lastSelectedCountryIso
        );
        
        // If still no countries available (extremely rare case), allow all countries
        if (availableAfterReset.length === 0) {
            const allAvailable = countriesData.filter(country => 
                country.difficulty <= difficultyLevel
            );
            const randomIndex = Math.floor(Math.random() * allAvailable.length);
            const selectedCountry = allAvailable[randomIndex];
            
            // Update tracking variables
            lastSelectedCountryIso = selectedCountry.iso2;
            usedCountries.add(selectedCountry.iso2);
            
            return selectedCountry;
        }
        
        const randomIndex = Math.floor(Math.random() * availableAfterReset.length);
        const selectedCountry = availableAfterReset[randomIndex];
        
        // Update tracking variables
        lastSelectedCountryIso = selectedCountry.iso2;
        usedCountries.add(selectedCountry.iso2);
        
        return selectedCountry;
    }
    
    // Select a random country
    const randomIndex = Math.floor(Math.random() * availableCountries.length);
    const selectedCountry = availableCountries[randomIndex];
    
    // Update tracking variables
    lastSelectedCountryIso = selectedCountry.iso2;
    usedCountries.add(selectedCountry.iso2);
    
    // Keep only the last 10 used countries
    if (usedCountries.size > 10) {
        const first = Array.from(usedCountries)[0];
        usedCountries.delete(first);
    }
    
    return selectedCountry;
}

// Get distractors for a country
function getDistractors(correctCountry, difficulty, count = 3) {
    const { region, iso2 } = correctCountry;
    
    // Filter out the correct country
    let availableCountries = countriesData.filter(country => country.iso2 !== iso2);
    
    // Adjust distractor selection based on difficulty
    if (difficulty === 'easy') {
        // For easy mode, choose countries from different regions
        availableCountries = availableCountries.filter(country => country.region !== region);
    } else if (difficulty === 'hard') {
        // For hard mode, choose countries from the same region if possible
        const sameRegion = availableCountries.filter(country => country.region === region);
        if (sameRegion.length >= count) {
            availableCountries = sameRegion;
        }
    }
    // For medium mode, we don't filter by region
    
    // Shuffle and select the requested number of distractors
    const shuffled = [...availableCountries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Preload an SVG image
function preloadSvg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(url); // Continue even if preload fails
        img.src = url;
    });
}

// Load SVG content for a country - create a simple placeholder SVG
async function loadCountrySvg(country) {
    try {
        // For demo purposes, create a placeholder SVG with the country shape
        return createPlaceholderSvg(country);
    } catch (error) {
        console.error(`Error loading SVG for ${country.name}:`, error);
        return createPlaceholderSvg(country);
    }
}

// Create a placeholder SVG for demonstration
function createPlaceholderSvg(country) {
    const shapes = {
        // Existing countries
        'JP': 'M 20,30 Q 40,10 60,30 L 55,50 Q 40,45 25,50 Z', // Island shape
        'AU': 'M 10,40 Q 30,20 50,25 Q 70,30 80,45 L 75,65 Q 50,70 25,65 Z', // Continental shape
        'IT': 'M 40,10 L 42,25 L 38,40 L 42,55 L 45,70 L 35,75 L 30,60 L 35,45 L 33,30 L 35,15 Z', // Boot shape
        'BR': 'M 15,20 Q 50,15 75,25 L 80,50 Q 70,65 50,70 Q 30,65 20,50 Z', // Large landmass
        'US': 'M 10,30 L 70,30 L 75,40 L 70,50 L 10,50 L 5,40 Z', // Rectangular shape
        
        // New countries
        'SZ': 'M 30,20 L 70,20 L 70,60 L 30,60 Z', // Eswatini - Rectangle
        'KM': 'M 40,20 Q 60,20 60,40 Q 60,60 40,60 Q 20,60 20,40 Q 20,20 40,20 Z', // Comoros - Circle
        'DJ': 'M 20,20 L 60,20 L 70,50 L 40,70 L 10,50 Z', // Djibouti - Pentagon
        'KI': 'M 20,30 Q 30,10 50,10 Q 70,10 80,30 Q 90,50 80,70 Q 70,90 50,90 Q 30,90 20,70 Q 10,50 20,30 Z', // Kiribati - Oval
        'TL': 'M 20,20 L 70,20 L 80,40 L 70,60 L 20,60 L 10,40 Z', // Timor-Leste - Hexagon
        'SR': 'M 20,20 L 70,20 L 80,40 L 70,60 L 20,60 L 10,40 Z', // Suriname - Hexagon
        'ST': 'M 40,20 Q 60,20 60,40 Q 60,60 40,60 Q 20,60 20,40 Q 20,20 40,20 Z', // São Tomé and Príncipe - Circle
        'VU': 'M 30,10 L 70,10 L 80,30 L 70,50 L 50,60 L 30,50 L 20,30 Z', // Vanuatu - Heptagon
        'TV': 'M 40,20 Q 60,20 60,40 Q 60,60 40,60 Q 20,60 20,40 Q 20,20 40,20 Z', // Tuvalu - Circle
        'BN': 'M 20,20 L 70,20 L 70,60 L 20,60 Z', // Brunei - Rectangle
        'BT': 'M 10,30 L 40,10 L 70,30 L 70,60 L 40,80 L 10,60 Z', // Bhutan - Diamond
        'MD': 'M 30,10 L 70,10 L 80,30 L 70,70 L 30,70 L 20,30 Z', // Moldova - Hexagon
        'GY': 'M 20,20 L 70,20 L 80,40 L 70,60 L 20,60 L 10,40 Z', // Guyana - Hexagon
        'SC': 'M 20,30 Q 40,10 60,30 L 55,50 Q 40,45 25,50 Z', // Seychelles - Island shape
        'MU': 'M 40,20 Q 60,20 60,40 Q 60,60 40,60 Q 20,60 20,40 Q 20,20 40,20 Z', // Mauritius - Circle
        'CV': 'M 20,30 Q 40,10 60,30 L 55,50 Q 40,45 25,50 Z', // Cabo Verde - Island shape
        'BZ': 'M 30,10 L 70,10 L 70,70 L 30,70 Z', // Belize - Rectangle
        'AD': 'M 30,20 L 70,20 L 70,60 L 30,60 Z', // Andorra - Rectangle
        'MC': 'M 30,20 L 70,20 L 70,60 L 30,60 Z', // Monaco - Rectangle
        'PW': 'M 40,20 Q 60,20 60,40 Q 60,60 40,60 Q 20,60 20,40 Q 20,20 40,20 Z' // Palau - Circle
    };
    
    const path = shapes[country.iso2] || 'M 20,20 L 60,20 L 60,60 L 20,60 Z';
    const color = country.palette?.[0] || '#3498db';
    
    return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="300" height="300">
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                </filter>
            </defs>
            <path d="${path}" fill="${color}" stroke="#ffffff" stroke-width="2" filter="url(#shadow)"/>
        </svg>
    `;
}

// Export used countries for external access
function getUsedCountries() {
    return usedCountries;
}

export { loadGameData, getRandomCountry, getDistractors, preloadSvg, loadCountrySvg, getUsedCountries };