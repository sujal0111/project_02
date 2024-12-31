// Product data (You can add more products)
const products = [
    { id: 1, name: "Apple iPhone 16 Pro", price: 1199.99, image: "images/apple-iphone-16-pro.png" },
    { id: 2, name: "Refrigerator", price: 229.99, image: "images/refrigerator.png" },
    { id: 3, name: "4K UHD TV", price: 439.99, image: "images/4k-uhd-tv.png", discount: 15 },
    { id: 4, name: "Smart AC", price: 749.99, image: "images/smart-ac.png", discount: 10 },
    { id: 5, name: "Microwave Oven", price: 169.99, image: "images/microwave-oven.png", discount: 5 },
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartButton = document.getElementById("cartButton");
const checkoutButton = document.getElementById("checkoutButton");
const toggleThemeButton = document.getElementById("toggleTheme");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector("nav ul");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");
const closeCartButton = document.getElementById("closeCart");
const nav = document.querySelector('nav');
const sticky = nav.offsetTop;

// Display products
function displayProducts(productList = products) {
    productsContainer.innerHTML = productList.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            ${product.discount ? `<p class="discount">-${product.discount}% OFF</p>` : ''}
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `).join("");

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Update cart display
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `
        <li>${item.name} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${cart.indexOf(item)})">Remove</button>
        </li>
    `).join("");
    cartTotal.textContent = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.querySelector('.footer-newsletter form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert(`Thank you for subscribing with: ${email}`);
        e.target.reset();
    } else {
        alert('Please enter a valid email address.');
    }
});

// Toggle cart visibility
cartButton.addEventListener("click", () => {
    if (cartContainer.classList.contains("hidden")) {
        cartContainer.classList.remove("hidden");
        cartContainer.classList.add("show");
    } else {
        cartContainer.classList.remove("show");
        cartContainer.classList.add("hidden");
    }
});

closeCartButton.addEventListener("click", () => {
    cartContainer.classList.remove("show");
});

// Checkout
checkoutButton.addEventListener("click", () => {
    alert(`Thank you for your purchase! Total: $${cartTotal.textContent}`);
    cart = [];
    updateCart();
    cartContainer.classList.remove("show");
});

// Toggle theme
toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

// Toggle hamburger menu
hamburgerMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        performSearch();
    }
});

// Responsive design: reset menu for larger screens
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
    }
});

// Add scroll event listener
window.addEventListener('scroll', function() {
    if (window.pageYOffset > sticky) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }
});

// function to handle navigation
document.querySelector('nav ul li a.active').addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

displayProducts();
updateCart();
