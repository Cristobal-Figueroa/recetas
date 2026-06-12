import { useState, useEffect } from 'react';
import { storageService } from '../services/localStorage';
import './RecipeCard.css';

export default function RecipeCard({ recipe, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(storageService.isFavorite(recipe.idMeal));
  }, [recipe.idMeal]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      storageService.removeFavorite(recipe.idMeal);
      setIsFavorite(false);
    } else {
      storageService.addFavorite(recipe.idMeal);
      setIsFavorite(true);
    }
  };

  return (
    <div 
      className="recipe-card" 
      onClick={() => onClick(recipe)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(recipe);
        }
      }}
      aria-label={`View recipe: ${recipe.strMeal}`}
    >
      <div className="recipe-image-container">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal}
          className="recipe-image"
          loading="lazy"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="recipe-info">
        <h3 className="recipe-name">{recipe.strMeal}</h3>
        {recipe.strCategory && (
          <p className="recipe-category" aria-label={`Category: ${recipe.strCategory}`}>
            📁 {recipe.strCategory}
          </p>
        )}
        {recipe.strArea && (
          <p className="recipe-area" aria-label={`Cuisine: ${recipe.strArea}`}>
            🌍 {recipe.strArea}
          </p>
        )}
      </div>
    </div>
  );
}
