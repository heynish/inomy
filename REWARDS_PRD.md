# Inomy Rewards System - Product Requirements Document

## Executive Summary

The Inomy Rewards System is a gamified incentive platform designed to drive user engagement through a Web3-native points (IXP) and badge/flair system. Users earn IXP through various platform activities and can unlock gift cards by winning top positions on competitive leaderboards. The system includes a $600 annual redemption cap to ensure sustainable reward distribution.

---

## 1. Core Features (Implemented)

### 1.1 IXP Points System

**Purpose:** Virtual currency that rewards user engagement and activity

**Features:**
- Display current IXP balance in hero card with purple gradient
- Transaction history accessible via clock icon
- Real-time balance updates
- Transaction log showing:
  - Date/time of transaction
  - Action type (Search, Deal Found, Login, etc.)
  - Amount earned/spent
  - Running balance

**IXP Earning Methods:**

| Action | IXP Amount | Trigger | Limit |
|--------|------------|---------|-------|
| New User Sign-Up | 100 | Automatic on account creation | One-time |
| Successful Referral | 250 | Automatic when referral signs up | Unlimited |
| Weekly Referral Bonus | 1,000 | Automatic - 5+ referrals in 7 days | Weekly |
| Creating an Intent | 25 | Automatic on intent creation | 3x per day |
| Submitting Feedback | 50 | Automatic on feedback submission | 3x per day |
| Social Media Share | 100 | User-initiated claim | Once per day |
| Search Completed | 10 | Automatic per search | Unlimited |
| Deal Found | 25 | Automatic on deal click | Unlimited |
| Trackers Blocked | 5 | Automatic per milestone | Unlimited |
| Daily Login | 20 | Automatic on first daily login | Once per day |
| Top 10 Daily Leaderboard | 1,000 | Automatic on daily reset | Unlimited |

---

### 1.2 Leaderboard System

**Purpose:** Competitive rankings that drive engagement and unlock gift card redemption

**Features:**
- Three timeframes: Daily, Weekly, Monthly
- Top 5 + User's position display
- Real-time ranking updates
- Web3-native display:
  - Ethereum addresses (not usernames)
  - Color-coded avatars from address hash
  - Copy address functionality
  - Shortened address format (0x742d...f44e)

**Leaderboard Reset Schedule:**
- **Daily:** Resets at 00:00 UTC
- **Weekly:** Resets Monday 00:00 UTC
- **Monthly:** Resets 1st of month 00:00 UTC

**User Highlighting:**
- User's row has purple background tint
- Purple border around user row
- Target icon (🎯) next to username

---

### 1.3 Flair/Badge System

**Purpose:** Achievement system with 28 total flairs across 7 categories

#### 1.3.1 Leaderboard Wins (9 Flairs) - Gift Card Unlock

**These are the ONLY flairs that enable gift card redemption**

**Daily Leaderboard:**
- 🥇 Daily Champion (1st place) - $10 value
- 🥈 Daily Runner-up (2nd place) - $10 value
- 🥉 Daily Bronze (3rd place) - $5 value

**Weekly Leaderboard:**
- 🏆 Weekly Champion (1st) - $25 value
- 💎 Weekly Elite (2nd) - $10 value
- ⭐ Weekly Star (3rd) - $10 value

**Monthly Leaderboard:**
- 👑 Monthly King/Queen (1st) - $50 value
- 🔥 Monthly Legend (2nd) - $25 value
- 💫 Monthly Hero (3rd) - $25 value

