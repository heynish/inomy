// Popup UI Logic
console.log('Inomy: Popup script loaded');

// State management
let currentUser = null;
let currentProduct = null;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inomy: DOM loaded');
  checkAuthState();
  setupEventListeners();
});

// Check if user is logged in
async function checkAuthState() {
  const result = await chrome.storage.local.get(['authToken', 'currentUser']);

  if (result.authToken && result.currentUser) {
    currentUser = result.currentUser;
    showMainScreen();
    loadUserData();
    loadProductData();
  } else {
    showLoginScreen();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Login buttons
  const walletBtn = document.getElementById('login-wallet');
  const emailBtn = document.getElementById('login-email');
  const googleBtn = document.getElementById('login-google');

  if (walletBtn) {
    walletBtn.addEventListener('click', () => handleLogin('wallet'));
  }
  if (emailBtn) {
    emailBtn.addEventListener('click', () => handleLogin('email'));
  }
  if (googleBtn) {
    googleBtn.addEventListener('click', () => handleLogin('google'));
  }
}

// Setup main screen event listeners (called after showing main screen)
function setupMainScreenListeners() {
  // Logout buttons (both header and footer)
  const logoutBtnHeader = document.getElementById('logout-btn-header');
  const logoutBtn = document.getElementById('logout-btn');

  if (logoutBtnHeader) {
    logoutBtnHeader.addEventListener('click', handleLogout);
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Refresh prices
  const refreshBtn = document.getElementById('refresh-prices');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => loadProductData(true));
  }

  // Track price button
  const trackPriceBtn = document.getElementById('track-price-btn');
  if (trackPriceBtn) {
    trackPriceBtn.addEventListener('click', handleTrackPrice);
  }

  // NPS survey buttons
  const npsButtons = document.querySelectorAll('.nps-btn');
  npsButtons.forEach(btn => {
    btn.addEventListener('click', () => handleNPSClick(btn));
  });

  // Check if NPS already submitted
  checkNPSStatus();
}

// Handle login
async function handleLogin(method) {
  console.log('Inomy: Attempting login with', method);

  // Get the button that was clicked
  let loginBtn;
  if (method === 'wallet') {
    loginBtn = document.getElementById('login-wallet');
  } else if (method === 'email') {
    loginBtn = document.getElementById('login-email');
  } else if (method === 'google') {
    loginBtn = document.getElementById('login-google');
  }

  // Show loading state
  const originalText = loginBtn.innerHTML;
  loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  loginBtn.disabled = true;

  try {
    // TODO: Replace with actual Privy/Web3 authentication
    // For now, simulate login with dummy data
    const response = await chrome.runtime.sendMessage({
      type: 'USER_LOGIN',
      credentials: { method }
    });

    console.log('Inomy: Login response:', response);

    if (response && response.success) {
      console.log('Inomy: Login successful, storing auth data');
      // Store auth data
      await chrome.storage.local.set({
        authToken: response.data.token,
        currentUser: response.data.user
      });

      currentUser = response.data.user;

      // Show success and transition
      setTimeout(() => {
        console.log('Inomy: Transitioning to main screen');
        showMainScreen();
        loadUserData();
        loadProductData();
      }, 500);
    } else {
      console.error('Inomy: Login failed - invalid response');
      alert('Login failed. Please try again.');
      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;
    }
  } catch (error) {
    console.error('Inomy: Login error:', error);
    alert('Login failed. Please try again.');
    loginBtn.innerHTML = originalText;
    loginBtn.disabled = false;
  }
}

// Handle logout
async function handleLogout() {
  await chrome.storage.local.remove(['authToken', 'currentUser']);
  currentUser = null;
  showLoginScreen();
}

// Handle track price
async function handleTrackPrice() {
  if (!currentProduct) {
    alert('No product detected');
    return;
  }

  const banner = document.getElementById('price-alert-banner');
  const btn = document.getElementById('track-price-btn');
  const content = banner.querySelector('.price-alert-content span');

  // Check if already tracking
  const result = await chrome.storage.local.get(['trackedProducts']);
  let trackedProducts = result.trackedProducts || [];
  const isTracking = trackedProducts.some(p => p.url === currentProduct.url);

  if (isTracking) {
    // Stop tracking
    trackedProducts = trackedProducts.filter(p => p.url !== currentProduct.url);
    await chrome.storage.local.set({ trackedProducts });

    banner.classList.remove('tracking');
    btn.textContent = 'Track Price';
    content.textContent = 'Get notified when price drops';
    console.log('Inomy: Stopped tracking price for', currentProduct.url);
  } else {
    // Start tracking
    trackedProducts.push({
      url: currentProduct.url,
      title: currentProduct.title,
      price: currentProduct.price,
      image: currentProduct.image,
      trackedAt: new Date().toISOString()
    });
    await chrome.storage.local.set({ trackedProducts });

    banner.classList.add('tracking');
    btn.textContent = 'Tracking';
    content.innerHTML = '<i class="fas fa-check"></i> You\'ll be notified of price drops';

    // TODO: Send to backend API to set up price monitoring
    console.log('Inomy: Started tracking price for', currentProduct.url);

    // Show success message
    setTimeout(() => {
      content.textContent = 'Price alerts active';
    }, 2000);
  }
}

