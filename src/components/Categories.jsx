import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/recipeAPI';
import RecipeGrid from './RecipeGrid';
import './Categories.css';

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await recipeAPI.getCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    const data = await recipeAPI.getByCategory(category.strCategory);
    setRecipes(data);
    setLoading(false);
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>📁 Browse by Category</h1>
      </div>

      {!selectedCategory ? (
        <div className="categories-grid">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading categories...</p>
            </div>
          ) : (
            categories.map((category) => (
              <div 
                key={category.idCategory}
                className="category-card"
                onClick={() => handleCategoryClick(category)}
              >
                <img 
                  src={category.strCategoryThumb} 
                  alt={category.strCategory}
                  className="category-image"
                />
                <div className="category-info">
                  <h3>{category.strCategory}</h3>
                  <p>{category.strCategoryDescription}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="category-recipes">
          <button className="back-btn" onClick={() => setSelectedCategory(null)}>
            ← Back to Categories
          </button>
          <h2 className="category-title">{selectedCategory.strCategory} Recipes</h2>
          <RecipeGrid 
            recipes={recipes}
            onRecipeClick={handleRecipeClick}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