**Visual Treatment:**
- Gold border (2px solid #F59E0B)
- Gift icon (🎁) in top right
- Dollar value displayed under flair

#### 1.3.2 Other Flair Categories (19 Flairs)

**Search & Activity (4 flairs):**
- 🔍 First Search (1 search)
- 🎯 Explorer (10 searches)
- 🚀 Power User (100 searches)
- ⚡ Search Master (1,000 searches)

**Streaks & Loyalty (4 flairs):**
- 📅 Week Warrior (7-day streak)
- 🔥 Month Master (30-day streak)
- 💪 Quarter Champion (90-day streak)
- 👑 Year Legend (365-day streak)

**Referral Network (3 flairs):**
- 👥 Connector (1 referral)
- 🤝 Networker (5 referrals)
- 📢 Influencer (10 referrals)

**Privacy Champion (3 flairs):**
- 🛡️ Privacy Newbie (100 trackers blocked)
- 👻 Ghost Mode (1,000 trackers blocked)
- 🥷 Privacy Ninja (10,000 trackers blocked)

**Community & Social (3 flairs):**
- 🐦 Twitter Follower (follow @Inomy)
- 💬 Discord Member (join Discord)
- 🐛 Bug Hunter (verified bug report)

**Special Events (2 flairs):**
- 🚀 Launch Week Hero (signed up week 1)
- 📝 Feedback Giver (submitted feedback)

**Flair Rarity System:**
- Common (gray) - Basic achievements
- Rare (blue) - Moderate difficulty
- Epic (purple) - Challenging achievements
- Legendary (gold) - Elite accomplishments

**Category Filtering:**
- All / Leaderboard / Search / Streaks / Referral / Privacy / Community / Special
- Pill-style filters
- Click to filter badge grid

---

### 1.4 Gift Card Redemption System

**Purpose:** Convert leaderboard wins into tangible rewards with annual budget cap

**Annual Budget System:**
- $600 maximum redemption per calendar year
- Tracked per user, per year (Jan 1 - Dec 31)
- Real-time budget tracking
- Visual progress bar
- Warning when approaching limit
- Block redemption when limit reached

**Available Gift Cards:**
- Amazon ($10, $25, $50)
- Apple/iTunes ($10, $25)
- Starbucks ($5, $10)
- Target ($25, $50)
- Best Buy ($25)
- Visa Prepaid ($50, $100)

**Redemption Flow:**
1. User wins leaderboard position → Earns flair automatically
2. User navigates to Redeem tab
3. Clicks on gift card (only if they have leaderboard flair)
4. Modal shows:
   - Gift card details
   - Annual budget check
   - Remaining budget
   - Warning if this exceeds limit
5. User confirms redemption
6. System checks:
   - Has leaderboard win flair ✓
   - Budget remaining ≥ card value ✓
   - Annual limit not exceeded ✓
7. Redirect to partner site for KYC + fulfillment
8. Update annual budget tracker

**Budget Info Modal:**
- Accessible via info icon (ℹ️) next to "Redeem Rewards"
- Shows current year budget status
- Lists all 9 leaderboard flair values
- Explains eligibility rules
- Shows redemption history

---

### 1.5 Community Stats

**Purpose:** Social proof and competitive motivation

**Real-Time Stats Displayed:**
- 🔥 Top Earner This Hour (address + IXP amount)
- 💰 Total Redemptions This Week (count of users)
- 👥 Active Users Today (count)

**Display Location:**
- Redeem tab, below title
- Purple gradient background card
- 3-column responsive grid

---

### 1.6 User Dashboard

**Stats Display:**
- Daily Streak (🔥)
- Flairs Unlocked (⭐)
- Current Rank (#23)

**Top Card - IXP Balance:**
- Large display of current IXP
- Purple gradient hero card
- Floating animation effect
- Clock icon for transaction history

---

### 1.7 Responsive Design

**Mobile (< 768px):**
- Max-width: 480px centered
- Single column layouts
- 3-column badge grid
- Tabs scroll horizontally

**Tablet (768px - 1023px):**
- Max-width: 1200px
- 4-column stats
- 5-column badges
- 3-column gift cards

**Desktop (1024px+):**
- Full width utilization
- 6-column badges
- 4-column gift cards
- Centered tab navigation

---

## 2. Technical Architecture

### 2.1 Data Models

```javascript
user: {
  address: string, // Ethereum address
  ixp: number,
  rank: number,
  streak: number,
  flairsUnlocked: number,
  hasLeaderboardWin: boolean,
  claimedRewards: string[],
  ixpHistory: [{
    date: datetime,
    action: string,
    amount: number,
    balance: number,
    type: 'earn' | 'spend'
  }],
  annualRedemptions: {
    year: number,
    totalRedeemed: number, // in dollars
    redemptions: [{
      date: date,
      type: string,
      value: number
    }]
  }
}

flair: {
  id: number,
  category: string,
  name: string,
  icon: string,
  unlocked: boolean,
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  count: string,
  enablesGiftCards: boolean,
  value: number // dollar value if gift card flair
}

leaderboardEntry: {
  rank: number,
  address: string, // Ethereum address
  points: number,
  flairs: number,
  isUser: boolean
}
```

### 2.2 Backend Requirements

**IXP Tracking:**
- Real-time balance updates
- Transaction logging with timestamps
- Idempotent reward distribution
- Daily/weekly aggregation for stats

**Leaderboard Logic:**
- Score calculation algorithm
- Auto-reset on schedule
- Top 3 winner detection
- Automatic flair award on reset

**Redemption System:**
- Annual budget tracking per user
- Atomic transactions (check + update + log)
- Integration with gift card API providers
- KYC redirect flow
- Transaction audit log

**Flair Automation:**
- Milestone detection
- Auto-unlock on achievement
- Progress tracking for locked flairs

---

## 3. Future Ideas & Enhancements

### 3.1 Referral Dashboard

**Purpose:** Dedicated space to manage referrals and track bonuses

**Features:**
- Unique referral code/link generation
- Copy to clipboard functionality
- List of successful referrals (with dates)
- Pending referral bonus tracker
- "3 more referrals to Weekly Bonus" progress bar
- Referral leaderboard (optional)

**Technical Needs:**
- Referral code generation API
- Referral tracking table
- Attribution logic (first-touch, last-touch)

---

### 3.2 Redemption History

**Purpose:** Transparent audit log of all gift card redemptions

**Features:**
- Paginated list of past redemptions
- Date, gift card type, value
- Redemption status (pending, completed, failed)
- Download transaction history (CSV export)
- Filter by date range, card type
- Annual summary view

**Display Location:**
- New tab "History" or link in Redeem section
- Modal accessible from budget info card

---

### 3.3 Progress to Next Milestone

**Purpose:** Motivate users by showing proximity to next achievement

**Features:**
- Progress bars on locked flairs
- "45 more searches to unlock Power User"
- Next milestone callout on dashboard
- Notification when close (80% to goal)
- Celebration animation on unlock

**UI Treatment:**
- Progress ring around locked badge icons
- Percentage text below badge
- Highlighted "Next Achievement" section

---

### 3.4 Leaderboard Reset Timer

**Purpose:** Create urgency and awareness of competition windows

**Features:**
- Countdown timer for daily/weekly/monthly reset
- "23h 45m until daily reset"
- Banner notification "Last hour to win!"
- Push notification option
- Historical view of past periods

**Display Location:**
- Top of leaderboard section
- Floating timer bar (optional)

---

### 3.5 Mystery Boxes / Lucky Draws

**Purpose:** Random reward mechanism to increase engagement

**Features:**
- Earn mystery box after X searches or Y IXP
- Timed mystery boxes (every 24 hours)
- Open box animation
- Random rewards: IXP, bonus flairs, exclusive badges
- Box inventory system

**Implementation:**
- Probability tables for rewards
- Box state management (earned, opened, expired)
- Animation library for reveal

---

### 3.6 Omi Pet/Mascot System

**Purpose:** Interactive mascot that grows with user activity

**Features:**
- Feed Omi with searches (1 search = 1 feed)
- Happiness meter (decreases over time)
- Omi skins/costumes (unlockable)
- Omi animations/tricks
- Mini-games with Omi
- Voice packs

**Gamification:**
- Happy Omi gives 2x IXP bonus
- Unlock rare skins via achievements
- Omi evolves at milestones

---

### 3.7 Team/Community Challenges

**Purpose:** Collaborative competition for increased engagement

**Features:**
- Create/join teams (max 50 members)
- Team leaderboard (aggregate IXP)
- Team challenges (collective goals)
- Team chat/messaging
- Team badges and achievements
- Team vs Team tournaments

**Rewards:**
- Bonus IXP for team wins
- Exclusive team badges
- Special team gift card pools

---

### 3.8 Streak Bonuses & Rewards

**Purpose:** Reward consistent daily engagement

**Features:**
- Streak milestone rewards:
  - 7 days: +100 IXP
  - 30 days: +500 IXP + Badge
  - 90 days: +2000 IXP + Badge
  - 365 days: +10000 IXP + Legendary Badge
- Streak saver (1 free pass if miss a day)
- Streak freeze (purchase with IXP)
- Streak leaderboard

**UI Treatment:**
- Fire emoji with counter
- Calendar view with streak days
- Visual streak milestone path

---

### 3.9 Limited Time Events

**Purpose:** Drive traffic during key periods

**Features:**
- Seasonal events (Holiday, Black Friday)
- Double IXP weekends
- Limited edition flairs
- Event-specific leaderboards
- Themed gift cards
- Event countdown timers

**Examples:**
- 🎃 Halloween Hunter (October)
- 🎄 Holiday Hero (December)
- 🎆 New Year Booster (January)
- 🎂 Anniversary Edition (Launch date)

---

### 3.10 Notifications & Alerts

**Purpose:** Re-engage users and celebrate achievements

**Notification Types:**
- "New flair unlocked!" with animation
- "You won 3rd place on Daily Leaderboard!"
- "5 more searches to Power User badge"
- "Your streak is about to break - log in now!"
- "Weekly referral bonus available!"
- "Top 10 alert - you're rank 11, almost there!"

**Delivery Channels:**
- In-app notification bell with badge count
- Push notifications (opt-in)
- Email digest (weekly summary)

**Notification Center:**
- Modal showing all notifications
- Mark as read/unread
- Filter by type
- Clear all option

---

### 3.11 Social Sharing Features

**Purpose:** Organic growth through user sharing

**Features:**
- Share achievement images (auto-generated)
- "I just unlocked X flair!" templates
- Leaderboard position share card
- Total IXP earned badge
- Referral link sharing with preview
- Share to Twitter/Facebook/Discord

**Generated Share Cards:**
- User address (shortened)
- Achievement icon + name
- Inomy branding
- Referral code embedded

---

### 3.12 IXP Marketplace / Spending

**Purpose:** Give IXP utility beyond leaderboard competition

**Potential Spending Options:**
- Buy flair boosts (2x IXP for 1 hour)
- Purchase streak saver
- Unlock exclusive Omi skins
- Buy mystery boxes
- Enter raffles/sweepstakes
- Premium features (advanced filters, priority support)

**Consideration:** Balance with earning to maintain engagement loop

---

### 3.13 Onboarding & Tutorials

**Purpose:** Educate new users on rewards system

**Features:**
- First-time user walkthrough
- Interactive tutorial steps
- "Complete first search" quest
- Tooltip system for features
- Contextual help icons
- Video explainers
- FAQ section

**Gamified Onboarding:**
- "Complete tutorial for 50 IXP"
- Unlock starter badge
- Guided first redemption flow

---

### 3.14 Dark Mode

**Purpose:** User preference for visual comfort

**Features:**
- Toggle in settings
- System preference detection
- Smooth theme transition
- Dark-optimized gradients and colors
- Saved preference

---

### 3.15 Empty States

**Purpose:** Guide users when sections have no data

**Empty State Designs:**
- No flairs yet: "Start earning by completing your first search!"
- No redemptions: "Win a leaderboard position to unlock gift cards"
- No transaction history: "Your IXP earnings will appear here"
- No referrals: "Share your link to invite friends"

---

### 3.16 Accessibility Improvements

**Features:**
- Keyboard navigation support
- Screen reader announcements
- Focus indicators
- ARIA labels on interactive elements
- High contrast mode
- Text scaling support
- Reduced motion option

---

### 3.17 Mobile Bottom Navigation

**Purpose:** Easier thumb reach on mobile devices

**Features:**
- Fixed bottom nav bar on mobile
- Tab icons only (Leaderboard, Flairs, Earn, Redeem)
- Active state indicator
- Smooth scroll to section

---

### 3.18 User Profile / Avatar

**Purpose:** Visual identity beyond Ethereum address

**Features:**
- Generated avatar from address (Blockies, Jazzicon)
- Profile page with stats
- Achievement showcase
- Bio/description
- Links to social profiles
- Public profile URL

---

## 4. Success Metrics

### 4.1 Engagement Metrics
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Average IXP earned per user
- Searches per user per day
- Streak retention rate
- Leaderboard participation rate

### 4.2 Conversion Metrics
- % users who unlock first flair
- % users who win leaderboard position
- % users who redeem gift card
- Average redemption value
- Annual budget utilization rate

### 4.3 Retention Metrics
- 1-day, 7-day, 30-day retention
- Streak completion rate
- Churn rate after redemption
- Re-engagement rate after break

### 4.4 Viral Metrics
- Referral conversion rate
- K-factor (viral coefficient)
- Social shares per user
- Invite-to-signup rate

---

## 5. Launch Roadmap

### Phase 1: Core System (Completed ✅)
- IXP earning and display
- Leaderboard (daily/weekly/monthly)
- Flair system (28 flairs)
- Gift card redemption
- $600 annual cap
- Transaction history
- Community stats

### Phase 2: Engagement Enhancements (Q2 2025)
- Referral dashboard
- Redemption history
- Progress to milestones
- Leaderboard reset timer
- Notifications system
- Onboarding flow

### Phase 3: Social & Competition (Q3 2025)
- Team challenges
- Social sharing
- Mystery boxes
- Streak bonuses
- Limited time events

### Phase 4: Advanced Features (Q4 2025)
- Omi pet system
- IXP marketplace
- Dark mode
- Mobile app
- Advanced analytics

---

## 6. Open Questions & Considerations

1. **IXP Deflation:** Should IXP expire or have a decay mechanism to prevent hoarding?

2. **Leaderboard Scoring:** How is leaderboard score calculated? Pure IXP or weighted by activity type?

3. **Gift Card Fulfillment:** Which partner APIs to use? (Tango Card, Tremendous, Rybbon)

4. **Multi-Year Budget:** Does $600 limit roll over or reset on Jan 1?

5. **Flair Trading:** Should flairs be NFTs? Can users trade/sell flairs?

6. **IXP to Crypto:** Bridge between IXP and actual cryptocurrency?

7. **Admin Tools:** Dashboard for manual flair awards, IXP adjustments, fraud detection?

8. **Regional Restrictions:** Gift card availability by country/region?

9. **Tax Implications:** Are gift card redemptions taxable income? 1099 reporting?

10. **Fraud Prevention:** Sybil resistance, bot detection, multi-account abuse?

---

## 7. Design System

**Colors:**
- Primary: #667eea to #764ba2 (purple gradient)
- Secondary: #F59E0B (gold - for rewards)
- Success: #10B981 (green)
- Error: #EF4444 (red)
- Background: #fafafa
- Text: #0a0a0a

**Typography:**
- Headings: Bebas Neue
- Body: DM Sans
- Code/Addresses: Courier New (monospace)
- UI Labels: Outfit

**Component Library:**
- Cards with soft shadows
- Pill-shaped buttons
- Gradient hero elements
- Smooth transitions (0.3s)
- Border radius: 12-24px

**Iconography:**
- Font Awesome 6.5.1
- Emoji for flairs/categories

---

## Document Version
**Version:** 1.0
**Last Updated:** March 21, 2025
**Author:** Inomy Product Team
**Status:** Living Document
