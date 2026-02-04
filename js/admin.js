/* ========================================
   ADMIN PANEL - URL GENERATOR JAVASCRIPT
   ======================================== */

// ========== DEFAULT VALUES ==========
const DEFAULT_VALUES = {
    name: 'Premier Home Services',
    phone: '(555) 123-4567',
    email: 'info@yourbusiness.com',
    city: 'Your City',
    address: '',
    rating: '5.0',
    reviews: '50+',
    years: '10+',
    emergency: 'no'
};

// ========== FORM ELEMENTS ==========
const form = document.getElementById('adminForm');
const resultSection = document.getElementById('resultSection');
const generatedURLDisplay = document.getElementById('generatedURL');
const copyBtn = document.getElementById('copyBtn');
const previewBtn = document.getElementById('previewBtn');
const resetBtn = document.getElementById('resetBtn');
const newUrlBtn = document.getElementById('newUrlBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Stats elements
const urlLengthStat = document.getElementById('urlLength');
const paramCountStat = document.getElementById('paramCount');
const fieldsUsedStat = document.getElementById('fieldsUsed');

// Form inputs
const businessNameInput = document.getElementById('businessName');
const phoneInput = document.getElementById('phone');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const ratingInput = document.getElementById('rating');
const reviewsInput = document.getElementById('reviews');
const yearsInput = document.getElementById('years');
const emergencyInput = document.getElementById('emergency');

let currentURL = '';

// ========== GENERATE URL FUNCTION ==========
function generateURL(formData) {
    // Get the base URL (remove admin.html and use index.html)
    const baseURL = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
    const params = new URLSearchParams();
    
    let fieldsCount = 0;
    
    // Only add parameters that are provided and different from defaults
    if (formData.name && formData.name !== DEFAULT_VALUES.name) {
        params.set('name', formData.name);
        fieldsCount++;
    }
    
    if (formData.phone && formData.phone !== DEFAULT_VALUES.phone) {
        params.set('phone', formData.phone);
        fieldsCount++;
    }
    
    if (formData.city && formData.city !== DEFAULT_VALUES.city) {
        params.set('city', formData.city);
        fieldsCount++;
    }
    
    if (formData.email && formData.email !== DEFAULT_VALUES.email) {
        params.set('email', formData.email);
        fieldsCount++;
    }
    
    if (formData.address) {
        params.set('address', formData.address);
        fieldsCount++;
    }
    
    if (formData.rating && formData.rating !== DEFAULT_VALUES.rating) {
        params.set('rating', formData.rating);
        fieldsCount++;
    }
    
    if (formData.reviews && formData.reviews !== DEFAULT_VALUES.reviews) {
        params.set('reviews', formData.reviews);
        fieldsCount++;
    }
    
    if (formData.years && formData.years !== DEFAULT_VALUES.years) {
        params.set('years', formData.years);
        fieldsCount++;
    }
    
    if (formData.emergency === 'yes') {
        params.set('emergency', 'yes');
        fieldsCount++;
    }
    
    const queryString = params.toString();
    const fullURL = queryString ? `${baseURL}?${queryString}` : baseURL;
    
    return {
        url: fullURL,
        paramCount: params.toString().split('&').filter(p => p).length,
        fieldsUsed: fieldsCount
    };
}

// ========== FORM SUBMISSION ==========
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: businessNameInput.value.trim(),
        phone: phoneInput.value.trim(),
        city: cityInput.value.trim(),
        email: emailInput.value.trim(),
        address: addressInput.value.trim(),
        rating: ratingInput.value.trim(),
        reviews: reviewsInput.value.trim(),
        years: yearsInput.value.trim(),
        emergency: emergencyInput.checked ? 'yes' : 'no'
    };
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.city) {
        showToast('❌ Please fill in all required fields!', '#dc2626');
        return;
    }
    
    // Generate URL
    const result = generateURL(formData);
    currentURL = result.url;
    
    // Display URL
    generatedURLDisplay.textContent = currentURL;
    
    // Update stats
    urlLengthStat.textContent = currentURL.length;
    paramCountStat.textContent = result.paramCount;
    fieldsUsedStat.textContent = result.fieldsUsed;
    
    // Show result section
    resultSection.classList.add('show');
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Show success toast
    showToast('✅ URL Generated Successfully!', '#10b981');
});

