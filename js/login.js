// DOM Elements
const loginTabs = document.querySelectorAll('.tab-btn');
const loginForms = document.querySelectorAll('.login-form');
const customerLoginForm = document.getElementById('customerLogin');
const adminLoginForm = document.getElementById('adminLogin');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const registerForm = document.getElementById('registerForm');

// Admin credentials (in real application, these would be stored securely on a server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Switch between login tabs
loginTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        loginTabs.forEach(t => t.classList.remove('active'));
        loginForms.forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}Login`).classList.add('active');
    });
});

// Show/Hide Register Form
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginBox.style.display = 'none';
    registerBox.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
});

// Customer Login Handler
customerLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('customerEmail').value;
    const password = document.getElementById('customerPassword').value;

    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store logged in user
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to main page
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password');
    }
});

// Admin Login Handler
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Store admin session
        localStorage.setItem('adminLoggedIn', 'true');
        // Redirect to admin dashboard
        window.location.href = 'admin.html';
    } else {
        alert('Invalid admin credentials');
    }
});

// Register Handler
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Add new user
    users.push({
        name,
        email,
        password,
        phone
    });

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    registerBox.style.display = 'none';
    loginBox.style.display = 'block';
});