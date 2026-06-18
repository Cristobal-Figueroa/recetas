/**
 * UI Module
 * Handles rendering of recipes and UI elements
 */

export class UIModule {
    /**
     * Render recipe card
     * @param {Object} recipe - Recipe object
     * @param {Function} onFavoriteClick - Callback for favorite button
     * @param {Function} onCardClick - Callback for card click
     * @returns {HTMLElement} Recipe card element
     */
    static createRecipeCard(recipe, onFavoriteClick, onCardClick) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View recipe: ${recipe.strMeal}`);

        const imageContainer = document.createElement('div');
        imageContainer.className = 'recipe-image-container';

        const image = document.createElement('img');
        image.src = recipe.strMealThumb;
        image.alt = recipe.strMeal;
        image.className = 'recipe-image';
        image.loading = 'lazy';

        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.setAttribute('aria-label', 'Add to favorites');
        favoriteBtn.setAttribute('aria-pressed', 'false');
        favoriteBtn.textContent = '🤍';
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onFavoriteClick(recipe.idMeal, favoriteBtn);
        });

        imageContainer.appendChild(image);
        imageContainer.appendChild(favoriteBtn);

        const info = document.createElement('div');
        info.className = 'recipe-info';

        const name = document.createElement('h3');
        name.className = 'recipe-name';
        name.textContent = recipe.strMeal;

        info.appendChild(name);

        if (recipe.strCategory) {
            const category = document.createElement('p');
            category.className = 'recipe-category';
            category.setAttribute('aria-label', `Category: ${recipe.strCategory}`);
            category.textContent = `📁 ${recipe.strCategory}`;
            info.appendChild(category);
        }

        if (recipe.strArea) {
            const area = document.createElement('p');
            area.className = 'recipe-area';
            area.setAttribute('aria-label', `Cuisine: ${recipe.strArea}`);
            area.textContent = `🌍 ${recipe.strArea}`;
            info.appendChild(area);
        }

        card.appendChild(imageContainer);
        card.appendChild(info);

        card.addEventListener('click', () => onCardClick(recipe));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(recipe);
            }
        });

        return card;
    }

    /**
     * Render recipe grid
     * @param {Array} recipes - Array of recipes
     * @param {HTMLElement} container - Container element
     * @param {Function} onFavoriteClick - Callback for favorite button
     * @param {Function} onCardClick - Callback for card click
     */
    static renderRecipeGrid(recipes, container, onFavoriteClick, onCardClick) {
        container.innerHTML = '';
        
        if (recipes.length === 0) {
            const noResults = document.getElementById('noResults');
            noResults.style.display = 'block';
            return;
        }

        const noResults = document.getElementById('noResults');
        noResults.style.display = 'none';

        recipes.forEach(recipe => {
            const card = this.createRecipeCard(recipe, onFavoriteClick, onCardClick);
            container.appendChild(card);
        });
    }

    /**
     * Show loading state
     * @param {boolean} show - Show or hide loading
     */
    static setLoading(show) {
        const loading = document.getElementById('loading');
        const grid = document.getElementById('recipeGrid');
        
        if (show) {
            loading.style.display = 'block';
            grid.style.display = 'none';
        } else {
            loading.style.display = 'none';
            grid.style.display = 'grid';
        }
    }

    /**
     * Update page title
     * @param {string} title - Page title
     */
    static setPageTitle(title) {
        const pageTitle = document.getElementById('pageTitle');
        pageTitle.textContent = title;
    }

    /**
     * Update favorite button state
     * @param {HTMLElement} button - Favorite button element
     * @param {boolean} isFavorite - Is favorite
     */
    static updateFavoriteButton(button, isFavorite) {
        if (isFavorite) {
            button.classList.add('active');
            button.textContent = '❤️';
            button.setAttribute('aria-label', 'Remove from favorites');
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.classList.remove('active');
            button.textContent = '🤍';
            button.setAttribute('aria-label', 'Add to favorites');
            button.setAttribute('aria-pressed', 'false');
        }
    }

    /**
     * Populate category filter
     * @param {Array} categories - Array of categories
     */
    static populateCategoryFilter(categories) {
        const select = document.getElementById('categoryFilter');
        select.innerHTML = '<option value="">All Categories</option>';
        
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.strCategory;
            option.textContent = cat.strCategory;
            select.appendChild(option);
        });
    }

    /**
     * Populate area filter
     * @param {Array} areas - Array of areas
     */
    static populateAreaFilter(areas) {
        const select = document.getElementById('areaFilter');
        select.innerHTML = '<option value="">All Cuisines</option>';
        
        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area.strArea;
            option.textContent = area.strArea;
            select.appendChild(option);
        });
    }

    /**
     * Toggle mobile menu
     */
    static toggleMobileMenu() {
        const navLinks = document.getElementById('navLinks');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        navLinks.classList.toggle('nav-links-open');
        hamburgerBtn.textContent = navLinks.classList.contains('nav-links-open') ? '✕' : '☰';
    }

    /**
     * Close mobile menu
     */
    static closeMobileMenu() {
        const navLinks = document.getElementById('navLinks');
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        
        navLinks.classList.remove('nav-links-open');
        hamburgerBtn.textContent = '☰';
    }

    /**
     * Show recipe detail modal
     * @param {Object} recipe - Recipe object
     * @param {Function} parseIngredients - Function to parse ingredients
     */
    static showRecipeModal(recipe, parseIngredients) {
        const modal = document.getElementById('recipeModal');
        const modalBody = document.getElementById('modalBody');
        const modalClose = document.getElementById('modalClose');

        const ingredients = parseIngredients(recipe);

        modalBody.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="modal-recipe-image">
            <h2 class="modal-recipe-title">${recipe.strMeal}</h2>
            <div class="modal-recipe-meta">
                ${recipe.strCategory ? `<span>📁 ${recipe.strCategory}</span>` : ''}
                ${recipe.strArea ? `<span>🌍 ${recipe.strArea}</span>` : ''}
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title">Ingredients</h3>
                <div class="modal-ingredients-list">
                    ${ingredients.map(ing => `
                        <div class="modal-ingredient-item">
                            ${ing.measure ? `<strong>${ing.measure}</strong> ` : ''}${ing.name}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title">Instructions</h3>
                <div class="modal-instructions">
                    ${recipe.strInstructions.split('\r\n').map(step => 
                        step.trim() ? `<p>${step}</p>` : ''
                    ).join('')}
                </div>
            </div>
            
