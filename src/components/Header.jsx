import { useState } from 'react';
import './Header.css';

export default function Header({ onSearch, onRandomRecipe }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <h1 className="logo">RecipeHub</h1>
          
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>

          <button className="favorites-link" onClick={() => window.location.hash = '#favorites'}>
            ⭐ Favorites
          </button>
        </div>
      </div>

      <nav className="nav">
        <div className="container">
          <a href="#" className="nav-link">Home</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#favorites" className="nav-link">My Favorites</a>
          <button className="surprise-btn" onClick={onRandomRecipe}>
            🎲 Surprise Me!
          </button>
        </div>
      </nav>
    </header>
  );
}
