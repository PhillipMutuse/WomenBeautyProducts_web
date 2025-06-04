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
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>Price: KES ${product.price}</p>
                            <button onclick="removeProduct('${product.id}')">Remove</button>
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
        price,
        image,
        category
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Reset form
    document.getElementById('addProductForm').reset();
    
    // Update display
    loadProducts();
}

// Remove product
function removeProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProducts();
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Add category select to product form
    const categorySelect = document.createElement('select');
    categorySelect.id = 'productCategory';
    categorySelect.innerHTML = `
        <option value="">Select Category</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
    `;
    document.getElementById('addProductForm').insertBefore(categorySelect, document.getElementById('addProductForm').elements[4]);
});

// Add new product
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const product = {
        id: Date.now().toString(),
        name: formData.get('productName'),
        price: parseFloat(formData.get('productPrice')),
        category: formData.get('productCategory'),
        image: formData.get('productImage').name
    };
    
    // Save product image
    const file = formData.get('productImage');
    const reader = new FileReader();
    reader.onload = function(e) {
        product.imageUrl = e.target.result;
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        updateProductsList();
        this.reset();
    };
    reader.readAsDataURL(file);
});

// Update category list
function updateCategoryList() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = categories.map(category => `
        <li class="category-item">
            ${category}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});