            ${recipe.strYoutube ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">Video Tutorial</h3>
                    <a href="${recipe.strYoutube}" target="_blank" rel="noopener noreferrer" class="btn" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; text-decoration: none; border-radius: 8px;">
                        Watch on YouTube
                    </a>
                </div>
            ` : ''}
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        modalClose.onclick = () => this.closeRecipeModal();
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeRecipeModal();
            }
        };

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeRecipeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    /**
     * Close recipe detail modal
     */
    static closeRecipeModal() {
        const modal = document.getElementById('recipeModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    /**
     * Render categories grid
     * @param {Array} categories - Array of categories
     * @param {HTMLElement} container - Container element
     * @param {Function} onCategoryClick - Callback for category click
     */
    static renderCategoriesGrid(categories, container, onCategoryClick) {
        container.innerHTML = '';
        container.className = 'categories-grid';

        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View ${cat.strCategory} recipes`);

            const image = document.createElement('img');
            image.src = cat.strCategoryThumb;
            image.alt = cat.strCategory;
            image.className = 'category-image';
            image.loading = 'lazy';

            const info = document.createElement('div');
            info.className = 'category-info';

            const name = document.createElement('h3');
            name.className = 'category-name';
            name.textContent = cat.strCategory;

            const description = document.createElement('p');
            description.className = 'category-description';
            description.textContent = cat.strCategoryDescription;

            info.appendChild(name);
            info.appendChild(description);
            card.appendChild(image);
            card.appendChild(info);

            card.addEventListener('click', () => onCategoryClick(cat.strCategory));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCategoryClick(cat.strCategory);
                }
            });

            container.appendChild(card);
        });
    }

    /**
     * Render cocktails grid
     * @param {Array} cocktails - Array of cocktails
     * @param {HTMLElement} container - Container element
     * @param {Function} onCocktailClick - Callback for cocktail click
     */
    static renderCocktailsGrid(cocktails, container, onCocktailClick) {
        container.innerHTML = '';
        container.className = 'cocktail-grid';

        cocktails.forEach(cocktail => {
            const card = document.createElement('div');
            card.className = 'cocktail-card';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View ${cocktail.strDrink} details`);

            const image = document.createElement('img');
            image.src = cocktail.strDrinkThumb;
            image.alt = cocktail.strDrink;
            image.className = 'cocktail-image';
            image.loading = 'lazy';

            const info = document.createElement('div');
            info.className = 'cocktail-info';

            const name = document.createElement('h3');
            name.className = 'cocktail-name';
            name.textContent = cocktail.strDrink;

            const category = document.createElement('p');
            category.className = 'cocktail-category';
            category.textContent = cocktail.strCategory;

            info.appendChild(name);
            info.appendChild(category);
            card.appendChild(image);
            card.appendChild(info);

            card.addEventListener('click', () => onCocktailClick(cocktail));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCocktailClick(cocktail);
                }
            });

            container.appendChild(card);
        });
    }
}
