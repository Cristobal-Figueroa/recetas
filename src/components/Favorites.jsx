import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/recipeAPI';
import { storageService } from '../services/localStorage';
import RecipeCard from './RecipeCard';
import RecipeGrid from './RecipeGrid';
import './Favorites.css';

export default function Favorites() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    const favoriteIds = storageService.getFavorites();
    
    if (favoriteIds.length === 0) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    // Fetch all favorite recipes
    const recipePromises = favoriteIds.map(id => recipeAPI.getRecipeById(id));
    const recipesData = await Promise.all(recipePromises);
    const validRecipes = recipesData.filter(r => r !== null);
    
    setRecipes(validRecipes);
    setLoading(false);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>⭐ My Favorites</h1>
        <p>{recipes.length} recipes saved</p>
      </div>

      <RecipeGrid 
        recipes={recipes}
        onRecipeClick={handleRecipeClick}
        loading={loading}
        emptyMessage="No favorites yet. Start saving recipes!"
      />
    </div>
  );
}
