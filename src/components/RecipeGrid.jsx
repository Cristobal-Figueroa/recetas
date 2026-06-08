import RecipeCard from './RecipeCard';
import './RecipeGrid.css';

export default function RecipeGrid({ recipes, onRecipeClick, loading, emptyMessage }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">🍳</p>
        <p className="empty-message">{emptyMessage || 'No recipes found. Try a different search!'}</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.idMeal} 
          recipe={recipe} 
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
}
