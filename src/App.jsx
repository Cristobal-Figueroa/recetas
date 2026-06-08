import { useState, useEffect } from 'react'
import Header from './components/Header'
import RecipeGrid from './components/RecipeGrid'
import { recipeAPI } from './services/recipeAPI'
import { storageService } from './services/localStorage'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Load initial recipes on mount
  useEffect(() => {
    loadInitialRecipes()
  }, [])

  const loadInitialRecipes = async () => {
    setLoading(true)
    const results = await recipeAPI.searchByName('chicken')
    setRecipes(results)
    setLoading(false)
  }

  const handleSearch = async (query) => {
    setLoading(true)
    setSearchTerm(query)
    storageService.addRecentSearch(query)
    const results = await recipeAPI.searchByName(query)
    setRecipes(results)
    setLoading(false)
  }

  const handleRandomRecipe = async () => {
    setLoading(true)
    const recipe = await recipeAPI.getRandomRecipe()
    setRecipes(recipe ? [recipe] : [])
    setLoading(false)
  }

  const handleRecipeClick = (recipe) => {
    alert(`Recipe details coming soon!\n\nRecipe: ${recipe.strMeal}\nCategory: ${recipe.strCategory}\nArea: ${recipe.strArea}`)
  }

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch}
        onRandomRecipe={handleRandomRecipe}
      />
      
      <main className="main-content">
        {searchTerm && (
          <h2 className="search-title">Search results for "{searchTerm}"</h2>
        )}
        
        <RecipeGrid 
          recipes={recipes}
          onRecipeClick={handleRecipeClick}
          loading={loading}
        />
      </main>

      <footer className="footer">
        <p>RecipeHub - Your Simple Recipe Finder</p>
        <p>Data provided by TheMealDB</p>
      </footer>
    </div>
  )
}

export default App
