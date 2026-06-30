/* ========================================
   LIFEDENT PAKISTAN — Admin Dashboard JS
   ======================================== */

const ADMIN_PASS_KEY = 'lifedent_admin_pass';
const DEFAULT_ADMIN_PASS = 'lifedent@2025';
const SESSION_KEY = 'lifedent_admin_session';

// --- Password ---
function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASS;
}
function setAdminPassword(pass) {
  localStorage.setItem(ADMIN_PASS_KEY, pass);
}

// --- Login / Logout ---
function adminLogin(e) {
  e.preventDefault();
  const input = document.getElementById('admin-password');
  const errEl = document.getElementById('login-err');

  if (input.value === getAdminPassword()) {
    sessionStorage.setItem(SESSION_KEY, '1');
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-layout').style.display = 'flex';
    renderAdminProducts();
  } else {
    errEl.classList.add('show');
    input.classList.add('has-error');
    input.value = '';
    input.focus();
    setTimeout(() => {
      errEl.classList.remove('show');
      input.classList.remove('has-error');
    }, 3000);
  }
}

function adminLogout() {
  if (!confirm('Logout from admin panel?')) return;
  sessionStorage.removeItem(SESSION_KEY);
  closeSidebar();
  document.getElementById('admin-layout').style.display = 'none';
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-password').value = '';
  setTimeout(() => document.getElementById('admin-password').focus(), 100);
}

// --- Sidebar (mobile) ---
function toggleSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('sidebar-toggle');
  const open = sidebar.classList.toggle('open');
  overlay.classList.toggle('active', open);
  btn.classList.toggle('open', open);
}

function closeSidebar() {
  document.getElementById('admin-sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
  const btn = document.getElementById('sidebar-toggle');
  if (btn) btn.classList.remove('open');
}

// --- Section Navigation ---
function showSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById(section);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
  const activeLink = document.querySelector(`.admin-nav a[data-section="${section}"]`);
  if (activeLink) activeLink.classList.add('active');

  if (window.innerWidth <= 768) closeSidebar();
}

// --- Escape HTML (XSS prevention) ---
function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- Render Products Table ---
let editingProductId = null;

