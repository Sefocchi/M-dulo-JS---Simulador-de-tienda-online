// Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    productos.forEach((producto) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: €${producto.precio}</p>
            <button onclick="addToCart(${producto.id})">Agregar al Carrito</button>
        `;
        productList.appendChild(productElement);
    });
});

let cart = [];

// Agregar producto al carrito
function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.cantidad < product.stock) {
            cartItem.cantidad++;
        } else {
            alert("No hay suficiente stock");
        }
    } else {
        cart.push({ ...product, cantidad: 1 });
    }
    updateCart();
}

// Actualizar carrito
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        cartItems.innerHTML += `
            <li>
                ${item.nombre} - €${item.precio} x ${item.cantidad} = €${itemTotal}
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </li>
        `;
    });
    totalPrice.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Vaciar carrito
function emptyCart() {
    cart = [];
    updateCart();
}

// Proceder a comprar
function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
    } else {
        alert("Compra realizada con éxito");
        cart = [];
        updateCart();
    }
}

// Mostrar/Ocultar carrito
function toggleCart() {
    const cart = document.getElementById("cart");
    cart.style.display = cart.style.display === "none" ? "block" : "none";
}

