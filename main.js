document.addEventListener('DOMContentLoaded', function() {  
           
    // Currency to country mapping
    const currencyToCountry = {
        USD: 'United States',
        EUR: 'Euro Zone',
        GBP: 'United Kingdom',
        JPY: 'Japan',
        AUD: 'Australia',
        CAD: 'Canada',
        CHF: 'Switzerland',
        CNY: 'China',
        INR: 'India',
        MXN: 'Mexico',
        AED: 'United Arab Emirates',
        AFN: 'Afghanistan',
        ALL: 'Albania',
        AMD: 'Armenia',
        ANG: 'Netherlands Antilles',
        AOA: 'Angola',
        ARS: 'Argentina',
        AWG: 'Aruba',
        AZN: 'Azerbaijan',
        BAM: 'Bosnia and Herzegovina',
        BBD: 'Barbados',
        BDT: 'Bangladesh',
        BGN: 'Bulgaria',
        BHD: 'Bahrain',
        BIF: 'Burundi',
        BMD: 'Bermuda',
        BND: 'Brunei',
        BOB: 'Bolivia',
        BRL: 'Brazil',
        BSD: 'Bahamas',
        BTN: 'Bhutan',
        BWP: 'Botswana',
        BYN: 'Belarus',
        BZD: 'Belize',
        CDF: 'Democratic Republic of the Congo',
        CLP: 'Chile',
        COP: 'Colombia',
        CRC: 'Costa Rica',
        CUP: 'Cuba',
        CVE: 'Cape Verde',
        CZK: 'Czech Republic',
        DJF: 'Djibouti',
        DKK: 'Denmark',
        DOP: 'Dominican Republic',
        DZD: 'Algeria',
        EGP: 'Egypt',
        ETB: 'Ethiopia',
        FJD: 'Fiji',
        GEL: 'Georgia',
        GHS: 'Ghana',
        GMD: 'Gambia',
        GNF: 'Guinea',
        GTQ: 'Guatemala',
        GYD: 'Guyana',
        HKD: 'Hong Kong',
        HNL: 'Honduras',
        HRK: 'Croatia',
        HTG: 'Haiti',
        HUF: 'Hungary',
        IDR: 'Indonesia',
        ILS: 'Israel',
        IQD: 'Iraq',
        IRR: 'Iran',
        ISK: 'Iceland',
        JMD: 'Jamaica',
        JOD: 'Jordan',
        KES: 'Kenya',
        KGS: 'Kyrgyzstan',
        KHR: 'Cambodia',
        KMF: 'Comoros',
        KRW: 'South Korea',
        KWD: 'Kuwait',
        KYD: 'Cayman Islands',
        KZT: 'Kazakhstan',
        LAK: 'Laos',
        LBP: 'Lebanon',
        LKR: 'Sri Lanka',
        LRD: 'Liberia',
        LSL: 'Lesotho',
        LYD: 'Libya',
        MAD: 'Morocco',
        MDL: 'Moldova',
        MGA: 'Madagascar',
        MKD: 'North Macedonia',
        MMK: 'Myanmar',
        MNT: 'Mongolia',
        MOP: 'Macau',
        MRU: 'Mauritania',
        MUR: 'Mauritius',
        MVR: 'Maldives',
        MWK: 'Malawi',
        MYR: 'Malaysia',
        MZN: 'Mozambique',
        NAD: 'Namibia',
        NGN: 'Nigeria',
        NIO: 'Nicaragua',
        NOK: 'Norway',
        NPR: 'Nepal',
        NZD: 'New Zealand',
        OMR: 'Oman',
        PAB: 'Panama',
        PEN: 'Peru',
        PGK: 'Papua New Guinea',
        PHP: 'Philippines',
        PKR: 'Pakistan',
        PLN: 'Poland',
        PYG: 'Paraguay',
        QAR: 'Qatar',
        RON: 'Romania',
        RSD: 'Serbia',
        RUB: 'Russia',
        RWF: 'Rwanda',
        SAR: 'Saudi Arabia',
        SBD: 'Solomon Islands',
        SCR: 'Seychelles',
        SDG: 'Sudan',
        SEK: 'Sweden',
        SGD: 'Singapore',
        SLL: 'Sierra Leone',
        SOS: 'Somalia',
        SRD: 'Suriname',
        SSP: 'South Sudan',
        STN: 'São Tomé and Príncipe',
        SYP: 'Syria',
        SZL: 'Eswatini',
        THB: 'Thailand',
        TJS: 'Tajikistan',
        TMT: 'Turkmenistan',
        TND: 'Tunisia',
        TOP: 'Tonga',
        TRY: 'Turkey',
        TTD: 'Trinidad and Tobago',
        TWD: 'Taiwan',
        TZS: 'Tanzania',
        UAH: 'Ukraine',
        UGX: 'Uganda',
        UYU: 'Uruguay',
        UZS: 'Uzbekistan',
        VES: 'Venezuela',
        VND: 'Vietnam',
        VUV: 'Vanuatu',
        WST: 'Samoa',
        XAF: 'Central African CFA',
        XCD: 'Eastern Caribbean',
        XOF: 'West African CFA',
        XPF: 'CFP Franc',
        YER: 'Yemen',
        ZAR: 'South Africa',
        ZMW: 'Zambia',
        ZWL: 'Zimbabwe',
        // Cryptocurrency codes (not tied to countries)
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
        LTC: 'Litecoin',
        XRP: 'Ripple',
        DOGE: 'Dogecoin'
    };
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
        }
    });
    
    // Currency converter functionality
    const API_KEY = "172e8a9f78a44c117b6be006";
    const API_BASE = "https://v6.exchangerate-api.com/v6";
    
    // DOM Elements
    const converterForm = document.getElementById('converterForm');
    const quantityInput = document.getElementById('quantity');
    const currencySelect = document.getElementById('currency');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.getElementById('swapBtn');
    const searchInput = document.getElementById('searchCurrency');
    const resultsTable = document.getElementById('resultsTable');
    const outputSection = document.getElementById('outputSection');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    const quickCurrencies = document.getElementById('quickCurrencies');
    
    // State variables
    let currentResults = [];
    let favoriteCurrencies = JSON.parse(localStorage.getItem('favoritesCurrencies') || '["USD", "EUR", "GBP", "JPY", "INR"]');
    let targetCurrency = 'EUR'; // Default target currency for swap feature
    
    /**
     * Initialize quick convert currencies
     */
    function initQuickCurrencies() {
        const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR' , 'SAR'];
        quickCurrencies.innerHTML = '';
        
        popularCurrencies.forEach(currency => {
            const badge = document.createElement('div');
            badge.className = 'currency-badge';
            badge.textContent = currency;
            badge.addEventListener('click', () => {
                currencySelect.value = currency;
                fetchCurrencyData(parseFloat(quantityInput.value) || 1, currency);
            });
            quickCurrencies.appendChild(badge);
        });
    }
    
    /**
     * Load saved preferences from localStorage
     */
    function loadSavedPreferences() {
        const lastBaseCurrency = localStorage.getItem('lastBaseCurrency');
        const lastAmount = localStorage.getItem('lastAmount');
        
        if (lastBaseCurrency && currencySelect.querySelector(`option[value="${lastBaseCurrency}"]`)) {
            currencySelect.value = lastBaseCurrency;
        }
        
        if (lastAmount) {
            quantityInput.value = lastAmount;
        }
    }
    
    /**
     * Format currency values according to locale
     * @param {number} value - The value to format
     * @param {string} currencyCode - Currency code for formatting
     * @returns {string} Formatted currency string
     */
    function formatCurrency(value, currencyCode) {
        // List of standard currency codes that Intl.NumberFormat supports
        const standardCurrencyCodes = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "MXN", "BRL", "RUB"];
        
        // Check if it's a standard currency code
        if (standardCurrencyCodes.includes(currencyCode)) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currencyCode,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value);
        } else {
            // For non-standard codes (like crypto), use a generic format with the code appended
            return new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(value) + " " + currencyCode;
        }
    }
    
    /**
     * Get country name for a currency code
     * @param {string} currencyCode - The currency code
     * @returns {string} Country name or 'Unknown'
     */
    function getCountryForCurrency(currencyCode) {
        return currencyToCountry[currencyCode] || 'Unknown';
    }
    
    /**
     * Fetch and display currency data
     * @param {number} amount - Amount to convert
     * @param {string} baseCurrency - Base currency code
     */
    async function fetchCurrencyData(amount, baseCurrency) {
        // Validate inputs
        if (!amount || isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount greater than 0');
            return;
        }
        
        // Save preferences
        localStorage.setItem('lastBaseCurrency', baseCurrency);
        localStorage.setItem('lastAmount', amount);
        
        // Show loader, hide error
        loader.style.display = 'block';
        errorMessage.style.display = 'none';
        outputSection.style.display = 'none';
        
        try {
            // Construct API URL with the correct format for exchangerate-api
            const url = `${API_BASE}/${API_KEY}/latest/${baseCurrency}`;
            console.log(`Fetching data from: ${url}`);
            
            const response = await fetch(url);
            console.log('Response status:', response.status);
            
            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON response but got ${contentType}`);
            }
            
            const data = await response.json();
            console.log('API response:', data);
            
            // Check if the API response is successful
            if (data.result !== "success") {
                throw new Error(`API Error: ${data["error-type"] || 'Unknown error'}`);
            }
            
            currentResults = [];
            
            // Process results - exchangerate-api uses "conversion_rates" object
            for (let key in data.conversion_rates) {
                const convertedValue = data.conversion_rates[key] * amount;
                
                currentResults.push({
                    name: key,
                    code: key,
                    country: getCountryForCurrency(key),
                    value: convertedValue,
                    isFavorite: favoriteCurrencies.includes(key)
                });
            }
            
            displayResults();
            outputSection.style.display = 'block';
        }
        catch (error) {
            console.error('Error fetching currency data:', error);
            errorMessage.textContent = `Unable to fetch currency rates: ${error.message}`;
            errorMessage.style.display = 'block';
        }
        finally {
            loader.style.display = 'none';
        }
    }
    
    /**
     * Display results in table
     * @param {string} filterText - Optional text to filter results
     */
    function displayResults(filterText = '') {
        console.log('Displaying results with filter:', filterText);
        let filteredResults = currentResults;
        
        // Apply filter if provided
        if (filterText) {
            filterText = filterText.toLowerCase();
            filteredResults = currentResults.filter(currency => 
                currency.name.toLowerCase().includes(filterText) ||
                currency.code.toLowerCase().includes(filterText) ||
                currency.country.toLowerCase().includes(filterText)
            );
        }
        
        // Sort results: favorites first, then alphabetically
        filteredResults = filteredResults.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return a.code.localeCompare(b.code);
        });
        
        // Generate table HTML
        let tableHTML = '';
        filteredResults.forEach(currency => {
            const starClass = currency.isFavorite ? 'active' : '';
            
            tableHTML += `
                <tr>
                    <td>
                        <span class="star-icon ${starClass}" data-currency="${currency.code}">
                            ${currency.isFavorite ? '★' : '☆'}
                        </span>
                    </td>
                    <td>${currency.name}</td>
                    <td class="country-name">${currency.country}</td>
                    <td>${currency.code}</td>
                    <td>${formatCurrency(currency.value, currency.code)}</td>
                </tr>
            `;
        });
        
        resultsTable.innerHTML = tableHTML;
        console.log('Table updated with', filteredResults.length, 'results');
        
        // Add event listeners to star icons
        document.querySelectorAll('.star-icon').forEach(star => {
            star.addEventListener('click', function() {
                const currencyCode = this.getAttribute('data-currency');
                toggleFavorite(currencyCode);
                displayResults(filterText); // Refresh display
            });
        });
    }
    
    /**
     * Toggle a currency's favorite status
     * @param {string} currencyCode - Currency code to toggle
     */
    function toggleFavorite(currencyCode) {
        const index = favoriteCurrencies.indexOf(currencyCode);
        
        if (index === -1) {
            // Add to favorites
            favoriteCurrencies.push(currencyCode);
        } else {
            // Remove from favorites
            favoriteCurrencies.splice(index, 1);
        }
        
        // Update in localStorage
        localStorage.setItem('favoritesCurrencies', JSON.stringify(favoriteCurrencies));
        
        // Update isFavorite property in currentResults
        currentResults.forEach(currency => {
            if (currency.code === currencyCode) {
                currency.isFavorite = !currency.isFavorite;
            }
        });
    }
    
    // Event Listeners
    if (converterForm) {
        converterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            const amount = parseFloat(quantityInput.value);
            const baseCurrency = currencySelect.value;
            console.log(`Converting ${amount} ${baseCurrency}`);
            fetchCurrencyData(amount, baseCurrency);
        });
    } else {
        console.error('Converter form not found in DOM');
    }
    
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            // Swap base currency with target currency
            const currentBase = currencySelect.value;
            currencySelect.value = targetCurrency;
            targetCurrency = currentBase;
            
            // Perform conversion with new base
            const amount = parseFloat(quantityInput.value) || 1;
            console.log(`Swapped currencies. New base: ${currencySelect.value}`);
            fetchCurrencyData(amount, currencySelect.value);
        });
    } else {
        console.error('Swap button not found in DOM');
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            displayResults(this.value);
        });
    } else {
        console.error('Search input not found in DOM');
    }
    
    // Fix for first d in document typo in original code
    console.log('Initializing Currency Converter...');
    
    // Initialize
    initQuickCurrencies();
    loadSavedPreferences();
    
    // Perform initial conversion if we have values
    if (quantityInput.value && currencySelect.value) {
        console.log('Performing initial conversion');
        fetchCurrencyData(parseFloat(quantityInput.value), currencySelect.value);
    }
    
    console.log('Currency Converter initialized');
});