# Google AdSense Integration Guide

## ✅ AdSense Script Added!

The Google AdSense script has been successfully added to your application.

**Publisher ID**: `ca-pub-2757390342181644`

---

## 📍 What's Been Done

### 1. AdSense Script Added to Layout
The AdSense script is now loaded on every page in `/app/layout.tsx`:

```typescript
<script 
    async 
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2757390342181644" 
    crossOrigin="anonymous"
/>
```

### 2. Reusable Ad Component Created
A reusable component has been created at `/components/ads/AdSenseAd.tsx` for easy ad placement.

---

## 🎯 How to Add Ads to Your Pages

### Step 1: Create Ad Units in AdSense Dashboard

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Navigate to **Ads** → **By ad unit**
3. Click **New ad unit**
4. Choose ad type (Display, In-feed, In-article, etc.)
5. Copy the **Ad slot ID** (looks like: `1234567890`)

### Step 2: Use the AdSense Component

Import and use the component in any page:

```typescript
import AdSenseAd from '@/components/ads/AdSenseAd';

export default function YourPage() {
  return (
    <div>
      {/* Your content */}
      
      {/* Add an ad */}
      <AdSenseAd 
        adSlot="YOUR_AD_SLOT_ID"
        adFormat="auto"
        className="my-8"
      />
      
      {/* More content */}
    </div>
  );
}
```

---

## 📐 Ad Placement Examples

### Example 1: Banner Ad (Top of Page)
```typescript
<AdSenseAd 
  adSlot="1234567890"
  adFormat="horizontal"
  className="mb-8"
/>
```

### Example 2: Sidebar Ad
```typescript
<AdSenseAd 
  adSlot="1234567890"
  adFormat="vertical"
  className="sticky top-4"
/>
```

### Example 3: In-Content Ad
```typescript
<AdSenseAd 
  adSlot="1234567890"
  adFormat="auto"
  className="my-8"
/>
```

### Example 4: Rectangle Ad
```typescript
<AdSenseAd 
  adSlot="1234567890"
  adFormat="rectangle"
  fullWidthResponsive={false}
/>
```

---

## 🎨 Recommended Ad Placements

### Home Page (`/app/page.tsx`)
```typescript
import AdSenseAd from '@/components/ads/AdSenseAd';

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Ad after hero */}
      <AdSenseAd adSlot="SLOT_1" className="my-8" />
      
      <GoldRatesDashboard />
      
      {/* Ad between sections */}
      <AdSenseAd adSlot="SLOT_2" className="my-8" />
      
      <QuickCalculator />
      <Features />
      
      {/* Ad before footer */}
      <AdSenseAd adSlot="SLOT_3" className="my-8" />
      
      <CityRates />
      <TrustIndicators />
    </>
  );
}
```

### Calculator Pages
```typescript
// Add sidebar ad on desktop
<div className="grid lg:grid-cols-4 gap-8">
  <div className="lg:col-span-3">
    {/* Calculator content */}
  </div>
  
  <div className="lg:col-span-1">
    {/* Sticky sidebar ad */}
    <AdSenseAd 
      adSlot="SIDEBAR_SLOT"
      adFormat="vertical"
      className="sticky top-4"
    />
  </div>
</div>
```

### Article/Blog Pages
```typescript
<article>
  <h1>Article Title</h1>
  
  {/* In-article ad */}
  <AdSenseAd 
    adSlot="IN_ARTICLE_SLOT"
    adFormat="fluid"
    className="my-6"
  />
  
  <p>Article content...</p>
</article>
```

---

## ⚠️ AdSense Best Practices

### DO's ✅
- ✅ Place ads where they don't disrupt user experience
- ✅ Use 3-4 ads per page maximum
- ✅ Make ads clearly distinguishable from content
- ✅ Use responsive ad formats
- ✅ Test ad placements for best performance
- ✅ Wait for approval before adding too many ads

### DON'Ts ❌
- ❌ Don't place ads too close to navigation
- ❌ Don't use more than 3-4 ads per page
- ❌ Don't click your own ads
- ❌ Don't encourage clicks ("Click here", etc.)
- ❌ Don't place ads on error pages
- ❌ Don't use misleading ad labels

---

## 📊 Optimal Ad Placements

### High-Performing Locations:
1. **Above the fold** (top of page, visible without scrolling)
2. **End of content** (after articles/calculators)
3. **Sidebar** (sticky on desktop)
4. **Between sections** (natural breaks in content)
5. **After first paragraph** (in articles)

### Low-Performing Locations:
- Footer (too far down)
- Header (blocks navigation)
- Popup/overlay (annoying to users)

---

## 🔧 Component Props

```typescript
interface AdSenseAdProps {
  adSlot: string;              // Required: Your ad slot ID
  adFormat?: string;           // Optional: 'auto', 'fluid', 'rectangle', etc.
  fullWidthResponsive?: boolean; // Optional: Default true
  className?: string;          // Optional: Additional CSS classes
}
```

---

## 📱 Responsive Ads

The component automatically makes ads responsive. For best results:

```typescript
// Desktop: Leaderboard (728x90)
// Mobile: Banner (320x50)
<AdSenseAd 
  adSlot="SLOT_ID"
  adFormat="auto"
  fullWidthResponsive={true}
/>
```

---

## 🚀 Next Steps

### 1. Wait for AdSense Approval
- Your site needs to be approved first
- Usually takes 1-2 weeks
- You'll receive an email notification

### 2. Create Ad Units
Once approved:
1. Go to AdSense dashboard
2. Create 3-4 ad units
3. Copy the ad slot IDs
4. Add them to your pages

### 3. Monitor Performance
- Check AdSense dashboard regularly
- Optimize ad placements based on performance
- A/B test different positions

---

## 📝 Example: Adding Ads to Home Page

Here's a complete example:

```typescript
// /app/page.tsx
import Hero from '@/components/home/Hero';
import GoldRatesDashboard from '@/components/home/GoldRatesDashboard';
import QuickCalculator from '@/components/home/QuickCalculator';
import Features from '@/components/home/Features';
import CityRates from '@/components/home/CityRates';
import TrustIndicators from '@/components/home/TrustIndicators';
import AdSenseAd from '@/components/ads/AdSenseAd';

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Ad 1: After hero section */}
      <section className="container-custom py-8">
        <AdSenseAd 
          adSlot="1234567890"
          adFormat="horizontal"
        />
      </section>
      
      <GoldRatesDashboard />
      <QuickCalculator />
      
      {/* Ad 2: Between sections */}
      <section className="container-custom py-8">
        <AdSenseAd 
          adSlot="0987654321"
          adFormat="auto"
        />
      </section>
      
      <Features />
      <CityRates />
      <TrustIndicators />
    </>
  );
}
```

---

## ⚡ Quick Reference

**Publisher ID**: `ca-pub-2757390342181644`

**Component Location**: `/components/ads/AdSenseAd.tsx`

**Usage**:
```typescript
import AdSenseAd from '@/components/ads/AdSenseAd';

<AdSenseAd adSlot="YOUR_SLOT_ID" />
```

---

## 🎉 You're All Set!

Your application is now ready for Google AdSense:
- ✅ AdSense script loaded
- ✅ Reusable ad component created
- ✅ Ready to add ads once approved

**Remember**: Don't add actual ads until your AdSense account is approved!

---

**Questions?** Check the [AdSense Help Center](https://support.google.com/adsense)
