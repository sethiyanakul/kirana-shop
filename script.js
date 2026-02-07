function orderNow() {
    window.open("https://wa.me/919975688058", "_blank");
}
let phone = "919876543210";

// BUY NOW (direct WhatsApp)
function buyNow(name, price, qtyId) {
    let qty = document.getElementById(qtyId).value;
    let total = price * qty;

    let msg = `Hello, I want to buy:
Product: ${name}
Quantity: ${qty}
Price: ₹${price}
Total: ₹${total}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ADD TO CART
function addToCart(name, price, qtyId) {
    let qty = parseInt(document.getElementById(qtyId).value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.name === name);
    if (item) {
        item.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart 🛒");
}

// LOAD CART
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDiv = document.getElementById("cartItems");
    let total = 0;

    cartDiv.innerHTML = "";

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;

        cartDiv.innerHTML += `
            <p>
                <b>${item.name}</b><br>
                Qty: ${item.qty} × ₹${item.price} = ₹${itemTotal}
            </p><hr>
        `;
    });

    document.getElementById("total").innerText = "Total Amount: ₹" + total;
}

// CHECKOUT
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    let msg = "Hello, I want to place an order:%0A";
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        total += itemTotal;
        msg += `${item.name} - ${item.qty} x ₹${item.price} = ₹${itemTotal}%0A`;
    });

    msg += `%0ATotal Amount: ₹${total}`;

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

// AUTO LOAD CART PAGE
if (document.getElementById("cartItems")) {
    loadCart();
}
