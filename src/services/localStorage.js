const FAVORITES_KEY = 'recipehub-favorites';
const RECENT_SEARCHES_KEY = 'recipehub-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export const storageService = {
  // Favorites
  getFavorites() {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  addFavorite(recipeId) {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
      return favorites;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return [];
    }
  },

  removeFavorite(recipeId) {
    try {
      const favorites = this.getFavorites();
      const updated = favorites.filter(id => id !== recipeId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return [];
    }
  },

  isFavorite(recipeId) {
    const favorites = this.getFavorites();
    return favorites.includes(recipeId);
  },

  // Recent Searches
  getRecentSearches() {
    try {
      const searches = localStorage.getItem(RECENT_SEARCHES_KEY);
      return searches ? JSON.parse(searches) : [];
    } catch (error) {
      console.error('Error getting recent searches:', error);
      return [];
    }
  },

  addRecentSearch(searchTerm) {
    try {
      let searches = this.getRecentSearches();
      // Remove if already exists
      searches = searches.filter(term => term !== searchTerm);
      // Add to beginning
      searches.unshift(searchTerm);
      // Keep only last 5
      searches = searches.slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      return searches;
    } catch (error) {
      console.error('Error adding recent search:', error);
      return [];
    }
  }
};
