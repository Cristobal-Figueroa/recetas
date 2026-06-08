import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/recipeAPI';
import { storageService } from '../services/localStorage';
import './RecipeDetail.css';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    setLoading(true);
    const data = await recipeAPI.getRecipeById(id);
    setRecipe(data);
    if (data) {
      setIsFavorite(storageService.isFavorite(data.idMeal));
    }
    setLoading(false);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      storageService.removeFavorite(recipe.idMeal);
      setIsFavorite(false);
    } else {
      storageService.addFavorite(recipe.idMeal);
      setIsFavorite(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="error-container">
        <p>Recipe not found</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const ingredients = recipeAPI.parseIngredients(recipe);

  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️ Saved' : '🤍 Save'}
        </button>
        <button className="print-btn" onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      <div className="recipe-detail-content">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="recipe-detail-image"
        />

        <div className="recipe-detail-info">
          <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
          
          <div className="recipe-meta">
            {recipe.strCategory && (
              <span className="meta-tag">📁 {recipe.strCategory}</span>
            )}
            {recipe.strArea && (
              <span className="meta-tag">🌍 {recipe.strArea}</span>
            )}
          </div>

          <div className="recipe-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {ingredients.map((ing, index) => (
                <li key={index}>
                  <span className="ingredient-name">{ing.name}</span>
                  {ing.measure && <span className="ingredient-measure"> - {ing.measure}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h2>Instructions</h2>
            <div className="instructions">
              {recipe.strInstructions.split('\n').map((step, index) => (
                step.trim() && (
                  <p key={index}>{step}</p>
                )
              ))}
            </div>
          </div>

          {recipe.strYoutube && (
            <div className="recipe-section">
              <h2>Video Tutorial</h2>
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="video-link"
              >
                ▶️ Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
