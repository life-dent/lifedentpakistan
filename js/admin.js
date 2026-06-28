/* ========================================
   LIFEDENT PAKISTAN - Admin Dashboard JS
   ======================================== */

let editingProductId = null;

// --- Render Admin Product Table ---
function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-body');
  if (!tbody) return;
  
  const products = ProductManager.getProducts();
  
  // Update stats
  const totalEl = document.getElementById('stat-total');
  const activeEl = document.getElementById('stat-active');
  const catsEl = document.getElementById('stat-categories');
  if (totalEl) totalEl.textContent = products.length;
  if (activeEl) activeEl.textContent = products.filter(p => p.status === 'active').length;
  if (catsEl) catsEl.textContent = ProductManager.getCategories().length;
  
  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px;">No products yet. Add your first product above.</td></tr>';
    return;
  }
  
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>
        ${p.image ? `<img src="${p.image}" class="product-thumb" alt="${p.name}">` : '<div class="product-thumb" style="display:flex;align-items:center;justify-content:center;background:var(--off-white);font-size:1.2rem;">📦</div>'}
      </td>
      <td><strong>${p.name}</strong></td>
      <td>${p.category}</td>
      <td>${p.brand}</td>
      <td><span class="badge ${p.status === 'active' ? 'badge-active' : 'badge-draft'}">${p.status}</span></td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm btn-outline" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// --- Show/Hide Form ---
function showAddForm() {
  editingProductId = null;
  document.getElementById('product-form').reset();
  document.getElementById('form-title').textContent = 'Add New Product';
  document.getElementById('form-submit-btn').textContent = 'Add Product';
  document.getElementById('product-form-section').style.display = 'block';
  document.getElementById('product-form-section').scrollIntoView({ behavior: 'smooth' });
}

function hideForm() {
  document.getElementById('product-form-section').style.display = 'none';
  editingProductId = null;
}

// --- Edit Product ---
function editProduct(id) {
  const product = ProductManager.getProducts().find(p => p.id === id);
  if (!product) return;
  
  editingProductId = id;
  document.getElementById('form-title').textContent = 'Edit Product';
  document.getElementById('form-submit-btn').textContent = 'Save Changes';
  
  document.getElementById('prod-name').value = product.name;
  document.getElementById('prod-category').value = product.category;
  document.getElementById('prod-brand').value = product.brand;
  document.getElementById('prod-image').value = product.image || '';
  document.getElementById('prod-description').value = product.description;
  document.getElementById('prod-specs').value = product.specs || '';
  document.getElementById('prod-status').value = product.status;
  
  document.getElementById('product-form-section').style.display = 'block';
  document.getElementById('product-form-section').scrollIntoView({ behavior: 'smooth' });
}

// --- Delete Product ---
function deleteProduct(id) {
  const product = ProductManager.getProducts().find(p => p.id === id);
  if (!product) return;
  
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    ProductManager.removeProduct(id);
    renderAdminProducts();
    showToast('Product deleted successfully', 'success');
  }
}

// --- Handle Form Submit ---
function handleProductSubmit(e) {
  e.preventDefault();
  
  const product = {
    name: document.getElementById('prod-name').value.trim(),
    category: document.getElementById('prod-category').value.trim(),
    brand: document.getElementById('prod-brand').value.trim(),
    image: document.getElementById('prod-image').value.trim(),
    description: document.getElementById('prod-description').value.trim(),
    specs: document.getElementById('prod-specs').value.trim(),
    status: document.getElementById('prod-status').value
  };
  
  if (!product.name || !product.category) {
    showToast('Please fill in product name and category', 'error');
    return;
  }
  
  if (editingProductId) {
    ProductManager.updateProduct(editingProductId, product);
    showToast('Product updated successfully', 'success');
  } else {
    ProductManager.addProduct(product);
    showToast('Product added successfully', 'success');
  }
  
  hideForm();
  renderAdminProducts();
}

// --- Reset Products to Default ---
function resetProducts() {
  if (confirm('This will reset all products to default. Are you sure?')) {
    ProductManager.resetToDefault();
    renderAdminProducts();
    showToast('Products reset to default', 'success');
  }
}

// --- Handle Image Upload (Base64) ---
function handleImageUpload(input) {
  const file = input.files[0];
  if (!file) return;
  
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image must be under 2MB', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('prod-image').value = e.target.result;
    document.getElementById('image-preview').innerHTML = `<img src="${e.target.result}" style="max-width:200px; border-radius:8px; margin-top:8px;">`;
    showToast('Image loaded', 'success');
  };
  reader.readAsDataURL(file);
}

// --- Admin Nav ---
function showSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.getElementById(section).style.display = 'block';
  
  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  document.querySelector(`[data-section="${section}"]`).classList.add('active');
}

// --- Init Admin ---
document.addEventListener('DOMContentLoaded', () => {
  renderAdminProducts();
  
  const form = document.getElementById('product-form');
  if (form) form.addEventListener('submit', handleProductSubmit);
  
  const imgInput = document.getElementById('prod-image-file');
  if (imgInput) imgInput.addEventListener('change', function() { handleImageUpload(this); });
});
