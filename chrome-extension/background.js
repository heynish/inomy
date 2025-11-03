// Background service worker
console.log('Inomy: Background service worker started');

// Listen for product detection
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PRODUCT_DETECTED') {
    console.log('Inomy: Product detected on', sender.tab.url);
    console.log('Product info:', request.product);

    // TODO: Send product info to backend API for price comparison
    // fetchPriceComparison(request.product);

    sendResponse({ success: true });
  }

  if (request.type === 'FETCH_PRICES') {
    // Placeholder for API call
    fetchPriceComparison(request.product).then(data => {
      sendResponse({ success: true, data });
    });
    return true; // Keep channel open for async response
  }

  if (request.type === 'USER_LOGIN') {
    // Placeholder for login API
    handleLogin(request.credentials).then(data => {
      sendResponse({ success: true, data });
    });
    return true;
  }

  if (request.type === 'GET_USER_POINTS') {
    // Placeholder for fetching user IXP points
    getUserPoints().then(data => {
      sendResponse({ success: true, data });
    });
    return true;
  }
});

// Placeholder function for price comparison API
async function fetchPriceComparison(product) {
  console.log('Inomy: Fetching prices for', product.title);

  // TODO: Replace with actual API call
  // const response = await fetch('https://api.inomy.com/v1/compare', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(product)
  // });
  // return await response.json();

  // Dummy data for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        prices: [
          {
            retailer: 'Amazon',
            price: '$299.99',
            url: 'https://amazon.com/example',
            rating: 4.5,
            reviews: 1234
          },
          {
            retailer: 'Walmart',
            price: '$279.99',
            url: 'https://walmart.com/example',
            rating: 4.3,
            reviews: 856
          },
          {
            retailer: 'Target',
            price: '$289.99',
            url: 'https://target.com/example',
            rating: 4.4,
            reviews: 432
          }
        ],
        similarProducts: [
          {
            title: 'Similar Product 1',
            price: '$259.99',
            retailer: 'Best Buy',
            url: 'https://bestbuy.com/example',
            image: 'https://via.placeholder.com/100'
          },
          {
            title: 'Similar Product 2',
            price: '$319.99',
            retailer: 'Amazon',
            url: 'https://amazon.com/example2',
            image: 'https://via.placeholder.com/100'
          }
        ]
      });
    }, 1000);
  });
}

// Placeholder function for login
async function handleLogin(credentials) {
  console.log('Inomy: Logging in user with method:', credentials.method);

  // TODO: Replace with actual Privy/Web3 authentication
  // For wallet: Use Privy wallet connection
  // For email: Use Privy email OTP
  // For Google: Use Privy Google OAuth

  // const response = await fetch('https://api.inomy.com/v1/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials)
  // });
  // return await response.json();

  // Dummy data for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        user: {
          address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          email: credentials.method === 'email' ? 'user@example.com' : null,
          ixp: 2450,
          rank: 23
        },
        token: 'dummy_jwt_token_here'
      });
    }, 1000);
  });
}

// Placeholder function for fetching user points
async function getUserPoints() {
  console.log('Inomy: Fetching user IXP points');

  // TODO: Replace with actual API call
  // const response = await fetch('https://api.inomy.com/v1/user/points', {
  //   headers: { 'Authorization': `Bearer ${token}` }
  // });
  // return await response.json();

  // Dummy data for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        ixp: 2450,
        rank: 23,
        flairs: 12
      });
    }, 500);
  });
}

// Track extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Inomy: Extension installed');
    // Open welcome page
    chrome.tabs.create({ url: 'https://inomy.shop' });
  }
});
