// Authentication Dropdown
let authDropdownShown = false;

function toggleAuthDropdown() {
    const authDropdown = document.getElementById('authDropdown');
    authDropdownShown = !authDropdownShown;
    authDropdown.classList.toggle('show');
}

// Form Switching
document.addEventListener('click', (e) => {
    if (authDropdownShown && !e.target.closest('.auth-section')) {
        toggleAuthDropdown();
    }
});

function toggleAuthForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (formType === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

// Form Submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login form submitted');
    toggleAuthDropdown();
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Registration form submitted');
    toggleAuthDropdown();
});