// Show login screen
function showLoginScreen() {
  console.log('Inomy: Showing login screen');
  const loginScreen = document.getElementById('login-screen');
  const mainScreen = document.getElementById('main-screen');

  if (loginScreen && mainScreen) {
    mainScreen.classList.remove('active');
    loginScreen.classList.add('active');
    console.log('Inomy: Login screen classes:', loginScreen.className);
    console.log('Inomy: Main screen classes:', mainScreen.className);
  }
}

// Show main screen
function showMainScreen() {
  console.log('Inomy: Showing main screen');
  const loginScreen = document.getElementById('login-screen');
  const mainScreen = document.getElementById('main-screen');

  if (loginScreen && mainScreen) {
    loginScreen.classList.remove('active');
    mainScreen.classList.add('active');
    console.log('Inomy: Login screen classes:', loginScreen.className);
    console.log('Inomy: Main screen classes:', mainScreen.className);

    // Setup listeners for main screen elements
    setupMainScreenListeners();
  }
}

// Load user data
async function loadUserData() {
  if (!currentUser) return;

  // Display user info
  const userAddress = document.getElementById('user-address');
  const userIxp = document.getElementById('user-ixp');
  const userRank = document.getElementById('user-rank');

  userAddress.textContent = shortenAddress(currentUser.address);
  userIxp.textContent = currentUser.ixp.toLocaleString();
  userRank.textContent = currentUser.rank;

  // Fetch latest points
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'GET_USER_POINTS'
    });

    if (response.success) {
      userIxp.textContent = response.data.ixp.toLocaleString();
      userRank.textContent = response.data.rank;
    }
  } catch (error) {
    console.error('Error fetching user points:', error);
  }
}

// Load product data
async function loadProductData(forceRefresh = false) {
  // Get current product from storage
  const result = await chrome.storage.local.get(['currentProduct']);
  currentProduct = result.currentProduct;

  if (!currentProduct) {
    showEmptyProductState();
    return;
  }

  // Display current product
  displayCurrentProduct(currentProduct);

  // Update track price banner state
  await updateTrackPriceBanner();

  // Show loading state
  document.getElementById('loading-prices').style.display = 'block';
  document.getElementById('price-list').innerHTML = '';
  document.getElementById('similar-list').innerHTML = '';

  // Fetch prices
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'FETCH_PRICES',
      product: currentProduct
    });

    if (response.success) {
      displayPrices(response.data.prices);
      displaySimilarProducts(response.data.similarProducts);
    }
  } catch (error) {
    console.error('Error fetching prices:', error);
    showErrorState();
  } finally {
    document.getElementById('loading-prices').style.display = 'none';
  }
}

// Update track price banner based on current tracking state
async function updateTrackPriceBanner() {
  if (!currentProduct) return;

  const banner = document.getElementById('price-alert-banner');
  const btn = document.getElementById('track-price-btn');
  const content = banner.querySelector('.price-alert-content span');

  // Check if already tracking
  const result = await chrome.storage.local.get(['trackedProducts']);
  const trackedProducts = result.trackedProducts || [];
  const isTracking = trackedProducts.some(p => p.url === currentProduct.url);

  if (isTracking) {
    banner.classList.add('tracking');
    btn.textContent = 'Tracking';
    content.textContent = 'Price alerts active';
  } else {
    banner.classList.remove('tracking');
    btn.textContent = 'Track Price';
    content.textContent = 'Get notified when price drops';
  }
}

