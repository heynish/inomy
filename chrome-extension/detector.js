// Universal product page detector for all websites
console.log('Inomy: Universal detector loaded');

function isProductPage() {
  // Check 1: Schema.org Product markup
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data['@type'] === 'Product' || data['@type'] === 'http://schema.org/Product') {
        console.log('Inomy: Product detected via Schema.org');
        return true;
      }
    } catch (e) {
      // Continue checking
    }
  }

  // Check 2: OpenGraph product tags
  const ogType = document.querySelector('meta[property="og:type"]')?.content;
  if (ogType === 'product' || ogType === 'og:product') {
    console.log('Inomy: Product detected via OpenGraph');
    return true;
  }

  // Check 3: URL patterns
  const url = window.location.href.toLowerCase();
  const productPatterns = [
    '/product/',
    '/item/',
    '/p/',
    '/dp/',
    '/products/',
    '/pd/',
    '/itm/',
    '/listing/'
  ];

  for (const pattern of productPatterns) {
    if (url.includes(pattern)) {
      console.log('Inomy: Product detected via URL pattern:', pattern);
      return true;
    }
  }

  // Check 4: Common product page elements
  const hasAddToCart = document.querySelector('[class*="add-to-cart"], [id*="add-to-cart"], button[name*="add-to-cart"]');
  const hasPrice = document.querySelector('[class*="price"], [id*="price"]');
  const hasProductTitle = document.querySelector('h1[class*="product"], h1[id*="product"]');

  if (hasAddToCart && hasPrice && hasProductTitle) {
    console.log('Inomy: Product detected via page elements');
    return true;
  }

  return false;
}

// Only inject button if this is a product page and content.js hasn't already injected it
if (isProductPage() && !document.getElementById('inomy-compare-btn')) {
  console.log('Inomy: Product page detected, injecting button');

  // Import and execute content script functionality
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('content.js');
  document.head.appendChild(script);

  // Inject CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content.css');
  document.head.appendChild(link);
}
