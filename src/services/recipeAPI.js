const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeAPI = {
  // Search recipes by name
  async searchByName(query) {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${query}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  },

  // Search recipes by ingredient
  async searchByIngredient(ingredient) {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error searching by ingredient:', error);
      return [];
    }
  },

  // Get recipe details by ID
  async getRecipeById(id) {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error getting recipe details:', error);
      return null;
    }
  },

  // Get random recipe
  async getRandomRecipe() {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/random.php`);
      const data = await response.json();
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error getting random recipe:', error);
      return null;
    }
  },

  // Get recipes by category
  async getByCategory(category) {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/filter.php?c=${category}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error getting recipes by category:', error);
      return [];
    }
  },

  // Get all categories
  async getCategories() {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/categories.php`);
      const data = await response.json();
      return data.categories || [];
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },

  // Get all areas (cuisines)
  async getAreas() {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/list.php?a=list`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error getting areas:', error);
      return [];
    }
  },

  // Get recipes by area
  async getByArea(area) {
    try {
      const response = await fetch(`${MEALDB_BASE_URL}/filter.php?a=${area}`);
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      console.error('Error getting recipes by area:', error);
      return [];
    }
  },

  // Parse ingredients from meal object
  parseIngredients(meal) {
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
};
