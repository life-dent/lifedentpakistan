/* ========================================
   LIFEDENT PAKISTAN - Main JavaScript
   ======================================== */

// --- Default Products Data ---
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "P3-i Dental Unit",
    category: "Dental Units",
    brand: "Lifedent China",
    image: "images/p3i-hero.jpg",
    description: "European-style whip arm design with premium aesthetics. Features SmoothControl™ chair system, Biotube™ auto-disinfection, cast aluminum ultra-thin backrest, dual-joint headrest, and Italian PU leather upholstery. 5 instrument positions with touch control panel.",
    specs: "Whip arm instrument table | Touch Control Panel | 5 Instrument Positions | Cast Aluminum Backrest | SmoothControl™ System | Biotube™ Disinfection | V3 LED Light",
    status: "active"
  },
  {
    id: 2,
    name: "P3-t Lite Dental Unit",
    category: "Dental Units",
    brand: "Lifedent China",
    image: "images/p3i-purple.jpg",
    description: "Minimalist yet exceptional. Side-mounted delivery system optimizes space utilization. Intelligent control with 3 doctor programs, ergonomic dental chair with self-developed foaming technology, ultra-low seating position for children and elders.",
    specs: "Side-mounted Delivery | 6 Instrument Slots | 3 Doctor Programs | 15 Memory Positions | Modular Installation | 70+ Container Loading",
    status: "active"
  },
  {
    id: 3,
    name: "Apollo 23B Steam Sterilizer",
    category: "Autoclave",
    brand: "Lifedent China",
    image: "images/apollo-closed.jpg",
    description: "European Class B standard autoclave with three-pulse pre-vacuum function. Completes standard Class B procedure in just 35 minutes. Features THT process validation, POST-DRY program, 4.3\" color touch screen, and German-made vacuum pump.",
    specs: "23L Chamber | 2300W | 220V-230V | 50/60Hz | 692×451×455mm | 5 Sterilization Programs | Built-in Printer | USB Export",
    status: "active"
  },
  {
    id: 4,
    name: "Apollo 29B Steam Sterilizer",
    category: "Autoclave",
    brand: "Lifedent China",
    image: "images/apollo-open.jpg",
    description: "Larger capacity European Class B sterilizer. Capable of containing two large-sized implant surgical instrument packs. IoT enabled via SigerCloud platform with SigerCare APP for remote monitoring.",
    specs: "29L Chamber | 3300W | 220V-230V | 50/60Hz | 692×604×567mm | IoT Connected | Auto Appointment Function",
    status: "active"
  },
  {
    id: 5,
    name: "Le Ray G Portable X-Ray",
    category: "X-Ray",
    brand: "Lifedent China",
    image: "images/leray-g.jpg",
    description: "Lightweight portable dental X-ray unit with 4.3\" medical grade color touch screen. High-capacity battery for 300 continuous exposures. 70kV tube voltage and 2mA current for high-quality diagnostic images.",
    specs: "Weight: 2.1kg | 70kV | 2mA | 0.02-2s Exposure | 0.4mm Focal Spot | 300 Exposures/Charge | Touch Screen",
    status: "active"
  },
  {
    id: 6,
    name: "Le Ray W Wall-Mounted X-Ray",
    category: "X-Ray",
    brand: "Lifedent China",
    image: "images/leray-g2.jpg",
    description: "Wall-mounted dental X-ray unit with optimized folding arm design. Light and flexible movement with stable positioning. Scientific weight ratio for smooth rotation and accurate targeting.",
    specs: "Wall Mounted | Folding Arm | 300° Rotation | High Frequency DC | Constant Voltage Control",
    status: "active"
  },
  {
    id: 7,
    name: "Dental Suction Motor",
    category: "Suction",
    brand: "Antar",
    image: "images/suction-motor.jpg",
    description: "High-performance dental suction unit available in 750L and 370X models. Reliable vacuum generation for dental procedures with durable motor and easy maintenance design.",
    specs: "Model: 750L / 370X | Professional Grade | Durable Motor | Easy Maintenance",
    status: "active"
  },
  {
    id: 8,
    name: "Oil-Free Air Compressor",
    category: "Compressor",
    brand: "Lifedent Pakistan",
    image: "images/compressor.jpg",
    description: "40L oil-free dental air compressor providing clean, dry air for dental instruments. 850W power output ensures consistent performance for single or multiple dental units.",
    specs: "40L Tank | 850W | Oil-Free | Clean Air Output | Low Noise Operation",
    status: "active"
  }
];

