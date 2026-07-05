/* ========================================
   LIFEDENT PAKISTAN - Main JavaScript
   ======================================== */

const WA_NUMBER = '923137167094';

// --- Default Products Data ---
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "P3-i Dental Unit",
    category: "Dental Units",
    brand: "Lifedent China",
    image: "images/p3i-hero.jpg",
    gallery: ["images/p3i-hero.jpg", "images/p3i-full.jpg", "images/p3i-angle.jpg"],
    video: "",
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
    gallery: ["images/p3i-purple.jpg", "images/p3i-red.jpg"],
    video: "",
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
    gallery: ["images/apollo-closed.jpg", "images/apollo-open.jpg"],
    video: "",
    description: "European Class B standard autoclave with three-pulse pre-vacuum function. Completes standard Class B procedure in just 35 minutes. Features THT process validation, POST-DRY program, 4.3\" color touch screen, and German-made vacuum pump. Capable of sterilizing solid instruments, hollow instruments, and porous loads including fabric and paper.",
    specs: "23L Chamber | 2300W | 220V-230V | 50/60Hz | 692×451×455mm | 5 Sterilization Programs | Built-in Printer | USB Data Export | German Vacuum Pump | Class B EN13060",
    status: "active"
  },
  {
    id: 5,
    name: "Le Ray G Portable X-Ray",
    category: "X-Ray",
    brand: "Lifedent China",
    image: "images/leray-g.jpg",
    gallery: ["images/leray-g.jpg", "images/leray-g3.jpg"],
    video: "",
    description: "Lightweight portable dental X-ray unit with 4.3\" medical grade color touch screen. High-capacity battery for 300 continuous exposures. 70kV tube voltage and 2mA current for high-quality diagnostic images. Ideal for mobile dental services, rural clinics, and practices requiring flexible imaging.",
    specs: "Weight: 2.1kg | 70kV | 2mA | 0.02–2s Exposure | 0.4mm Focal Spot | 300 Exposures/Charge | Touch Screen | Battery Powered",
    status: "active"
  },
  {
    id: 9,
    name: "Digital X-Ray Sensor (RVG)",
    category: "X-Ray",
    brand: "Lifedent China",
    image: "",
    gallery: [],
    video: "",
    description: "High-resolution digital intraoral X-ray sensor (Radio Visiography) for instant digital imaging. Replaces traditional X-ray films with immediate on-screen results. Significant dose reduction compared to film X-ray. Compatible with most dental X-ray units including portable and wall-mounted systems.",
    specs: "Digital Intraoral Sensor | USB Connection | Instant Image Display | Low Radiation Dose | Compatible with All X-Ray Units | TWAIN Compatible Software",
    status: "active"
  },
  {
    id: 7,
    name: "Dental Suction Motor",
    category: "Suction",
    brand: "Antar",
    image: "images/suction-motor.jpg",
    gallery: ["images/suction-motor.jpg"],
    video: "",
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
    gallery: ["images/compressor.jpg"],
    video: "",
    description: "40L oil-free dental air compressor providing clean, dry, and odor-free compressed air for dental instruments. 850W power output ensures consistent performance for single or multiple dental units simultaneously. Oil-free piston design eliminates oil contamination risk — essential for patient safety and instrument longevity. Equipped with moisture separator, pressure regulator, and safety valve. Low noise operation suitable for open-plan dental environments.",
    specs: "40L Tank | 850W | Oil-Free Design | Clean Dry Air | Low Noise | Pressure Regulator | Moisture Separator | Safety Valve | Single or Multi-Unit Compatible",
    status: "active"
  },
  {
    id: 10,
    name: "Dental Extraction Forceps Set",
    category: "Dental Instruments",
    brand: "Lifedent Pakistan",
    image: "",
    gallery: [],
    video: "",
    description: "Professional-grade stainless steel dental extraction forceps set for upper and lower teeth. Includes a complete range of forceps for incisors, canines, premolars, and molars. Ergonomic handle design reduces hand fatigue during procedures. Autoclavable — fully compatible with steam sterilization up to 135°C.",
    specs: "Stainless Steel 316L | Full Extraction Set | Autoclavable | Ergonomic Handles | Upper & Lower Jaw Forceps | CE Marked",
    status: "active"
  },
  {
    id: 11,
    name: "Dental Scalers & Curettes Set",
    category: "Dental Instruments",
    brand: "Lifedent Pakistan",
    image: "",
    gallery: [],
    video: "",
    description: "Complete periodontal scaling and root planing instrument set. Includes sickle scalers, Gracey curettes, and universal curettes for comprehensive periodontal treatment. Sharp, precision-ground working ends for effective calculus removal. All instruments are individually boxed and sterile-packaged.",
    specs: "Sickle Scalers | Gracey Curettes 1–14 | Universal Curettes | Stainless Steel | Autoclavable | Individually Packaged | CE Marked",
    status: "active"
  },
  {
    id: 12,
    name: "Examination Instruments Set",
    category: "Dental Instruments",
    brand: "Lifedent Pakistan",
    image: "",
    gallery: [],
    video: "",
    description: "Essential dental examination kit including mouth mirrors, probes, explorers, and cotton pliers. Front-surface rhodium-coated mirrors provide distortion-free reflection. Widely used for routine dental check-ups, diagnosis, and treatment planning.",
    specs: "Mouth Mirrors (Front Surface) | Periodontal Probes | Explorers | Cotton Pliers | Stainless Steel | Autoclavable | Available in Sets of 5 or 10",
    status: "active"
  }
];