function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-body');
  if (!tbody) return;

  let products;
  try {
    products = ProductManager.getProducts();
  } catch(e) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="admin-empty"><div class="empty-icon">⚠️</div><h4>Error loading products</h4><p>Could not read from localStorage.</p></div></td></tr>';
    return;
  }

  const totalEl = document.getElementById('stat-total');
  const activeEl = document.getElementById('stat-active');
  const catsEl = document.getElementById('stat-categories');
  if (totalEl) totalEl.textContent = products.length;
  if (activeEl) activeEl.textContent = products.filter(p => p.status === 'active').length;
  if (catsEl) catsEl.textContent = ProductManager.getCategories().length;

  if (products.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="6">
        <div class="admin-empty">
          <div class="empty-icon">📦</div>
          <h4>No products yet</h4>
          <p>Click "+ Add Product" to add your first product to the catalog.</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => `
    <tr>
      <td data-label="Image">
        ${p.image
          ? `<img src="${escHtml(p.image)}" class="product-thumb" alt="${escHtml(p.name)}"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="product-thumb" style="display:none; align-items:center; justify-content:center; background:var(--off-white); font-size:1.2rem;">📦</div>`
          : `<div class="product-thumb" style="display:flex; align-items:center; justify-content:center; background:var(--off-white); font-size:1.2rem;">📦</div>`
        }
      </td>
      <td data-label="Name"><strong>${escHtml(p.name)}</strong></td>
      <td data-label="Category">${escHtml(p.category)}</td>
      <td data-label="Brand">${escHtml(p.brand || '—')}</td>
      <td data-label="Status">
        <span class="badge ${p.status === 'active' ? 'badge-active' : 'badge-draft'}">${escHtml(p.status)}</span>
      </td>
      <td data-label="Actions">
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-sm btn-outline" onclick="editProduct(${p.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// --- Form: Show/Hide ---
function showAddForm() {
  editingProductId = null;
  document.getElementById('product-form').reset();
  clearFormErrors();
  document.getElementById('image-preview').innerHTML = '';
  document.getElementById('form-title').textContent = 'Add New Product';
  document.getElementById('form-submit-btn').textContent = 'Add Product';
  document.getElementById('product-form-section').style.display = 'block';
  document.getElementById('product-form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => document.getElementById('prod-name').focus(), 300);
}

function hideForm() {
  document.getElementById('product-form-section').style.display = 'none';
  clearFormErrors();
  editingProductId = null;
}

function clearFormErrors() {
  document.querySelectorAll('#product-form .err').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('#product-form input, #product-form textarea').forEach(el => el.classList.remove('has-error'));
}

// --- Edit Product ---
function editProduct(id) {
  const products = ProductManager.getProducts();
  const product = products.find(p => p.id === id);
  if (!product) { showToast('Product not found', 'error'); return; }

  editingProductId = id;
  clearFormErrors();
  document.getElementById('form-title').textContent = 'Edit Product';
  document.getElementById('form-submit-btn').textContent = 'Save Changes';

  document.getElementById('prod-name').value = product.name || '';
  document.getElementById('prod-category').value = product.category || '';
  document.getElementById('prod-brand').value = product.brand || '';
  document.getElementById('prod-image').value = product.image || '';
  document.getElementById('prod-description').value = product.description || '';
  document.getElementById('prod-specs').value = product.specs || '';
  document.getElementById('prod-status').value = product.status || 'active';

  const preview = document.getElementById('image-preview');
  preview.innerHTML = product.image
    ? `<img src="${escHtml(product.image)}" style="max-width:160px; max-height:120px; border-radius:8px; object-fit:contain; background:var(--off-white); padding:4px;" onerror="this.style.display='none'">`
    : '';

  document.getElementById('product-form-section').style.display = 'block';
  document.getElementById('product-form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Delete Product ---
function deleteProduct(id) {
  const product = ProductManager.getProducts().find(p => p.id === id);
  if (!product) return;
  if (!confirm(`Delete "${product.name}"?\nThis cannot be undone.`)) return;
  try {
    ProductManager.removeProduct(id);
    renderAdminProducts();
    showToast('Product deleted', 'success');
  } catch(e) {
    showToast('Failed to delete product', 'error');
  }
}

// --- Form Submit with Inline Validation ---
function handleProductSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value.trim();
  const description = document.getElementById('prod-description').value.trim();
  let firstInvalid = null;

  if (!name) {
    document.getElementById('err-name').classList.add('show');
    document.getElementById('prod-name').classList.add('has-error');
    firstInvalid = firstInvalid || 'prod-name';
  }
  if (!category) {
    document.getElementById('err-category').classList.add('show');
    document.getElementById('prod-category').classList.add('has-error');
    firstInvalid = firstInvalid || 'prod-category';
  }
  if (!description) {
    document.getElementById('err-description').classList.add('show');
    document.getElementById('prod-description').classList.add('has-error');
    firstInvalid = firstInvalid || 'prod-description';
  }

  if (firstInvalid) {
    document.getElementById(firstInvalid).focus();
    showToast('Please fix the errors above', 'error');
    return;
  }

  const product = {
    name,
    category,
    brand: document.getElementById('prod-brand').value.trim(),
    image: document.getElementById('prod-image').value.trim(),
    description,
    specs: document.getElementById('prod-specs').value.trim(),
    status: document.getElementById('prod-status').value
  };

  try {
    if (editingProductId) {
      ProductManager.updateProduct(editingProductId, product);
      showToast('Product updated', 'success');
    } else {
      ProductManager.addProduct(product);
      showToast('Product added', 'success');
    }
    hideForm();
    renderAdminProducts();
  } catch(err) {
    showToast('Failed to save product. Check localStorage quota.', 'error');
  }
}

// --- Reset Products ---
function resetProducts() {
  if (!confirm('Reset all products to default?\nThis will overwrite your current catalog.')) return;
  try {
    ProductManager.resetToDefault();
    renderAdminProducts();
    showToast('Products reset to default', 'success');
  } catch(e) {
    showToast('Reset failed', 'error');
  }
}

// --- Image Upload ---
function handleImageUpload(input) {
  const file = input.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('Please select an image file', 'error');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image must be under 2MB', 'error');
    input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('prod-image').value = e.target.result;
    document.getElementById('image-preview').innerHTML =
      `<img src="${e.target.result}" style="max-width:160px; max-height:120px; border-radius:8px; object-fit:contain; background:var(--off-white); padding:4px;">`;
    showToast('Image loaded', 'success');
  };
  reader.onerror = () => showToast('Failed to load image', 'error');
  reader.readAsDataURL(file);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Check session
  if (sessionStorage.getItem(SESSION_KEY)) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-layout').style.display = 'flex';
    renderAdminProducts();
  } else {
    setTimeout(() => {
      const passInput = document.getElementById('admin-password');
      if (passInput) passInput.focus();
    }, 100);
  }

  // Product form submit
  const form = document.getElementById('product-form');
  if (form) form.addEventListener('submit', handleProductSubmit);

  // Image upload
  const imgInput = document.getElementById('prod-image-file');
  if (imgInput) imgInput.addEventListener('change', function() { handleImageUpload(this); });

  // Clear errors on input (live feedback)
  [
    ['prod-name', 'err-name'],
    ['prod-category', 'err-category'],
    ['prod-description', 'err-description']
  ].forEach(([inputId, errId]) => {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.addEventListener('input', function() {
      this.classList.remove('has-error');
      const errEl = document.getElementById(errId);
      if (errEl) errEl.classList.remove('show');
    });
  });

  // Clear login error on input
  const adminPassInput = document.getElementById('admin-password');
  if (adminPassInput) {
    adminPassInput.addEventListener('input', function() {
      this.classList.remove('has-error');
      document.getElementById('login-err').classList.remove('show');
    });
  }
});
