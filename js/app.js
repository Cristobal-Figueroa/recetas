/**
 * Main Application Module
 * RecipeHub - Simple Recipe Finder
 * Built with vanilla JavaScript, HTML, and CSS
 */

import { RecipeAPI } from './api.js';
import { CocktailAPI } from './unsplash.js';
import { StorageService } from './storage.js';
import { UIModule } from './ui.js';

class RecipeHub {
    constructor() {
        this.recipes = [];
        this.currentFilter = { category: '', area: '' };
        this.init();
    }

    /**
     * Initialize application
     */
    async init() {
        this.setupEventListeners();
        this.setupTheme();
        await this.loadInitialData();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Search form
        const searchForm = document.getElementById('searchForm');
        searchForm.addEventListener('submit', (e) => this.handleSearch(e));

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Mobile menu
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        hamburgerBtn.addEventListener('click', () => UIModule.toggleMobileMenu());

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                UIModule.closeMobileMenu();
                this.handleNavigation(link.dataset.page);
            });
        });

        // Surprise button
        const surpriseBtn = document.getElementById('surpriseBtn');
        surpriseBtn.addEventListener('click', () => this.handleSurprise());

        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        const areaFilter = document.getElementById('areaFilter');
        const clearFilters = document.getElementById('clearFilters');

        categoryFilter.addEventListener('change', (e) => this.handleFilter(e, 'category'));
        areaFilter.addEventListener('change', (e) => this.handleFilter(e, 'area'));
        clearFilters.addEventListener('click', () => this.clearFilters());
    }

    /**
     * Setup theme
     */
    setupTheme() {
        const theme = StorageService.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    /**
     * Toggle theme
     */
    toggleTheme() {
        const currentTheme = StorageService.getTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        StorageService.setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    /**
     * Load initial data
     */
    async loadInitialData() {
        UIModule.setLoading(true);
        
        // Load categories
        const categories = await RecipeAPI.getCategories();
        UIModule.populateCategoryFilter(categories);

        // Load initial recipes
        this.recipes = await RecipeAPI.searchByName('chicken');
        
        // Extract unique areas from recipes
        const uniqueAreas = [...new Set(this.recipes.map(r => r.strArea).filter(Boolean))];
        const areaObjects = uniqueAreas.map(area => ({ strArea: area }));
        UIModule.populateAreaFilter(areaObjects);

        this.renderRecipes();
        UIModule.setLoading(false);
    }

    /**
     * Handle search
     */
    async handleSearch(e) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();

        if (!query) return;

        UIModule.setLoading(true);
        StorageService.addRecentSearch(query);

        this.recipes = await RecipeAPI.searchByName(query);
        this.currentFilter = { category: '', area: '' };
        
        // Reset filters
        document.getElementById('categoryFilter').value = '';
        document.getElementById('areaFilter').value = '';
        document.getElementById('clearFilters').style.display = 'none';

        UIModule.setPageTitle(`Search results for "${query}"`);
        this.renderRecipes();
        UIModule.setLoading(false);
    }

    /**
     * Handle filter change
     */
    async handleFilter(e, type) {
        const value = e.target.value;
        this.currentFilter[type] = value;

        UIModule.setLoading(true);

        let results = [];
        if (this.currentFilter.category && this.currentFilter.area) {
            // Filter by both
            const catResults = await RecipeAPI.getByCategory(this.currentFilter.category);
            results = catResults.filter(r => r.strArea === this.currentFilter.area);
            UIModule.setPageTitle(`${this.currentFilter.category} from ${this.currentFilter.area}`);
        } else if (this.currentFilter.category) {
            results = await RecipeAPI.getByCategory(this.currentFilter.category);
            UIModule.setPageTitle(`${this.currentFilter.category} Recipes`);
        } else if (this.currentFilter.area) {
            results = await RecipeAPI.getByArea(this.currentFilter.area);
            UIModule.setPageTitle(`${this.currentFilter.area} Cuisine`);
        } else {
            results = await RecipeAPI.searchByName('chicken');
            UIModule.setPageTitle('Discover Recipes');
        }

        this.recipes = results;
        this.renderRecipes();
        UIModule.setLoading(false);

        // Show/hide clear filters button
        const clearFilters = document.getElementById('clearFilters');
        clearFilters.style.display = (this.currentFilter.category || this.currentFilter.area) ? 'block' : 'none';
    }

    /**
     * Clear filters
     */
    async clearFilters() {
        this.currentFilter = { category: '', area: '' };
        document.getElementById('categoryFilter').value = '';
        document.getElementById('areaFilter').value = '';
        document.getElementById('clearFilters').style.display = 'none';

        UIModule.setLoading(true);
        this.recipes = await RecipeAPI.searchByName('chicken');
        UIModule.setPageTitle('Discover Recipes');
        this.renderRecipes();
        UIModule.setLoading(false);
    }

    /**
     * Handle surprise button
     */
    async handleSurprise() {
        UIModule.setLoading(true);
        const recipe = await RecipeAPI.getRandomRecipe();
        
        if (recipe) {
            this.recipes = [recipe];
            UIModule.setPageTitle('Surprise Recipe!');
            this.renderRecipes();
        }
        
        UIModule.setLoading(false);
    }

    /**
     * Handle navigation
     */
    async handleNavigation(page) {
        switch (page) {
            case 'home':
                UIModule.setLoading(true);
                this.recipes = await RecipeAPI.searchByName('chicken');
                UIModule.setPageTitle('Discover Recipes');
                this.renderRecipes();
                UIModule.setLoading(false);
                break;
            case 'categories':
                await this.showCategories();
                break;
            case 'favorites':
                await this.showFavorites();
                break;
            case 'cocktails':
                await this.showCocktails();
                break;
        }
    }

    /**
     * Show categories page
     */
    async showCategories() {
        UIModule.setLoading(true);
        const categories = await RecipeAPI.getCategories();
        
        const grid = document.getElementById('recipeGrid');
        UIModule.renderCategoriesGrid(
            categories,
            grid,
            (category) => this.handleCategoryClick(category)
        );
        
        UIModule.setPageTitle('Recipe Categories');
        UIModule.setLoading(false);
    }

    /**
     * Handle category click
     */
    async handleCategoryClick(category) {
        UIModule.setLoading(true);
        this.recipes = await RecipeAPI.getByCategory(category);
        UIModule.setPageTitle(`${category} Recipes`);
        this.renderRecipes();
        UIModule.setLoading(false);
    }

    /**
     * Show cocktails page
     */
    async showCocktails() {
        UIModule.setLoading(true);
        const cocktails = await CocktailAPI.searchByName('margarita');
        
        const grid = document.getElementById('recipeGrid');
        UIModule.renderCocktailsGrid(
            cocktails,
            grid,
            (cocktail) => this.handleCocktailClick(cocktail)
        );
        
        UIModule.setPageTitle('🍹 Cocktail Recipes');
        UIModule.setLoading(false);
    }

    /**
     * Handle cocktail click
     */
    async handleCocktailClick(cocktail) {
        console.log('Cocktail clicked:', cocktail.strDrink);
        alert(`Cocktail: ${cocktail.strDrink}\n\nThis would show the full cocktail details in a modal.`);
    }

    /**
     * Show favorites
     */
    async showFavorites() {
        UIModule.setLoading(true);
        const favoriteIds = StorageService.getFavorites();
        
        if (favoriteIds.length === 0) {
            this.recipes = [];
            UIModule.setPageTitle('My Favorites');
            this.renderRecipes();
            UIModule.setLoading(false);
            return;
        }

        // Fetch all favorite recipes
        const recipePromises = favoriteIds.map(id => RecipeAPI.getRecipeById(id));
        const recipes = await Promise.all(recipePromises);
        this.recipes = recipes.filter(r => r !== null);
        
        UIModule.setPageTitle('My Favorites');
        this.renderRecipes();
        UIModule.setLoading(false);
    }

    /**
     * Handle favorite click
     */
    handleFavoriteClick(recipeId, button) {
        const isFavorite = StorageService.isFavorite(recipeId);
        
        if (isFavorite) {
            StorageService.removeFavorite(recipeId);
            UIModule.updateFavoriteButton(button, false);
        } else {
            StorageService.addFavorite(recipeId);
            UIModule.updateFavoriteButton(button, true);
        }
    }

    /**
     * Handle card click - navigate to recipe detail page
     */
    handleCardClick(recipe) {
        window.location.href = `recipe.html?id=${recipe.idMeal}`;
    }

    /**
     * Render recipes
     */
    renderRecipes() {
        const grid = document.getElementById('recipeGrid');
        UIModule.renderRecipeGrid(
            this.recipes,
            grid,
            (recipeId, button) => this.handleFavoriteClick(recipeId, button),
            (recipe) => this.handleCardClick(recipe)
        );

        // Update favorite buttons
        this.recipes.forEach(recipe => {
            const isFavorite = StorageService.isFavorite(recipe.idMeal);
            // Find the button for this recipe and update it
            const buttons = document.querySelectorAll('.favorite-btn');
            buttons.forEach(btn => {
                const card = btn.closest('.recipe-card');
                if (card && card.getAttribute('aria-label')?.includes(recipe.strMeal)) {
                    UIModule.updateFavoriteButton(btn, isFavorite);
                }
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RecipeHub();
});