const PRODUCTS_VERSION = 'v4';

// --- Product Manager ---
const ProductManager = {
  getProducts() {
    try {
      const ver = localStorage.getItem('lifedent_products_ver');
      const stored = localStorage.getItem('lifedent_products');
      if (!stored || ver !== PRODUCTS_VERSION) {
        localStorage.setItem('lifedent_products', JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem('lifedent_products_ver', PRODUCTS_VERSION);
        return DEFAULT_PRODUCTS;
      }
      return JSON.parse(stored);
    } catch(e) {
      return DEFAULT_PRODUCTS;
    }
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

// --- YouTube embed URL helper ---
function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

// --- Render Products on Products Page ---
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let products = ProductManager.getProducts().filter(p => p.status === 'active');
  if (filter !== 'all') {
    products = products.filter(p => p.category === filter);
  }

  if (products.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:60px 20px;"><p style="font-size:1.1rem; color:var(--gray-500);">No products found in this category.</p></div>';
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="showProductModal(${p.id})">
      <div class="product-card-image">
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div style="display:none; color:var(--gray-200); align-items:center; justify-content:center; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg></div>`
          : `<div style="color:var(--gray-200); display:flex; align-items:center; justify-content:center; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg></div>`
        }
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
        ${p.image
          ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';">`
          : `<div style="color:var(--gray-200); display:flex; align-items:center; justify-content:center; height:100%;"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg></div>`
        }
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

  const hasGallery = product.gallery && product.gallery.length > 1;
  const embedUrl = product.video ? getYoutubeEmbedUrl(product.video) : null;
  const specsArr = product.specs ? product.specs.split('|').map(s => s.trim()).filter(Boolean) : [];

  const modal = document.getElementById('product-modal');
  modal.querySelector('.modal-content').innerHTML = `
    <button class="modal-close" onclick="closeModal()">&times;</button>
    ${product.image ? `
      <img id="modal-main-img" src="${product.image}" alt="${product.name}" style="width:100%; max-height:280px; object-fit:contain; background:var(--off-white); padding:20px; border-radius:8px; margin-bottom:${hasGallery ? '10px' : '20px'};" onerror="this.style.display='none'">
    ` : ''}
    ${hasGallery ? `
      <div style="display:flex; gap:8px; overflow-x:auto; margin-bottom:16px; padding-bottom:4px;">
        ${product.gallery.map((img, i) => `
          <img src="${img}" alt="${product.name} ${i+1}"
            style="height:64px; width:84px; object-fit:cover; border-radius:6px; cursor:pointer; flex-shrink:0; border:2px solid ${i===0 ? 'var(--blue)' : 'var(--gray-100)'}; transition:border-color 0.2s;"
            onclick="document.getElementById('modal-main-img').src=this.src; document.querySelectorAll('.gthumb').forEach(t=>t.style.borderColor='var(--gray-100)'); this.style.borderColor='var(--blue)';"
            class="gthumb"
            onerror="this.style.display='none'">
        `).join('')}
      </div>
    ` : ''}
    ${embedUrl ? `
      <div style="margin-bottom:16px;">
        <iframe src="${embedUrl}" width="100%" height="220" style="border-radius:8px; border:none;" allowfullscreen loading="lazy"></iframe>
      </div>
    ` : ''}
    <div class="category" style="margin-top:4px; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:var(--blue);">${product.category}</div>
    <h2 style="margin:8px 0 10px;">${product.name}</h2>
    <p style="margin-bottom:16px; font-size:0.95rem;">${product.description}</p>
    ${specsArr.length ? `
      <h4 style="margin-bottom:10px;">Key Specifications</h4>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
        ${specsArr.map(s => `<span style="background:var(--off-white); border:1px solid var(--gray-100); border-radius:6px; padding:4px 10px; font-size:0.8rem; color:var(--gray-700);">${s}</span>`).join('')}
      </div>
    ` : ''}
    <p style="font-size:0.85rem; color:var(--gray-500); margin-bottom:20px;"><strong>Brand:</strong> ${product.brand}</p>
    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <a href="https://wa.me/${WA_NUMBER}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}" target="_blank" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Inquiry</a>
      <a href="contact.html" class="btn btn-outline">Contact Form</a>
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
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
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

  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
