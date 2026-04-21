// Productos disponibles en la tienda
const products = [
    {
        id: 1,
        name: 'Remera YAG3R Premium',
        description: 'Remera de algodón 100% con logo bordado. Confeccionada en 100% algodón de alta calidad, perfecta para gaming.',
        price: 59000,
        images: ['tienda_imagenes/modelo_camiseta_yag3r.png', 'tienda_imagenes/camiseta_delante_yag3r.png', 'tienda_imagenes/camiseta_reverso_yag3r.png', 'tienda_imagenes/camisetas_dobles_yag3r.jpg']
    },
    {
        id: 2,
        name: 'Gorra YAG3R',
        description: 'Gorra ajustable con logo 3D. Diseño clásico con cierre ajustable.',
        price: 30000,
        images: [
            'tienda_imagenes/gorra_yag3r.png',
            
        ]
    },
    {
        id: 3,
        name: 'Mousepad XL',
        description: 'Mousepad gaming de 90x40 cm. Base antideslizante y superficie optimizada para precisión.',
        price: 34000,
        images: [
            'tienda_imagenes/mousepad_Xl.png'
        ]
    },
    {
        id: 4,
        name: 'Sticker Pack',
        description: 'Pack de 10 stickers exclusivos. Stickers de vinilo de alta calidad, resistentes al agua.',
        price: 10000,
        images: [
            'tienda_imagenes/stickers.png'
        ]
    },
    {
        id: 5,
        name: 'Botella Térmica',
        description: 'Botella de acero inoxidable 500ml. Mantiene bebidas frías o calientes durante horas.',
        price: 39.99,
        images: [
            'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=500&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'Taza Gaming',
        description: 'Taza cerámica con diseño exclusivo. Perfecta para café, té o cualquier bebida caliente.',
        price: 19.99,
        images: [
            'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=600&h=500&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop'
        ]
    }
];

// Estado del carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar productos en la tienda
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description.substring(0, 50)}...</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); event.stopPropagation();">
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

// Variables globales para el modal del producto
let currentProductId = null;
let currentImageIndex = 0;

// Abrir modal del producto
function openProductModal(productId) {
    currentProductId = productId;
    currentImageIndex = 0;
    
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductImage').src = product.images[0];
    
    // Mostrar indicadores de imágenes
    const indicators = document.getElementById('imageIndicators');
    indicators.innerHTML = product.images.map((_, index) => `
        <span class="indicator ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})"></span>
    `).join('');
    
    // Mostrar/ocultar botones de navegación
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    
    if (product.images.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
    
    modal.classList.add('active');
}

// Cerrar modal del producto
function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    currentProductId = null;
    currentImageIndex = 0;
}

// Cambiar imagen anterior
function prevImage() {
    const product = products.find(p => p.id === currentProductId);
    currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
    updateProductImage(product);
}

// Cambiar imagen siguiente
function nextImage() {
    const product = products.find(p => p.id === currentProductId);
    currentImageIndex = (currentImageIndex + 1) % product.images.length;
    updateProductImage(product);
}

// Seleccionar imagen por índice
function selectImage(index) {
    const product = products.find(p => p.id === currentProductId);
    currentImageIndex = index;
    updateProductImage(product);
}

// Actualizar la imagen mostrada
function updateProductImage(product) {
    document.getElementById('modalProductImage').src = product.images[currentImageIndex];
    
    // Actualizar indicadores
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentImageIndex);
    });
}

// Agregar producto al carrito desde el modal
function addToCartFromModal() {
    addToCart(currentProductId);
    closeProductModal();
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

    // Event listener para cerrar modal del producto al clickear fuera
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('productModal')) {
            closeProductModal();
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
