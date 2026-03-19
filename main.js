// main.js

// Cart Functionality
let cart = [];

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(item) {
    const index = cart.indexOf(item);
    if (index > -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Micro-Interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.classList.add('hover');
    });
    button.addEventListener('mouseout', () => {
        button.classList.remove('hover');
    });
});
