// ======= SELECT ELEMENTS =======
const productList = document.getElementById('productList');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');

// ======= SAMPLE PRODUCTS =======
const products = [
  { id: 1, name: "Leather Bag", price: 1200, image: "https://i.imgur.com/2f3J7pO.jpeg" },
  { id: 2, name: "Tote Bag", price: 850, image: "https://i.imgur.com/LGltv5v.jpeg" },
  { id: 3, name: "Travel Backpack", price: 1900, image: "https://i.imgur.com/bmcudvZ.jpeg" },
  { id: 4, name: "Shoulder Bag", price: 950, image: "https://i.imgur.com/AT2np3q.jpeg" },
  { id: 5, name: "Mini Handbag", price: 750, image: "https://i.imgur.com/N9Zz6N5.jpeg" },
  { id: 6, name: "Sling Bag", price: 990, image: "https://i.imgur.com/ByvjVYj.jpeg" },
];

// ======= DISPLAY PRODUCTS =======
function displayProducts() {
  productList.innerHTML = "";
  products.forEach(prod => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded-xl text-center shadow hover:shadow-lg transition bg-white";
    div.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" class="w-full h-40 object-cover rounded-lg mb-3">
      <h3 class="font-semibold text-gray-800 mb-1">${prod.name}</h3>
      <p class="text-gray-600 mb-2">₱${prod.price}</p>
      <button class="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition add-btn" data-id="${prod.id}">
        Add to Cart
      </button>
    `;
    productList.appendChild(div);
  });
}

// ======= CART SYSTEM =======
let cartItems = [];

function updateCart() {
  cart.innerHTML = "";
  let total = 0;

  cartItems.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";
    div.innerHTML = `
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-sm text-gray-500">₱${item.price} × ${item.qty} = ₱${item.price * item.qty}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="decrease bg-gray-200 px-2 rounded" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="increase bg-gray-200 px-2 rounded" data-id="${item.id}">+</button>
      </div>
    `;
    cart.appendChild(div);
  });

  cartTotal.textContent = cartItems.length
    ? `Total: ₱${total.toLocaleString()}`
    : "Your cart is empty 🛒";
}

// ======= EVENT HANDLERS =======
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = parseInt(e.target.dataset.id);
    const existing = cartItems.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      const product = products.find(p => p.id === id);
      cartItems.push({ ...product, qty: 1 });
    }
    updateCart();
  }
});

cart.addEventListener("click", (e) => {
  const id = parseInt(e.target.dataset.id);
  const item = cartItems.find(p => p.id === id);
  if (!item) return;

  if (e.target.classList.contains("increase")) {
    item.qty++;
  } else if (e.target.classList.contains("decrease")) {
    item.qty--;
    if (item.qty <= 0) {
      cartItems = cartItems.filter(p => p.id !== id);
    }
  }
  updateCart();
});

clearCartBtn.addEventListener("click", () => {
  cartItems = [];
  updateCart();
});

// ======= INIT =======
displayProducts();
updateCart();
