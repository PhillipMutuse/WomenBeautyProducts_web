// Admin functionality for managing products and categories

// Predefined categories
const categories = [
    'Skincare',
    'Makeup',
    'Hair Care',
    'Fragrances',
    'Nail Care'
];

// Load products from localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';
    
    // Group products by category
    const productsByCategory = {};
    categories.forEach(cat => {
        productsByCategory[cat] = products.filter(p => p.category === cat);
    });

    // Create category sections
    categories.forEach(category => {
        if (productsByCategory[category].length > 0) {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `
                <h2>${category}</h2>
                <div class="products-list">
                    ${productsByCategory[category].map(product => `
                        <div class="product" data-id="${product.id}">
                            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: KES ${product.price}</p>
                            <button onclick="removeProduct('${product.id}')" class="btn">Remove</button>
                        </div>
                    `).join('')}
                </div>
            `;
            productsContainer.appendChild(categorySection);
        }
    });
}

// Add new product
function addProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;
    const category = document.getElementById('productCategory').value;

    if (!name || !price || !image || !category) {
        alert('Please fill in all fields');
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newProduct = {
        id: Date.now().toString(),
        name,
        description,
        price: parseFloat(price),
        image,
        category
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Reset form
    document.getElementById('addProductForm').reset();
    
    // Update display
    loadProducts();
    alert('Product added successfully!');
}

// Remove product
function removeProduct(productId) {
    if (!confirm('Are you sure you want to remove this product?')) {
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProducts();
    alert('Product removed successfully!');
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    // Load products
    loadProducts();

    // Add event listener for the form
    const form = document.getElementById('addProductForm');
    if (form) {
        form.addEventListener('submit', addProduct);
        }
    }
});

// Remove image preview
function removePreview() {
    const preview = document.getElementById('imagePreview');
    if (preview) {
        preview.remove();
    }
    document.getElementById('productImage').value = '';
}

// Update category list
function updateCategoryList() {
    const categorySelect = document.getElementById('productCategory');
    if (categorySelect) {
        categorySelect.innerHTML = `
            <option value="">Select Category</option>
            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});
