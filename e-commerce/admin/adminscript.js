const API_URL = 'http://localhost:5000/api/products';
const form = document.getElementById('productForm');
const tableBody = document.querySelector('#productTable tbody');

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();
    if (tableBody) {
      tableBody.innerHTML = products.map(p => `
        <tr>
          <td><img src="${p.image || 'images/default.jpg'}" width="70" height="70" style="border-radius:8px;object-fit:cover;"></td>
          <td>${p.name}</td>
          <td>₹${p.price}</td>
          <td>
            <button class="edit-btn" onclick="editProduct('${p._id}', '${p.name}', '${p.price}', '${p.image || ''}')">✏️ Edit</button>
            <button class="delete-btn" onclick="deleteProduct('${p._id}')">🗑️ Delete</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('productId').value;
    const data = {
      name: document.getElementById('name').value,
      price: document.getElementById('price').value,
      image: document.getElementById('image').value,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    form.reset();
    document.getElementById('productId').value = '';
    alert(id ? 'Product updated!' : 'Product added!');
    fetchProducts();
  });
}

//  Edit product
function editProduct(id, name, price, image) {
  document.getElementById('productId').value = id;
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('image').value = image;
  window.scrollTo(0, 0);
}

// Delete product
async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
    alert('Product deleted!');
  }
}

// Dashboard stats 
async function fetchStats() {
  try {
    const res = await fetch('http://localhost:5000/api/dashboard/summary');
    const data = await res.json();

    document.getElementById('totalProducts').textContent = data.totalProducts || 0;
    document.getElementById('totalOrders').textContent = data.totalOrders || 0;
    document.getElementById('totalCustomers').textContent = data.totalCustomers || 0;

    const ctx = document.getElementById('salesChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Products', 'Orders', 'Customers'],
          datasets: [{
            label: 'Admin Overview',
            data: [data.totalProducts, data.totalOrders, data.totalCustomers],
            backgroundColor: ['#007bff', '#28a745', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
}
// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
if (toggleSidebar) {
  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}
// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
}
// Fetch Orders
async function fetchOrders() {
  const table = document.getElementById('ordersTable');
  if (!table) return;
  const res = await fetch('http://localhost:5000/api/orders');
  const orders = await res.json();
  table.innerHTML = orders.map(o => `
    <tr>
      <td>${o._id}</td>
      <td>${o.customerName}</td>
      <td>₹${o.total}</td>
      <td>${o.status}</td>
      <td>${new Date(o.date).toLocaleDateString()}</td>
    </tr>
  `).join('');
}

// Fetch Customers
async function fetchCustomers() {
  const table = document.getElementById('customersTable');
  if (!table) return;
  const res = await fetch('http://localhost:5000/api/customers');
  const customers = await res.json();
  table.innerHTML = customers.map(c => `
    <tr>
      <td>${c._id}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${new Date(c.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join('');
}
fetchOrders();
fetchCustomers();
fetchProducts();
fetchStats();