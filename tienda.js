// Productos disponibles en la tienda
const products = [
    {
        id: 1,
        name: 'Remera YAG3R Premium',
        description: 'Remera de algodón 100% con logo bordado',
        price: 49.99,
        image: 'tienda_imagenes/camiseta_yag3r_design.jpg'
    },
    {
        id: 2,
        name: 'Gorra Snapback',
        description: 'Gorra ajustable con logo 3D',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1562368578-7fcab1014266?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Mousepad XL',
        description: 'Mousepad gaming de 90x40 cm',
        price: 34.99,
        image: 'tienda_imagenes/BANNER.png'
    },
    {
        id: 4,
        name: 'Sticker Pack',
        description: 'Pack de 10 stickers exclusivos',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1578633769828-5a83mobi7988?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Botella Térmica',
        description: 'Botella de acero inoxidable 500ml',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Taza Gaming',
        description: 'Taza cerámica con diseño exclusivo',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400&h=300&fit=crop'
    }
];

// Estado del carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar productos en la tienda
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Añadir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Añadir producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showNotification('Producto añadido al carrito');
}

// Actualizar contador del carrito
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Renderizar contenido del carrito
function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSummaryDiv = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
        cartSummaryDiv.innerHTML = '';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-qty">Cantidad: ${item.quantity}</div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Quitar</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartSummaryDiv.innerHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Impuestos (0%):</span>
                <span>$0.00</span>
            </div>
            <div class="summary-row total-row">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Proceder al Pago</button>
        </div>
    `;
}

// Actualizar cantidad de un producto
function updateQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Procesar el pago
function checkout() {
    alert('¡Gracias por tu compra! Sistema de pago en desarrollo.\nContacta a la comunidad YAG3R para más información.');
}

// Mostrar notificación visual
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #8b5cf6, #a855f7);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Crear partículas de fondo animadas
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Abrir modal del carrito
function openCart() {
    document.getElementById('cartModal').classList.add('active');
    renderCart();
}

// Cerrar modal del carrito
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Inicializar la tienda cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    createParticles();

    // Event listeners para el carrito
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('cartModal')) {
            closeCart();
        }
    });

    // Agregar animación slideIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
