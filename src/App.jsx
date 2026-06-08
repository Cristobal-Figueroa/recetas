import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import RecipeGrid from './components/RecipeGrid'
import RecipeDetail from './components/RecipeDetail'
import Favorites from './components/Favorites'
import Categories from './components/Categories'
import { recipeAPI } from './services/recipeAPI'
import { storageService } from './services/localStorage'
import './App.css'

function AppContent() {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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
    navigate('/')
  }

  const handleRandomRecipe = async () => {
    setLoading(true)
    const recipe = await recipeAPI.getRandomRecipe()
    if (recipe) {
      navigate(`/recipe/${recipe.idMeal}`)
    }
    setLoading(false)
  }

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.idMeal}`)
  }

  return (
    <>
      <Header 
        onSearch={handleSearch}
        onRandomRecipe={handleRandomRecipe}
      />
      
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>

      <footer className="footer">
        <p>RecipeHub - Your Simple Recipe Finder</p>
        <p>Data provided by TheMealDB</p>
      </footer>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <AppContent />
      </div>
    </Router>
  )
}

export default App
