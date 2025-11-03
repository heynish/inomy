# Troubleshooting Guide

## Common Issues

### "This item cannot be shipped to your selected delivery location"

**This is NOT an error from the Inomy extension.**

This message appears on Amazon's website itself when:
- The product cannot be shipped to your current delivery address
- Your Amazon account has a delivery location set that doesn't support this product
- The seller doesn't ship to your region

**How to fix:**
1. Go to Amazon.com
2. Click on the location/address near the top (next to the search bar)
3. Change your delivery location to a supported address
4. Or choose a different product that ships to your area

The Inomy extension only reads product information from the page - it doesn't affect Amazon's shipping policies or your delivery location.

---

## Product Images Not Showing

If product images don't load:

1. **CORS/Security**: Some images might be blocked due to browser security policies
2. **Network issues**: Check your internet connection
3. **Amazon changes**: Amazon might have changed their HTML structure

The extension will show a "No Image" placeholder if images fail to load. This doesn't affect price comparisons.

---

## Extension Not Detecting Products

If the "Inomy Deal Finder" button doesn't appear:

1. Make sure you're on a **product page** (not search results or homepage)
2. Refresh the page
3. Check if the URL matches patterns like:
   - `amazon.com/*/dp/*`
   - `walmart.com/ip/*`
   - `target.com/p/*`
4. Open Console (F12) and look for "Inomy:" messages to debug

---

## Login Issues

If login screen stays visible after clicking login:

1. Open popup inspector: Right-click extension icon → "Inspect popup"
2. Check Console for errors
3. Reload the extension in `chrome://extensions/`
4. Clear extension storage: Chrome DevTools → Application → Storage → Clear

---

## Need Help?

- Check Console logs (F12 → Console tab)
- Look for "Inomy:" prefixed messages
- Report issues with screenshots and console logs
