document.addEventListener('DOMContentLoaded', () => {
    // Cart Toggle Logic
    const cartToggle = document.querySelector('.cart-toggle');
    const cartPanel = document.querySelector('.cart-panel');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-close');
    
    let isCartOpen = false;

    // We can use GSAP to slide in the cart
    function openCart() {
        isCartOpen = true;
        cartOverlay.classList.add('active');
        gsap.to(cartPanel, {
            x: '0%',
            duration: 0.6,
            ease: 'power4.out'
        });
        document.body.style.overflow = 'hidden'; // prevent scroll behind
    }

    function closeCart() {
        isCartOpen = false;
        cartOverlay.classList.remove('active');
        gsap.to(cartPanel, {
            x: '100%',
            duration: 0.5,
            ease: 'power3.in'
        });
        document.body.style.overflow = '';
    }

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Mock Add to Cart functionality
    const addBtns = document.querySelectorAll('.quick-add-btn');
    const cartCountEl = document.querySelector('.cart-count');
    let cartCount = 0;

    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            if(cartCountEl) cartCountEl.textContent = cartCount;
            openCart();
            // Here you would inject the item HTML into .cart-items
            const cartItemsContainer = document.querySelector('.cart-items');
            const emptyMsg = document.querySelector('.empty-cart-msg');
            if(emptyMsg) emptyMsg.style.display = 'none';
            
            const itemHTML = `
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                    <img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=200" style="width: 80px; height: 100px; object-fit: cover;" alt="Tee">
                    <div>
                        <h4 style="font-family: var(--font-body); font-weight: 600;">Raja Graphic Tee</h4>
                        <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">Size: L</p>
                        <p>₹1,499</p>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            
            // update total mock
            document.querySelector('.cart-total span:last-child').textContent = `₹${(cartCount * 1499).toLocaleString()}`;
        });
    });
});
