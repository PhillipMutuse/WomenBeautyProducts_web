// Admin credentials
const ADMIN_PASSWORD = 'admin123'; // Change this to a more secure password
const isAdmin = localStorage.getItem('isAdmin') === 'true';

// Check if user is admin
if (!isAdmin) {
    window.location.href = 'index.html';
}

// Categories
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];

// Load categories in dropdown
function loadCategories() {
    const categorySelect = document.getElementById('productCategory');
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    updateCategoryList();
    updateProductsList();
}

// Add new category
function addCategory() {
    const newCategory = document.getElementById('newCategory').value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));
        loadCategories();
        document.getElementById('newCategory').value = '';
    }
}

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
            <button onclick="removeCategory('${category}')" class="btn-danger">Remove</button>
        </li>
    `).join('');
}

// Remove category
function removeCategory(category) {
    categories = categories.filter(c => c !== category);
    localStorage.setItem('categories', JSON.stringify(categories));
    loadCategories();
}

// Update products list
function updateProductsList() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;">
            <div>
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
                <button onclick="removeProduct('${product.id}')" class="btn-danger">Remove</button>
            </div>
        </div>
    `).join('');
}

// Remove product
function removeProduct(productId) {
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    updateProductsList();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
});