// ========== COPY TO CLIPBOARD ==========
copyBtn.addEventListener('click', () => {
    if (!currentURL) return;
    
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                showToast('✅ URL copied to clipboard!', '#10b981');
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy URL';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopy();
            });
    } else {
        fallbackCopy();
    }
});

// Fallback copy method for older browsers
function fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = currentURL;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('✅ URL copied to clipboard!', '#10b981');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy URL';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('❌ Failed to copy. Please copy manually.', '#dc2626');
    } finally {
        document.body.removeChild(textArea);
    }
}

// ========== PREVIEW BUTTON ==========
previewBtn.addEventListener('click', () => {
    if (!currentURL) return;
    window.open(currentURL, '_blank');
    showToast('🚀 Opening preview in new tab...', '#2563eb');
});

// ========== RESET FORM ==========
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the form?')) {
        form.reset();
        resultSection.classList.remove('show');
        currentURL = '';
        showToast('🔄 Form reset successfully!', '#64748b');
    }
});

// ========== NEW URL BUTTON ==========
newUrlBtn.addEventListener('click', () => {
    resultSection.classList.remove('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('📝 Ready to create a new URL!', '#2563eb');
});

// ========== SHOW TOAST NOTIFICATION ==========
function showToast(message, color = '#10b981') {
    toastMessage.textContent = message;
    toast.style.backgroundColor = color;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========== QUICK FILL EXAMPLES ==========
window.fillExample = function(type) {
    let example;
    
    switch(type) {
        case 'plumber':
            example = {
                name: "Joe's Plumbing Services",
                phone: "(512) 555-1234",
                city: "Austin, TX",
                email: "info@joesplumbing.com",
                rating: "4.8",
                reviews: "127",
                years: "15+",
                emergency: true
            };
            break;
            
        case 'electrician':
            example = {
                name: "Smith Electric Co.",
                phone: "(214) 555-5678",
                city: "Dallas, TX",
                email: "contact@smithelectric.com",
                rating: "4.9",
                reviews: "203",
                years: "20+",
                emergency: true
            };
            break;
            
        case 'hvac':
            example = {
                name: "Cool Breeze HVAC",
                phone: "(713) 555-9999",
                city: "Houston, TX",
                email: "service@coolbreezeahvac.com",
                rating: "5.0",
                reviews: "89",
                years: "12+",
                emergency: false
            };
            break;
            
        default:
            return;
    }
    
    // Fill form
    businessNameInput.value = example.name;
    phoneInput.value = example.phone;
    cityInput.value = example.city;
    emailInput.value = example.email;
    ratingInput.value = example.rating;
    reviewsInput.value = example.reviews;
    yearsInput.value = example.years;
    emergencyInput.checked = example.emergency;
    
    showToast(`📋 Filled with ${type} example!`, '#2563eb');
    
    // Focus on first input
    businessNameInput.focus();
};

// ========== PHONE NUMBER FORMATTING ==========
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    e.target.value = value;
});

// ========== RATING VALIDATION ==========
ratingInput.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    
    if (value > 5) {
        e.target.value = '5.0';
    } else if (value < 0) {
        e.target.value = '0.0';
    }
});

// ========== AUTO-SAVE TO LOCAL STORAGE (OPTIONAL) ==========
// Save form data to localStorage on input
const autoSaveInputs = [businessNameInput, phoneInput, cityInput, emailInput];

autoSaveInputs.forEach(input => {
    // Load saved value on page load
    const savedValue = localStorage.getItem(`admin_${input.id}`);
    if (savedValue && !input.value) {
        input.value = savedValue;
    }
    
    // Save on input
    input.addEventListener('input', () => {
        localStorage.setItem(`admin_${input.id}`, input.value);
    });
});

// Clear saved data when form is reset
resetBtn.addEventListener('click', () => {
    autoSaveInputs.forEach(input => {
        localStorage.removeItem(`admin_${input.id}`);
    });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl/Cmd + C when URL is shown to copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && resultSection.classList.contains('show')) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            copyBtn.click();
        }
    }
});

// ========== INITIALIZE ==========
console.log('🛠️ Admin Panel initialized successfully!');

// Show welcome toast on first load
if (!sessionStorage.getItem('adminVisited')) {
    setTimeout(() => {
        showToast('👋 Welcome! Fill in the form to generate your demo URL.', '#2563eb');
        sessionStorage.setItem('adminVisited', 'true');
    }, 500);
}
