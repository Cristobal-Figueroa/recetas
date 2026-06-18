/**
 * Storage Module
 * Handles localStorage operations for favorites and theme
 */

export class StorageService {
    /**
     * Get favorites from localStorage
     * @returns {Array} Array of favorite recipe IDs
     */
    static getFavorites() {
        const favorites = localStorage.getItem('recipehub_favorites');
        return favorites ? JSON.parse(favorites) : [];
    }

    /**
     * Add recipe to favorites
     * @param {string} recipeId - Recipe ID
     */
    static addFavorite(recipeId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(recipeId)) {
            favorites.push(recipeId);
            localStorage.setItem('recipehub_favorites', JSON.stringify(favorites));
        }
    }

    /**
     * Remove recipe from favorites
     * @param {string} recipeId - Recipe ID
     */
    static removeFavorite(recipeId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(recipeId);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('recipehub_favorites', JSON.stringify(favorites));
        }
    }

    /**
     * Check if recipe is favorite
     * @param {string} recipeId - Recipe ID
     * @returns {boolean} True if favorite
     */
    static isFavorite(recipeId) {
        const favorites = this.getFavorites();
        return favorites.includes(recipeId);
    }

    /**
     * Get theme from localStorage
     * @returns {string} Theme ('light' or 'dark')
     */
    static getTheme() {
        return localStorage.getItem('recipehub_theme') || 'light';
    }

    /**
     * Save theme to localStorage
     * @param {string} theme - Theme ('light' or 'dark')
     */
    static setTheme(theme) {
        localStorage.setItem('recipehub_theme', theme);
    }

    /**
     * Get recent searches from localStorage
     * @returns {Array} Array of recent search terms
     */
    static getRecentSearches() {
        const searches = localStorage.getItem('recipehub_recent_searches');
        return searches ? JSON.parse(searches) : [];
    }

    /**
     * Add search term to recent searches
     * @param {string} searchTerm - Search term
     */
    static addRecentSearch(searchTerm) {
        const searches = this.getRecentSearches();
        // Remove if already exists
        const index = searches.indexOf(searchTerm);
        if (index > -1) {
            searches.splice(index, 1);
        }
        // Add to beginning
        searches.unshift(searchTerm);
        // Keep only last 10
        if (searches.length > 10) {
            searches.pop();
        }
        localStorage.setItem('recipehub_recent_searches', JSON.stringify(searches));
    }
}
