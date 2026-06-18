/**
 * Recipe API Module
 * Handles all API calls to TheMealDB
 */

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export class RecipeAPI {
    /**
     * Search recipes by name
     * @param {string} query - Search term
     * @returns {Promise<Array>} Array of recipes
     */
    static async searchByName(query) {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${query}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error searching recipes:', error);
            return [];
        }
    }

    /**
     * Get recipe details by ID
     * @param {string} id - Recipe ID
     * @returns {Promise<Object|null>} Recipe object or null
     */
    static async getRecipeById(id) {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error('Error getting recipe details:', error);
            return null;
        }
    }

    /**
     * Get random recipe
     * @returns {Promise<Object|null>} Random recipe or null
     */
    static async getRandomRecipe() {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/random.php`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error('Error getting random recipe:', error);
            return null;
        }
    }

    /**
     * Get recipes by category
     * @param {string} category - Category name
     * @returns {Promise<Array>} Array of recipes
     */
    static async getByCategory(category) {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/filter.php?c=${category}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error getting recipes by category:', error);
            return [];
        }
    }

    /**
     * Get all categories
     * @returns {Promise<Array>} Array of categories
     */
    static async getCategories() {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/categories.php`);
            const data = await response.json();
            return data.categories || [];
        } catch (error) {
            console.error('Error getting categories:', error);
            return [];
        }
    }

    /**
     * Get all areas (cuisines)
     * @returns {Promise<Array>} Array of areas
     */
    static async getAreas() {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/list.php?a=list`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error getting areas:', error);
            return [];
        }
    }

    /**
     * Get recipes by area
     * @param {string} area - Area name
     * @returns {Promise<Array>} Array of recipes
     */
    static async getByArea(area) {
        try {
            const response = await fetch(`${MEALDB_BASE_URL}/filter.php?a=${area}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error getting recipes by area:', error);
            return [];
        }
    }

    /**
     * Parse ingredients from meal object
     * @param {Object} meal - Meal object
     * @returns {Array} Array of ingredients with measures
     */
    static parseIngredients(meal) {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    name: ingredient,
                    measure: measure || ''
                });
            }
        }
        return ingredients;
    }
}
