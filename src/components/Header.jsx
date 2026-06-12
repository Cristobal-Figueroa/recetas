import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ onSearch, onRandomRecipe }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Link to="/" className="logo">RecipeHub</Link>
          
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

          <Link to="/favorites" className="favorites-link">
            ⭐ Favorites
          </Link>
          
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
        <div className="container">
          <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
            <Link to="/categories" className="nav-link" onClick={closeMenu}>Categories</Link>
            <Link to="/favorites" className="nav-link" onClick={closeMenu}>My Favorites</Link>
            <button className="surprise-btn" onClick={() => { onRandomRecipe(); closeMenu(); }}>
              🎲 Surprise Me!
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
