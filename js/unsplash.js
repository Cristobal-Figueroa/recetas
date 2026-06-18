/**
 * Cocktail API Module
 * Handles cocktail data from TheCocktailDB (second API integration)
 * This demonstrates integration of multiple external APIs
 */

const COCKTAIL_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export class CocktailAPI {
    /**
     * Search cocktails by name
     * @param {string} query - Search term
     * @returns {Promise<Array>} Array of cocktails
     */
    static async searchByName(query) {
        try {
            const response = await fetch(`${COCKTAIL_BASE_URL}/search.php?s=${query}`);
            const data = await response.json();
            return data.drinks || [];
        } catch (error) {
            console.error('Error searching cocktails:', error);
            return [];
        }
    }

    /**
     * Get random cocktail
     * @returns {Promise<Object|null>} Random cocktail or null
     */
    static async getRandomCocktail() {
        try {
            const response = await fetch(`${COCKTAIL_BASE_URL}/random.php`);
            const data = await response.json();
            return data.drinks ? data.drinks[0] : null;
        } catch (error) {
            console.error('Error getting random cocktail:', error);
            return null;
        }
    }

    /**
     * Get cocktail by ID
     * @param {string} id - Cocktail ID
     * @returns {Promise<Object|null>} Cocktail object or null
     */
    static async getCocktailById(id) {
        try {
            const response = await fetch(`${COCKTAIL_BASE_URL}/lookup.php?i=${id}`);
            const data = await response.json();
            return data.drinks ? data.drinks[0] : null;
        } catch (error) {
            console.error('Error getting cocktail details:', error);
            return null;
        }
    }

    /**
     * Get cocktails by ingredient
     * @param {string} ingredient - Ingredient name
     * @returns {Promise<Array>} Array of cocktails
     */
    static async getByIngredient(ingredient) {
        try {
            const response = await fetch(`${COCKTAIL_BASE_URL}/filter.php?i=${ingredient}`);
            const data = await response.json();
            return data.drinks || [];
        } catch (error) {
            console.error('Error getting cocktails by ingredient:', error);
            return [];
        }
    }

    /**
     * Get all cocktail categories
     * @returns {Promise<Array>} Array of categories
     */
    static async getCategories() {
        try {
            const response = await fetch(`${COCKTAIL_BASE_URL}/list.php?c=list`);
            const data = await response.json();
            return data.drinks || [];
        } catch (error) {
            console.error('Error getting cocktail categories:', error);
            return [];
        }
    }
}
