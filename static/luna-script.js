// ============================================
// Luna Cycle 🌙 - JavaScript Functionality
// Handles async communication with FastAPI backend
// ============================================

// Configuration
const API_BASE_URL = 'http://localhost:8000';

// DOM Elements
const form = document.getElementById('prediction-form');
const loadingContainer = document.getElementById('loading');
const resultCard = document.getElementById('result-card');
const predictBtn = document.getElementById('predict-btn');

// Result elements
const predictedDateEl = document.getElementById('predicted-date');
const confidenceTextEl = document.getElementById('confidence-text');
const meanCycleEl = document.getElementById('mean-cycle');
const stdDevEl = document.getElementById('std-dev');
const confidenceIntervalEl = document.getElementById('confidence-interval');
const fertileWindowEl = document.getElementById('fertile-window');
const resultNoteEl = document.getElementById('result-note');
const noteTextEl = document.getElementById('note-text');

// ===== UTILITY FUNCTIONS =====

/**
 * Format date string to readable format
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} - Formatted date (e.g., "November 28, 2025")
 */
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00'); // Add time to avoid timezone issues
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format date string to short format
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
    loadingContainer.classList.add('active');
    resultCard.classList.remove('active');
    predictBtn.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingContainer.classList.remove('active');
    predictBtn.disabled = false;
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    alert(`Oops! 🌸\n\n${message}\n\nPlease check your input and try again.`);
}

/**
 * Display success message with results
 * @param {Object} data - Prediction results from backend
 */
function displayResults(data) {
    // Main predicted date
    const formattedDate = formatDate(data.predicted_date);
    predictedDateEl.textContent = formattedDate;
    
    // Confidence text (standard deviation in days)
    confidenceTextEl.textContent = `(±${data.std_dev} days)`;
    
    // Mean cycle length
    meanCycleEl.textContent = `${data.mean_cycle} days`;
    
    // Standard deviation
    stdDevEl.textContent = `±${data.std_dev} days`;
    
    // Confidence interval
    const ciLower = formatDateShort(data.ci_lower);
    const ciUpper = formatDateShort(data.ci_upper);
    confidenceIntervalEl.textContent = `${ciLower} - ${ciUpper}`;
    
    // Fertile window
    const fwStart = formatDateShort(data.fertile_window_start);
    const fwEnd = formatDateShort(data.fertile_window_end);
    fertileWindowEl.textContent = `${fwStart} - ${fwEnd}`;
    
    // Optional note for irregular cycles
    if (data.note) {
        noteTextEl.textContent = data.note;
        resultNoteEl.style.display = 'flex';
    } else {
        resultNoteEl.style.display = 'none';
    }
    
    // Show result card with animation
    resultCard.classList.add('active');
    
    // Scroll to results smoothly
    setTimeout(() => {
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
}

// ===== EVENT HANDLERS =====

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
async function handleSubmit(e) {
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
    
    // Validate date format (basic check)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const invalidDates = pastStarts.filter(date => !datePattern.test(date));
    
    if (invalidDates.length > 0) {
        showError(`Some dates are not in the correct format (YYYY-MM-DD):\n${invalidDates.join(', ')}`);
        return;
    }
    
    const lookback = parseInt(lookbackInput) || 6;
    
    // Prepare request data
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
        
        // Check if request was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Prediction failed. Please try again.');
        }
        
        // Parse response
        const data = await response.json();
        
        // Display results
        displayResults(data);
        
    } catch (error) {
        console.error('Prediction error:', error);
        showError(error.message || 'Unable to connect to the server. Please make sure the backend is running.');
    } finally {
        // Hide loading state
        hideLoading();
    }
}

// ===== EVENT LISTENERS =====

// Form submission
form.addEventListener('submit', handleSubmit);

// Add gentle animation on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌙 Luna Cycle is ready!');
    
    // Optional: Add enter key support for textarea
    const textarea = document.getElementById('past-dates');
    textarea.addEventListener('keydown', (e) => {
        // Allow Ctrl+Enter or Cmd+Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
});

// ===== ADDITIONAL FEATURES =====

/**
 * Add sample data for testing (optional - can be removed in production)
 */
function loadSampleData() {
    const sampleDates = `2025-07-01
2025-07-29
2025-08-27
2025-09-25
2025-10-23`;
    
    document.getElementById('past-dates').value = sampleDates;
    console.log('📝 Sample data loaded');
}

// Uncomment to enable sample data loading (for development/testing)
// window.loadSampleData = loadSampleData;

// Export functions for potential testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        formatDateShort,
        handleSubmit
    };
}
