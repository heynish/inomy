# Inomy Chrome Extension

A Chrome extension that helps users compare prices across retailers and earn IXP rewards while shopping.

## Features

- 🔍 **Automatic Product Detection**: Works on 15+ major shopping sites + universal detection
- 💰 **Price Comparison**: Shows better prices from other retailers
- 🎯 **Similar Products**: Recommends alternatives
- 🏆 **IXP Rewards**: Track your points and rank
- 🔒 **Privacy-First**: No data sold to advertisers

## Installation

### Development Mode (Load Unpacked)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `chrome-extension` folder from this project
5. The Inomy extension should now appear in your extensions list

### Using the Extension

1. Navigate to any product page on supported sites (Amazon, Walmart, Target, etc.)
2. Look for the purple **"Compare Prices"** floating button
3. Click the button to open the Inomy panel
4. Login with your credentials (dummy login for now)
5. View price comparisons and similar products
6. Click any result to visit that retailer

## Supported Shopping Sites

### Pre-configured Sites
- Amazon (US & India)
- Walmart
- Target
- Best Buy
- eBay
- Etsy
- Wayfair
- Home Depot
- Lowe's
- Macy's
- Nordstrom
- Nike
- Adidas
- Zappos

### Universal Detection
Works on any site with proper product markup (Schema.org, OpenGraph)

## Project Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── content.js            # Injected script for known sites
├── content.css           # Styles for injected button/panel
├── detector.js           # Universal product page detection
├── background.js         # Background service worker
├── popup.html            # Extension popup UI
├── popup.css             # Popup styles
├── popup.js              # Popup logic
├── icons/                # Extension icons (16, 32, 48, 128)
└── README.md             # This file
```

## API Integration (TODO)

### Backend Endpoints Needed

1. **Authentication**
   - `POST /v1/auth/login` - User login
   - `POST /v1/auth/signup` - User registration
   - `POST /v1/auth/logout` - User logout

2. **Price Comparison**
   - `POST /v1/compare` - Fetch price comparisons
   - Body: `{ url, title, price, image, site }`
   - Returns: `{ prices: [], similarProducts: [] }`

3. **User Data**
   - `GET /v1/user/points` - Get user IXP balance and rank
   - `POST /v1/user/track` - Track user actions for IXP rewards

### Current State
- All API calls use **dummy data**
- See `background.js` for placeholder functions
- Replace with actual API endpoints when backend is ready

## Dummy Login Credentials

For testing, any email/password combination will work:
- Email: `test@example.com`
- Password: `anything`

Mock user data:
- Address: `0x742d35Cc6634C0532925a3b844Bc454e4438f44e`
- IXP: `2,450`
- Rank: `#23`

## Development

### Testing on Different Sites

1. Visit any product page (e.g., Amazon product)
2. Open Chrome DevTools → Console
3. Look for "Inomy:" log messages
4. The extension should auto-detect and inject the button

### Debugging

- **Content script logs**: Open page console (F12)
- **Popup logs**: Right-click extension icon → Inspect popup
- **Background logs**: Go to `chrome://extensions/` → Click "Service worker"

### Making Changes

1. Edit any file in `chrome-extension/`
2. Go to `chrome://extensions/`
3. Click the **Reload** icon on the Inomy extension card
4. Refresh any product pages to see changes

## Next Steps

### Phase 1: Backend Integration
- [ ] Connect to real authentication API
- [ ] Integrate price comparison API
- [ ] Track user actions for IXP rewards
- [ ] Add error handling for API failures

### Phase 2: Enhanced Features
- [ ] Save favorite products
- [ ] Price drop alerts
- [ ] Search history
- [ ] Browser notifications
- [ ] Dark mode

### Phase 3: Mobile & Web App
- [ ] Build mobile app (React Native / Flutter)
- [ ] Build web app matching extension functionality
- [ ] Sync data across all platforms

## Icons

Icon files need to be created at:
- `icons/icon16.png` (16x16)
- `icons/icon32.png` (32x32)
- `icons/icon48.png` (48x48)
- `icons/icon128.png` (128x128)

Temporary placeholder: Purple gradient with "I" letter

## License

Copyright © 2025 Inomy. All rights reserved.
