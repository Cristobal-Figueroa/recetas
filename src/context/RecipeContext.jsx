import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/recipeAPI';
import { storageService } from '../services/localStorage';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    storageService.addRecentSearch(query);
    const results = await recipeAPI.searchByName(query);
    setSearchResults(results);
    navigate('/');
  };

  const handleRandomRecipe = async () => {
    const recipe = await recipeAPI.getRandomRecipe();
    if (recipe) {
      navigate(`/recipe/${recipe.idMeal}`);
    }
  };

  return (
    <RecipeContext.Provider value={{ searchResults, setSearchResults, handleSearch, handleRandomRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within RecipeProvider');
  }
  return context;
}
