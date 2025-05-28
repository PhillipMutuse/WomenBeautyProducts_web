// Shop Now Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for Shop Now buttons
    const shopNowButtons = document.querySelectorAll('.product-card button');
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImage = productCard.querySelector('.product-image').src;
            
            // Create cart item
            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            // Get existing cart from localStorage or create new one
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(cartItem);
            }

            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show success message
            alert(`Added ${productName} to cart!`);

            // Optionally redirect to cart page
            // window.location.href = 'cart.html';
        });
    });

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Update cart count when page loads
    updateCartCount();
});

// Update cart count when cart page loads
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    
    if (cartContainer) {
        cartContainer.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.price}</p>
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });
    }
});

// Remove item from cart
function removeFromCart(productName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
}
