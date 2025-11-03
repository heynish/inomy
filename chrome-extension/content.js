// Content script for known shopping sites
console.log('Inomy: Content script loaded on known shopping site');

// Inject Inomy button on product pages
function injectInomyButton() {
  // Check if button already exists
  if (document.getElementById('inomy-compare-btn')) {
    return;
  }

  // Create floating button
  const button = document.createElement('div');
  button.id = 'inomy-compare-btn';
  button.innerHTML = `
    <div class="inomy-btn-icon">
      <img src="${chrome.runtime.getURL('assets/symbol.png')}" alt="Inomy" style="width: 24px; height: 24px;">
    </div>
    <span class="inomy-btn-text">Inomy Deal Finder</span>
  `;

  document.body.appendChild(button);

  // Open extension popup when clicked
  button.addEventListener('click', () => {
    openInomyPanel();
  });

  console.log('Inomy: Button injected successfully');
}

// Open Inomy side panel
function openInomyPanel() {
  // Check if panel already exists
  let panel = document.getElementById('inomy-panel');

  if (panel) {
    // Toggle visibility
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    return;
  }

  // Create panel
  panel = document.createElement('div');
  panel.id = 'inomy-panel';
  panel.innerHTML = `
    <div class="inomy-panel-header">
      <button class="inomy-close-btn" id="inomy-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="inomy-panel-content">
      <iframe src="${chrome.runtime.getURL('popup.html')}" frameborder="0"></iframe>
    </div>
  `;

  document.body.appendChild(panel);

  // Close button handler
  document.getElementById('inomy-close').addEventListener('click', () => {
    panel.style.display = 'none';
  });

  // Extract product info and send to popup
  extractProductInfo();
}

// Extract product information from the page
function extractProductInfo() {
  const productInfo = {
    url: window.location.href,
    title: null,
    price: null,
    image: null,
    site: window.location.hostname
  };

  // Try to extract from Schema.org JSON-LD
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data['@type'] === 'Product' || data['@type'] === 'http://schema.org/Product') {
        productInfo.title = data.name;
        productInfo.price = data.offers?.price || data.offers?.lowPrice;
        productInfo.image = data.image?.[0] || data.image;
        break;
      }
    } catch (e) {
      // Continue to next script
    }
  }

  // Fallback: Try OpenGraph tags
  if (!productInfo.title) {
    productInfo.title = document.querySelector('meta[property="og:title"]')?.content ||
                       document.querySelector('h1')?.textContent?.trim() ||
                       document.querySelector('#productTitle')?.textContent?.trim();
  }

  if (!productInfo.price) {
    productInfo.price = document.querySelector('meta[property="product:price:amount"]')?.content ||
                       document.querySelector('.a-price-whole')?.textContent?.trim() ||
                       document.querySelector('[class*="price"]')?.textContent?.trim();
  }

  if (!productInfo.image) {
    // Try multiple image sources for Amazon
    productInfo.image = document.querySelector('meta[property="og:image"]')?.content ||
                       document.querySelector('#landingImage')?.src ||
                       document.querySelector('#imgBlkFront')?.src ||
                       document.querySelector('.a-dynamic-image')?.src ||
                       document.querySelector('[data-a-dynamic-image]')?.src;
  }

  console.log('Inomy: Extracted product info:', productInfo);

  // Store in chrome storage for popup to access
  chrome.storage.local.set({ currentProduct: productInfo });

  // Send message to background script
  chrome.runtime.sendMessage({
    type: 'PRODUCT_DETECTED',
    product: productInfo
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectInomyButton);
} else {
  injectInomyButton();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_PRODUCT_INFO') {
    extractProductInfo();
    sendResponse({ success: true });
  }
});
