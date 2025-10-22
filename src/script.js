// 👜 Bag Store Product List
const products = [
  { name: "Leather Shoulder Bag", price: 899.0, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { name: "Casual Tote Bag", price: 499.0, image: "https://images.unsplash.com/photo-1618354691438-d90d5e57fa9d?w=400" },
  { name: "Luxury Handbag", price: 1599.0, image: "https://images.unsplash.com/photo-1590080875831-8a76f60e1cc9?w=400" },
  { name: "Travel Duffel Bag", price: 1200.0, image: "https://images.unsplash.com/photo-1622547748225-4b1d6c1b89cf?w=400" },
  { name: "Canvas Messenger Bag", price: 680.0, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
  { name: "Ladies Purse", price: 350.0, image: "https://images.unsplash.com/photo-1603808033192-081f2e8a10f8?w=400" },
  { name: "Men’s Office Bag", price: 950.0, image: "https://images.unsplash.com/photo-1592878904946-bd6b40d91d89?w=400" },
  { name: "Mini Crossbody Bag", price: 420.0, image: "https://images.unsplash.com/photo-1622560480680-8d2b1efc3e0d?w=400" }
];

// 🔹 DOM Elements
const productList = document.getElementById("productList");
const cartContainer = document.getElementById("cart");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

// 🛒 Cart Object
const cart = {};

// 🔸 Display Products
products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3 class="font-semibold text-gray-700">${product.name}</h3>
    <p class="text-orange-500 font-bold mt-1">₱${product.price.toFixed(2)}</p>
    <button class="bg-orange-500 text-white px-3 py-1 rounded-lg mt-2 hover:bg-orange-600 transition-all w-full">
      Add to Cart
    </button>
  `;
  card.querySelector("button").addEventListener("click", () => addToCart(product));
  productList.appendChild(card);
});

// 🔹 Add product to cart
function addToCart(product) {
  if (!cart[product.name]) {
    cart[product.name] = { ...product, quantity: 1 };
  } else {
    cart[product.name].quantity++;
  }
  updateCart();
}

// 🔹 Update cart UI
function updateCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  for (const itemName in cart) {
    const item = cart[itemName];
    total += item.price * item.quantity;

    const itemCard = document.createElement("div");
    itemCard.className = "cart-item";
    itemCard.innerHTML = `
      <div>
        <h3 class="font-semibold">${item.name}</h3>
        <p>₱${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="decreaseQty('${itemName}')">-</button>
        <span class="font-bold">${item.quantity}</span>
        <button onclick="increaseQty('${itemName}')">+</button>
      </div>
    `;
    cartContainer.appendChild(itemCard);
  }

  cartTotal.textContent = total > 0 ? `Total: ₱${total.toFixed(2)}` : "🛒 Cart is empty";
}

// 🔹 Increase / Decrease Quantity
function increaseQty(name) {
  cart[name].quantity++;
  updateCart();
}

function decreaseQty(name) {
  if (cart[name].quantity > 1) {
    cart[name].quantity--;
  } else {
    delete cart[name];
  }
  updateCart();
}

// 🔹 Clear Cart
clearCartBtn.addEventListener("click", () => {
  for (const key in cart) delete cart[key];
  updateCart();
});
