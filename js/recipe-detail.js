/**
 * Recipe Detail Page Module
 * Handles loading and displaying recipe details
 */

import { RecipeAPI } from './api.js';
import { StorageService } from './storage.js';

class RecipeDetailPage {
    constructor() {
        this.init();
    }

    /**
     * Initialize page
     */
    async init() {
        this.setupTheme();
        await this.loadRecipe();
    }

    /**
     * Setup theme
     */
    setupTheme() {
        const theme = StorageService.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
    }

    /**
     * Load recipe from URL parameter
     */
    async loadRecipe() {
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');

        if (!recipeId) {
            this.showError();
            return;
        }

        const loading = document.getElementById('loading');
        const noResults = document.getElementById('noResults');
        const container = document.getElementById('recipeDetail');

        loading.style.display = 'block';
        noResults.style.display = 'none';

        const recipe = await RecipeAPI.getRecipeById(recipeId);

        loading.style.display = 'none';

        if (!recipe) {
            noResults.style.display = 'block';
            return;
        }

        this.renderRecipe(recipe);
    }

    /**
     * Render recipe details
     */
    renderRecipe(recipe) {
        const container = document.getElementById('recipeDetail');
        const ingredients = RecipeAPI.parseIngredients(recipe);
        const isFavorite = StorageService.isFavorite(recipe.idMeal);

        container.innerHTML = `
            <div class="recipe-detail-header">
                <a href="index.html" class="back-btn">← Back</a>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" id="favoriteBtn">
                    ${isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
                <button class="print-btn" onclick="window.print()">🖨️ Print</button>
            </div>

            <div class="recipe-detail-content">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-detail-image">
                
                <div class="recipe-detail-info">
                    <h1 class="recipe-detail-title">${recipe.strMeal}</h1>
                    
                    <div class="recipe-meta">
                        ${recipe.strCategory ? `<span class="meta-tag">📁 ${recipe.strCategory}</span>` : ''}
                        ${recipe.strArea ? `<span class="meta-tag">🌍 ${recipe.strArea}</span>` : ''}
                    </div>

                    <div class="recipe-section">
                        <h2>Ingredients</h2>
                        <ul class="ingredients-list">
                            ${ingredients.map(ing => `
                                <li>
                                    <span class="ingredient-name">${ing.name}</span>
                                    ${ing.measure ? `<span class="ingredient-measure">${ing.measure}</span>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="recipe-section">
                        <h2>Instructions</h2>
                        <div class="instructions">
                            ${recipe.strInstructions.split('\r\n').map(step => 
                                step.trim() ? `<p>${step}</p>` : ''
                            ).join('')}
                        </div>
                    </div>

                    ${recipe.strYoutube ? `
                        <div class="recipe-section">
                            <h2>Video Tutorial</h2>
                            <a href="${recipe.strYoutube}" target="_blank" rel="noopener noreferrer" class="video-link">
                                🎥 Watch on YouTube
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.title = `${recipe.strMeal} - RecipeHub`;

        // Setup favorite button
        const favoriteBtn = document.getElementById('favoriteBtn');
        favoriteBtn.addEventListener('click', () => this.toggleFavorite(recipe.idMeal, favoriteBtn));
    }

    /**
     * Toggle favorite
     */
    toggleFavorite(recipeId, button) {
        const isFavorite = StorageService.isFavorite(recipeId);
        
        if (isFavorite) {
            StorageService.removeFavorite(recipeId);
            button.classList.remove('active');
            button.textContent = '🤍 Add to Favorites';
        } else {
            StorageService.addFavorite(recipeId);
            button.classList.add('active');
            button.textContent = '❤️ Remove from Favorites';
        }
    }

    /**
     * Show error state
     */
    showError() {
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('noResults');
        
        loading.style.display = 'none';
        noResults.style.display = 'block';
    }
}

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RecipeDetailPage();
});
