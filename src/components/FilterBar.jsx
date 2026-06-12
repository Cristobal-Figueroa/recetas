import { useState, useEffect } from 'react';
import { recipeAPI } from '../services/recipeAPI';
import './FilterBar.css';

export default function FilterBar({ onFilter, recipes }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    // Extract unique areas from recipes for the dropdown (always show all available)
    if (recipes && recipes.length > 0) {
      const uniqueAreas = [...new Set(recipes.map(r => r.strArea).filter(Boolean))];
      setAllAreas(uniqueAreas.map(area => ({ strArea: area })));
      setAreas(uniqueAreas.map(area => ({ strArea: area })));
    }
  }, [recipes]);

  const loadFilters = async () => {
    const cats = await recipeAPI.getCategories();
    setCategories(cats);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter({ category: value, area: selectedArea });
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setSelectedArea(value);
    onFilter({ category: selectedCategory, area: value });
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedArea('');
    onFilter({ category: '', area: '' });
  };

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select 
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.strCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="area-filter">Cuisine</label>
          <select 
            id="area-filter"
            value={selectedArea}
            onChange={handleAreaChange}
            className="filter-select"
          >
            <option value="">All Cuisines</option>
            {allAreas.map(area => (
              <option key={area.strArea} value={area.strArea}>
                {area.strArea}
              </option>
            ))}
          </select>
        </div>

        {(selectedCategory || selectedArea) && (
          <button className="clear-filters-btn" onClick={handleClear}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
