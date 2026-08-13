# Arcane Archive

Arcane Archive is a simple Dungeons & Dragons spell browser built with HTML, CSS, and JavaScript. It uses the D&D 5e API to display spells that can be searched and filtered by class and spell level. Users can view detailed spell information and save their favorite spells to their own spellbook. Saved spells are stored in the browser using local storage, so they are still available after refreshing the page. The project was built to practice working with APIs, JavaScript, and responsive web design while creating something useful for D&D players.

## Features

- Retrieves spell data from the D&D 5e SRD API.
- Search spells by name.
- Filter spells by class and spell level.
- View detailed spell information by expanding each spell card.
- Save favorite spells to a personal spellbook.
- Saved spells remain available after refreshing the page using local storage.
- Displays how long ago each spell was saved.

## Capstone Requirements Completed

### API Integration
- Uses the D&D 5e SRD API to retrieve spell information.

### Responsive Design
- Uses Flexbox and media queries to support both desktop and mobile screen sizes.

### Feature 1
- Analyzes data returned from the API (arrays and objects) and displays spells based on user-selected filters.

### Feature 2
- Validates search input and prevents invalid characters from being searched.

### Feature 3
- Uses custom functions that accept multiple parameters, such as `createSpellCard(details, dateSaved)`, to build spell cards.

### Feature 4 
- Stores saved spells in local storage so they remain available after the page is refreshed.

### Feature 5

- Calculates how long ago a spell was saved by comparing the saved date with the current date. The spellbook displays messages such as "Saved today," "Saved 2 days ago," or the exact saved date.

## Running the Project

1. Clone or download this repository.
2. Open the project in Visual Studio Code.
3. Install the **Live Server** extension if you do not already have it.
4. Start the project using Live Server.
5. No API key is required.

## Technologies Used

- HTML
- CSS
- JavaScript
- D&D 5e SRD API
- Local Storage

## AI Usage

AI was used as a learning tool for this project. It was used for some debugging, as well as for explaining general concepts and different approaches to writing the code.
