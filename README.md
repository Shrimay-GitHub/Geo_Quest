# README.md

# Geo Silhouette - Guess the Country Game

A mobile-first web game where players guess countries by their map silhouettes.

## Features

- Guess countries by their map silhouettes
- Multiple difficulty levels (Easy, Medium, Hard)
- Two game modes (Relaxed and Timed)
- Hint system with point adjustment
- Score tracking and streaks
- Daily challenges
- Achievements system
- Keyboard navigation support
- Accessibility features (high contrast mode, reduced motion support)
- Responsive design

## Setup

1. Clone or download the project files
2. Serve the files using a local web server (due to ES modules and fetch API usage)
   - You can use Python: `python -m http.server 8000`
   - Or Node.js: `npx http-server`
   - Or use the Live Server extension in VS Code
3. Open your browser to `http://localhost:8000`

## Adding More Countries

### 1. Add Country Data

Edit `public/data/countries.json` and add a new country object with the following structure:

```json
{
  "name": "Country Name",
  "iso2": "XX",
  "region": "Continent",
  "difficulty": 1,
  "mapSvg": "./public/maps/xx.svg",
  "hints": ["Hint 1", "Hint 2", "Hint 3"],
  "funFact": "Short interesting fact about the country",
  "palette": ["#color1", "#color2"],
  "bbox": [minLon, minLat, maxLon, maxLat]
}