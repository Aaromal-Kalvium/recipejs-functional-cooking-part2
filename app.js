// Recipe data - Foundation for all 4 parts
const recipes = [
	{
		id: 1,
		title: "Classic Spaghetti Carbonara",
		time: 25,
		difficulty: "easy",
		description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
		category: "pasta"
	},
	{
		id: 2,
		title: "Chicken Tikka Masala",
		time: 45,
		difficulty: "medium",
		description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
		category: "curry"
	},
	{
		id: 3,
		title: "Homemade Croissants",
		time: 180,
		difficulty: "hard",
		description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
		category: "baking"
	},
	{
		id: 4,
		title: "Greek Salad",
		time: 15,
		difficulty: "easy",
		description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
		category: "salad"
	},
	{
		id: 5,
		title: "Beef Wellington",
		time: 120,
		difficulty: "hard",
		description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
		category: "meat"
	},
	{
		id: 6,
		title: "Vegetable Stir Fry",
		time: 20,
		difficulty: "easy",
		description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
		category: "vegetarian"
	},
	{
		id: 7,
		title: "Pad Thai",
		time: 30,
		difficulty: "medium",
		description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
		category: "noodles"
	},
	{
		id: 8,
		title: "Margherita Pizza",
		time: 60,
		difficulty: "medium",
		description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
		category: "pizza"
	}
];

// Export or attach to window if needed later
// window.recipes = recipes;

// DOM Selection - Get the container where recipes will be displayed
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');
console.log(recipeContainer);

// State Management
let currentFilter = 'all';
let currentSort = 'none';

// Pure Filter Functions
const filterByDifficulty = (recipes, filterType) => {
	switch (filterType) {
		case 'easy':
			return recipes.filter(recipe => recipe.difficulty === 'easy');
		case 'medium':
			return recipes.filter(recipe => recipe.difficulty === 'medium');
		case 'hard':
			return recipes.filter(recipe => recipe.difficulty === 'hard');
		case 'quick':
			return recipes.filter(recipe => recipe.time < 30);
		case 'all':
		default:
			return recipes;
	}
};

const applyFilter = (recipes, filterType) => {
	return filterByDifficulty(recipes, filterType);
};

// Pure Sort Functions
const sortByName = (recipes) => {
	return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipes) => {
	return [...recipes].sort((a, b) => a.time - b.time);
};

const applySort = (recipes, sortType) => {
	switch (sortType) {
		case 'name':
			return sortByName(recipes);
		case 'time':
			return sortByTime(recipes);
		case 'none':
		default:
			return recipes;
	}
};

// Main Update Function - Orchestrates filtering, sorting, and rendering
const updateDisplay = () => {
	let recipesToDisplay = [...recipes]; // Start with copy of all recipes
	
	// Apply filter
	recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
	
	// Apply sort
	recipesToDisplay = applySort(recipesToDisplay, currentSort);
	
	// Render to screen
	renderRecipes(recipesToDisplay);
	
	// Update button states
	updateActiveButtons();
	
	// Log for debugging
	console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
};

// Helper function to update active button styling
const updateActiveButtons = () => {
	// Update filter buttons
	filterButtons.forEach(btn => {
		const filterType = btn.dataset.filter;
		if (filterType === currentFilter) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});
	
	// Update sort buttons
	sortButtons.forEach(btn => {
		const sortType = btn.dataset.sort;
		if (sortType === currentSort) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});
};

// Event Handlers
const handleFilterClick = (event) => {
	currentFilter = event.target.dataset.filter;
	updateDisplay();
};

const handleSortClick = (event) => {
	currentSort = event.target.dataset.sort;
	updateDisplay();
};

// Set up Event Listeners
const setupEventListeners = () => {
	filterButtons.forEach(btn => {
		btn.addEventListener('click', handleFilterClick);
	});
	
	sortButtons.forEach(btn => {
		btn.addEventListener('click', handleSortClick);
	});
};

// Function to create HTML for a single recipe card
const createRecipeCard = (recipe) => {
	return `
		<div class="recipe-card" data-id="${recipe.id}">
			<h3>${recipe.title}</h3>
			<div class="recipe-meta">
				<span>⏱️ ${recipe.time} min</span>
				<span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
			</div>
			<p>${recipe.description}</p>
		</div>
	`;
};

console.log(createRecipeCard(recipes[0]));

// Function to render recipes to the DOM
const renderRecipes = (recipesToRender) => {
	const allCardsHTML = recipesToRender
		.map(createRecipeCard)
		.join('');

	if (recipeContainer) {
		recipeContainer.innerHTML = allCardsHTML;
	}
};

// Initialize: Render all recipes and setup interactivity when page loads
updateDisplay();
setupEventListeners();

