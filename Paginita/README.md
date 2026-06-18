# RecipeHub - Simple Recipe Finder

A fully functional recipe finder web application built with vanilla JavaScript, HTML, and CSS. No frameworks or libraries used.

## Features

- **Recipe Search**: Search recipes by name using TheMealDB API
- **Advanced Filters**: Filter recipes by category and cuisine
- **Favorites System**: Save and manage favorite recipes with localStorage
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **CSS Animations**: Smooth transitions and animations
- **Multiple APIs**: Integration of TheMealDB and TheCocktailDB APIs

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom CSS with CSS variables, animations, and responsive design
- **Vanilla JavaScript**: ES6+ with modules, classes, and async/await
- **No Frameworks**: Pure vanilla JavaScript implementation

## External APIs

1. **TheMealDB API**: Recipe data, categories, areas, ingredients
2. **TheCocktailDB API**: Cocktail data (demonstrates multiple API integration)

## Project Structure

```
Paginita/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Styles with animations and responsive design
├── js/
│   ├── api.js         # TheMealDB API integration
│   ├── unsplash.js   # TheCocktailDB API integration
│   ├── storage.js     # localStorage management
│   ├── ui.js          # UI rendering and DOM manipulation
│   └── app.js         # Main application logic
└── README.md          # This file
```

## How to Run

1. Open `index.html` in a web browser
2. For local development with ES modules, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
3. Navigate to `http://localhost:8000`

## Features Breakdown

### Search & Filters
- Real-time recipe search
- Category filter (Beef, Chicken, Seafood, etc.)
- Cuisine filter (American, Italian, Mexican, etc.)
- Combined filtering (category + cuisine)

### Favorites System
- Add/remove recipes from favorites
- Persistent storage with localStorage
- View all favorites in dedicated section

### Theme Toggle
- Dark/light mode switch
- Persistent theme preference
- Smooth theme transitions

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Focus management
- Screen reader friendly

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Responsive grid layout
- Touch-friendly buttons

## Code Organization

### ES Modules
- Modular architecture with separate concerns
- Clean separation of API, UI, storage, and app logic
- Reusable components

### Classes
- `RecipeAPI`: TheMealDB API methods
- `CocktailAPI`: TheCocktailDB API methods
- `StorageService`: localStorage operations
- `UIModule`: UI rendering and DOM manipulation
- `RecipeHub`: Main application class

### Comments
- JSDoc-style comments for all functions
- Clear documentation of parameters and return values
- Inline comments for complex logic

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- LocalStorage support required

## Performance Optimizations

- Lazy loading images
- CSS animations (GPU accelerated)
- Efficient DOM manipulation
- Debounced search (if needed)

## SEO

- Meta description and keywords
- Semantic HTML structure
- Proper heading hierarchy
- Alt text on images
- Accessible navigation

## Future Enhancements

- Recipe detail modal/page
- Shopping list feature
- Nutritional information
- Recipe sharing
- Advanced search filters
- Recipe ratings