// --- Product Manager ---
const ProductManager = {
  getProducts() {
    const stored = localStorage.getItem('lifedent_products');
    if (!stored) {
      localStorage.setItem('lifedent_products', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    return JSON.parse(stored);
  },
  saveProducts(products) {
    localStorage.setItem('lifedent_products', JSON.stringify(products));
  },
  addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now();
    products.push(product);
    this.saveProducts(products);
    return product;
  },
  removeProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },
  updateProduct(id, data) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) { products[idx] = { ...products[idx], ...data }; }
    this.saveProducts(products);
  },
  getCategories() {
    const products = this.getProducts();
    return [...new Set(products.map(p => p.category))];
  },
  resetToDefault() {
    localStorage.setItem('lifedent_products', JSON.stringify(DEFAULT_PRODUCTS));
  }
};

// --- Render Products on Products Page ---
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  let products = ProductManager.getProducts().filter(p => p.status === 'active');
  if (filter !== 'all') {
    products = products.filter(p => p.category === filter);
  }
  
  if (products.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:60px 20px;"><p style="font-size:1.1rem;">No products found in this category.</p></div>';
    return;
  }
  
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="showProductModal(${p.id})">
      <div class="product-card-image">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<div style="color:var(--gray-200);"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg></div>`}
      </div>
      <div class="product-card-body">
        <div class="category">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
      <div class="product-card-footer">
        <span class="brand">${p.brand}</span>
        <span class="btn btn-sm btn-outline">View Details</span>
      </div>
    </div>
  `).join('');
}

// --- Render Featured Products on Home ---
function renderFeaturedProducts() {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  
  const products = ProductManager.getProducts().filter(p => p.status === 'active').slice(0, 4);
  
  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-card-image">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : `<div style="color:var(--gray-200);"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.27 6.96 12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg></div>`}
      </div>
      <div class="product-card-body">
        <div class="category">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
      <div class="product-card-footer">
        <span class="brand">${p.brand}</span>
        <a href="products.html" class="btn btn-sm btn-outline">View Details</a>
      </div>
    </div>
  `).join('');
}

// --- Category Filters ---
function renderCategoryFilters() {
  const filterWrap = document.getElementById('category-filters');
  if (!filterWrap) return;
  
  const categories = ProductManager.getCategories();
  filterWrap.innerHTML = `
    <button class="btn btn-sm btn-primary filter-btn active" data-filter="all">All Products</button>
    ${categories.map(c => `<button class="btn btn-sm btn-outline filter-btn" data-filter="${c}">${c}</button>`).join('')}
  `;
  
  filterWrap.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      filterWrap.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline');
      });
      this.classList.remove('btn-outline');
      this.classList.add('active', 'btn-primary');
      renderProducts(this.dataset.filter);
    });
  });
}

// --- Product Modal ---
function showProductModal(id) {
  const product = ProductManager.getProducts().find(p => p.id === id);
  if (!product) return;
  
  const modal = document.getElementById('product-modal');
  modal.querySelector('.modal-content').innerHTML = `
    <button class="modal-close" onclick="closeModal()">&times;</button>
    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width:100%; max-height:300px; object-fit:contain; background:var(--off-white); padding:20px;">` : ''}
    <div class="category" style="margin-top:20px; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:var(--blue);">${product.category}</div>
    <h2 style="margin:8px 0 12px;">${product.name}</h2>
    <p style="margin-bottom:16px;">${product.description}</p>
    <h4 style="margin-bottom:8px;">Specifications</h4>
    <p style="font-size:0.9rem; color:var(--gray-500);">${product.specs || 'Contact us for detailed specifications.'}</p>
    <p style="margin-top:8px; font-size:0.85rem;"><strong>Brand:</strong> ${product.brand}</p>
    <div style="margin-top:24px; display:flex; gap:12px;">
      <a href="https://wa.me/923343435910?text=Hi, I'm interested in ${encodeURIComponent(product.name)}" target="_blank" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> WhatsApp Inquiry</a>
      <a href="contact.html" class="btn btn-outline">Contact Us</a>
    </div>
  `;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// --- Header Scroll Effect ---
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// --- Mobile Menu Toggle ---
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('active');
  });
}

// --- Active Nav Link ---
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// --- Toast ---
function showToast(msg, type = '') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- Contact Form Handler ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const phone = data.get('phone');
    const message = data.get('message');
    const whatsappMsg = `New Inquiry from ${name}\nPhone: ${phone}\nMessage: ${message}`;
    window.open(`https://wa.me/923343435910?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    showToast('Redirecting to WhatsApp...', 'success');
    form.reset();
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  setActiveNav();
  renderFeaturedProducts();
  renderProducts();
  renderCategoryFilters();
  initContactForm();
  
  // Close modal on overlay click
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
