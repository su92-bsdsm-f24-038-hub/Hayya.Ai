// ============================================
// Hayya.AI - Dark Luna Cycle JavaScript
// Async communication with FastAPI backend
// ============================================

// Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const form = document.getElementById('prediction-form');
const loadingState = document.getElementById('loading-state');
const resultsCard = document.getElementById('results-card');
const predictBtn = document.getElementById('predict-btn');

// Result elements
const resultIntro = document.getElementById('result-intro');
const predictedDateEl = document.getElementById('predicted-date');
const meanCycleEl = document.getElementById('mean-cycle');
const confidenceRangeEl = document.getElementById('confidence-range');
const fertileWindowEl = document.getElementById('fertile-window');
const resultNoteEl = document.getElementById('result-note');
const noteTextEl = document.getElementById('note-text');

// ===== UTILITY FUNCTIONS =====

/**
 * Format date to long format
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date (e.g., "November 28, 2025")
 */
function formatDateLong(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format date to short format
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} - Short formatted date (e.g., "Nov 28")
 */
function formatDateShort(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Show loading state
 */
function showLoading() {
    loadingState.classList.add('active');
    resultsCard.classList.remove('active');
    predictBtn.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingState.classList.remove('active');
    predictBtn.disabled = false;
}

/**
 * Display error message
 * @param {string} message - Error message
 */
function showError(message) {
    alert(`⚠️ Oops!\n\n${message}\n\nPlease check your input and try again.`);
}

/**
 * Create friendly intro text
 * @param {string} date - Predicted date
 * @param {number} stdDev - Standard deviation
 * @returns {string} - Friendly intro message
 */
function createIntroText(date, stdDev) {
    const formattedDate = formatDateLong(date);
    const days = Math.round(stdDev);
    return `You might expect your next period around ${formattedDate} (±${days} days). 💖`;
}

/**
 * Display prediction results
 * @param {Object} data - Prediction data from backend
 */
function displayResults(data) {
    // Create friendly intro message
    resultIntro.textContent = createIntroText(data.predicted_date, data.std_dev);
    
    // Predicted Date (featured)
    predictedDateEl.textContent = formatDateLong(data.predicted_date);
    
    // Mean Cycle Length
    meanCycleEl.textContent = `${data.mean_cycle} days`;
    
    // Confidence Range
    const ciLower = formatDateShort(data.ci_lower);
    const ciUpper = formatDateShort(data.ci_upper);
    confidenceRangeEl.textContent = `${ciLower} - ${ciUpper}`;
    
    // Fertile Window
    const fwStart = formatDateShort(data.fertile_window_start);
    const fwEnd = formatDateShort(data.fertile_window_end);
    fertileWindowEl.textContent = `${fwStart} - ${fwEnd}`;
    
    // Optional irregularity note
    if (data.note) {
        noteTextEl.textContent = data.note;
        resultNoteEl.style.display = 'flex';
    } else {
        resultNoteEl.style.display = 'none';
    }
    
    // Show results card with animation
    resultsCard.classList.add('active');
    
    // Smooth scroll to results
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// ===== EVENT HANDLERS =====

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const pastDatesInput = document.getElementById('past-dates').value;
    const lookbackInput = document.getElementById('lookback-cycles').value;
    
    // Parse dates (support newline or comma separation)
    const pastStarts = pastDatesInput
        .split(/[\n,]+/)
        .map(date => date.trim())
        .filter(date => date.length > 0);
    
    // Validate input
    if (pastStarts.length === 0) {
        showError('Please enter at least one past period start date.');
        return;
    }
    
    // Validate date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const invalidDates = pastStarts.filter(date => !datePattern.test(date));
    
    if (invalidDates.length > 0) {
        showError(`Invalid date format detected:\n${invalidDates.join(', ')}\n\nPlease use YYYY-MM-DD format.`);
        return;
    }
    
    const lookback = parseInt(lookbackInput) || 6;
    
    // Prepare request payload
    const requestData = {
        past_starts: pastStarts,
        lookback: lookback
    };
    
    // Show loading state
    showLoading();
    
    try {
        // Send async POST request to backend
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        
        // Check response status
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Prediction failed. Please try again.');
        }
        
        // Parse response data
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Prediction error:', error);
        showError(error.message || 'Unable to connect to the server. Please ensure the backend is running on http://localhost:8000');
    } finally {
        // Hide loading state
        hideLoading();
    }
}

// ===== EVENT LISTENERS =====

// Form submission
form.addEventListener('submit', handleFormSubmit);

// Page load event
document.addEventListener('DOMContentLoaded', () => {
    console.log('💖 Hayya.AI is ready!');
    
    // Add keyboard shortcut for textarea (Ctrl+Enter to submit)
    const textarea = document.getElementById('past-dates');
    textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
});

// ===== DEVELOPER UTILITIES =====

/**
 * Load sample data for testing (Development only)
 */
function loadSampleData() {
    const sampleDates = `2025-07-01
2025-07-29
2025-08-27
2025-09-25
2025-10-23`;
    
    document.getElementById('past-dates').value = sampleDates;
    console.log('✅ Sample data loaded');
}

// Expose to window for easy testing
window.loadSampleData = loadSampleData;

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDateLong,
        formatDateShort,
        createIntroText,
        handleFormSubmit
    };
}
