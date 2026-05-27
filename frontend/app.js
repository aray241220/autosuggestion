const searchInput = document.getElementById('searchInput');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');

let debounceTimer = null;
const DEBOUNCE_DELAY = 100; // 250ms between keystrokes
const API_URL = 'https://autosuggestion-tau.vercel.app/api/suggestions';

searchInput.addEventListener('input', handleInput);
searchInput.addEventListener('keydown', handleKeydown);
document.addEventListener('click', handleClickOutside);

function handleInput(event) {
    clearTimeout(debounceTimer);
    const query = event.target.value.trim();

    if (!query) {
        closeSuggestions();
        return;
    }

    // Debounce: wait 250-300ms after each keystroke
    debounceTimer = setTimeout(() => {
        fetchSuggestions(query);
    }, DEBOUNCE_DELAY);
}

function handleKeydown(event) {
    if (event.key === 'Escape') {
        closeSuggestions();
    }
}

function handleClickOutside(event) {
    if (!event.target.closest('.search-wrapper')) {
        closeSuggestions();
    }
}

async function fetchSuggestions(query) {
    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}&limit=5`);
        const suggestions = await response.json();
        displaySuggestions(suggestions, query);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        showError('Failed to fetch suggestions');
    }
}

function displaySuggestions(suggestions, query) {
    suggestionsDropdown.innerHTML = '';

    if (suggestions.length === 0) {
        suggestionsDropdown.innerHTML = '<div class="no-suggestions">No suggestions found</div>';
        suggestionsDropdown.classList.add('active');
        return;
    }

    suggestions.forEach((suggestion) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = suggestion;
        item.addEventListener('click', () => selectSuggestion(suggestion));
        suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('active');
}

function selectSuggestion(suggestion) {
    searchInput.value = suggestion;
    closeSuggestions();
}

function closeSuggestions() {
    suggestionsDropdown.classList.remove('active');
    suggestionsDropdown.innerHTML = '';
}

function showError(message) {
    suggestionsDropdown.innerHTML = `<div class="no-suggestions">${message}</div>`;
    suggestionsDropdown.classList.add('active');
}

// Initialize
console.log('Autosuggestion app loaded. Waiting for input...');
