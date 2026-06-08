import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

export default function Layout({ onSearch, onRandomRecipe }) {
  return (
    <div className="app">
      <Header 
        onSearch={onSearch}
        onRandomRecipe={onRandomRecipe}
      />
      <Outlet />
      <footer className="footer">
        <p>RecipeHub - Your Simple Recipe Finder</p>
        <p>Data provided by TheMealDB</p>
      </footer>
    </div>
  );
}
