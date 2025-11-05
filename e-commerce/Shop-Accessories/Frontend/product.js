const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function loadProduct() {
  const res = await fetch('products.json');
  const products = await res.json();
  const product = products.find(p => p.id == id);

  if (!product) {
    document.getElementById('productDetails').innerHTML = '<h2>Product not found</h2>';
    return;
  }

  document.getElementById('productDetails').innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default.jpg'">
    <p>${product.description || 'No description available.'}</p>
    <h3>Price: ₹${product.price}</h3>
    <button id="addToCart">Add to Cart</button>
    <button id="orderNow">Order Now</button>
  `;

  // Add to Cart
  document.getElementById('addToCart').addEventListener('click', () => {
    alert('✅ Added to cart successfully!');
  });

  // Order Now
  document.getElementById('orderNow').addEventListener('click', () => {
    alert('🛍️ Order placed successfully!');
  });
}

loadProduct();