// Display current product
function displayCurrentProduct(product) {
  const productTitle = document.getElementById('product-title');
  const productPrice = document.getElementById('product-price');
  const productSite = document.getElementById('product-site');
  const productImage = document.getElementById('product-image');

  productTitle.textContent = product.title || 'Product name';
  productPrice.textContent = product.price || '$0.00';
  productSite.textContent = product.site || 'Unknown site';

  if (product.image) {
    productImage.src = product.image;
    productImage.onerror = function() {
      // If image fails to load, use a placeholder
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect fill="%23f3f4f6" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%236b7280"%3ENo Image%3C/text%3E%3C/svg%3E';
      console.log('Inomy: Product image failed to load:', product.image);
    };
  } else {
    // Use placeholder if no image
    productImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect fill="%23f3f4f6" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%236b7280"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
}

// Display price comparison results
function displayPrices(prices) {
  const priceList = document.getElementById('price-list');

  if (!prices || prices.length === 0) {
    priceList.innerHTML = '<div class="empty-state"><p>No price comparisons available</p></div>';
    return;
  }

  priceList.innerHTML = prices.map(item => {
    const savings = calculateSavings(currentProduct.price, item.price);

    return `
      <div class="price-item" data-url="${item.url}">
        <div class="price-item-info">
          <div class="price-item-retailer">${item.retailer}</div>
          <div class="price-item-rating">
            <i class="fas fa-star"></i>
            ${item.rating} (${item.reviews.toLocaleString()} reviews)
          </div>
        </div>
        <div style="text-align: right;">
          <div class="price-item-price">${item.price}</div>
          ${savings ? `<div class="price-item-savings">Save ${savings}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  document.querySelectorAll('.price-item').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      chrome.tabs.create({ url });

      // TODO: Track click for IXP reward
      console.log('Price comparison clicked:', url);
    });
  });
}

// Display similar products
function displaySimilarProducts(products) {
  const similarList = document.getElementById('similar-list');

  if (!products || products.length === 0) {
    similarList.innerHTML = '<div class="empty-state"><p>No similar products found</p></div>';
    return;
  }

  similarList.innerHTML = products.map(item => `
    <div class="similar-item" data-url="${item.url}">
      <img src="${item.image}" alt="${item.title}" class="similar-item-image">
      <div class="similar-item-info">
        <div class="similar-item-title">${item.title}</div>
        <div class="similar-item-price">${item.price}</div>
        <div class="similar-item-retailer">${item.retailer}</div>
      </div>
    </div>
  `).join('');

  // Add click handlers
  document.querySelectorAll('.similar-item').forEach(item => {
    item.addEventListener('click', () => {
      const url = item.dataset.url;
      chrome.tabs.create({ url });

      // TODO: Track click for IXP reward
      console.log('Similar product clicked:', url);
    });
  });
}

// Helper functions
function shortenAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function calculateSavings(originalPrice, comparePrice) {
  if (!originalPrice || !comparePrice) return null;

  const original = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
  const compare = parseFloat(comparePrice.replace(/[^0-9.]/g, ''));

  if (original > compare) {
    const savings = original - compare;
    return `$${savings.toFixed(2)}`;
  }

  return null;
}

function showEmptyProductState() {
  const currentProductSection = document.getElementById('current-product');
  currentProductSection.innerHTML = `
    <div class="empty-state">
      <i class="fas fa-shopping-bag"></i>
      <p>Navigate to a product page to see price comparisons</p>
    </div>
  `;
}

function showErrorState() {
  const priceList = document.getElementById('price-list');
  priceList.innerHTML = `
    <div class="empty-state">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Unable to fetch prices. Please try again.</p>
    </div>
  `;
}

// Handle NPS button click
async function handleNPSClick(btn) {
  const score = parseInt(btn.dataset.score);
  const survey = document.getElementById('nps-survey');

  // Remove previous selection
  document.querySelectorAll('.nps-btn').forEach(b => b.classList.remove('selected'));

  // Highlight selected
  btn.classList.add('selected');

  // Store NPS score
  await chrome.storage.local.set({
    npsScore: score,
    npsSubmittedAt: new Date().toISOString()
  });

  console.log('Inomy: NPS score submitted:', score);

  // TODO: Send to backend API
  // await chrome.runtime.sendMessage({
  //   type: 'SUBMIT_NPS',
  //   score: score,
  //   userAddress: currentUser?.address
  // });

  // Mark as submitted
  setTimeout(() => {
    survey.classList.add('submitted');
  }, 500);

  // Award IXP for feedback (optional)
  console.log('Inomy: User could earn +50 IXP for feedback');
}

// Check NPS status
async function checkNPSStatus() {
  const result = await chrome.storage.local.get(['npsScore', 'npsSubmittedAt']);

  if (result.npsScore) {
    const survey = document.getElementById('nps-survey');
    survey.classList.add('submitted');

    // Highlight the previously selected score
    const selectedBtn = document.querySelector(`.nps-btn[data-score="${result.npsScore}"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('selected');
    }
  }
}

// Listen for product updates from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PRODUCT_UPDATED') {
    loadProductData();
  }
});
