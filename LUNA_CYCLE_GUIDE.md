# 🌙 Luna Cycle - Beautiful Period Predictor UI

## ✨ Design Overview

**Luna Cycle** is a professionally designed, feminine, and modern UI for the Period Predictor web app. It features a calm, elegant aesthetic specifically crafted for women's health tracking.

---

## 🎨 Design Specifications

### Color Palette
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Blush Pink** | `#fce7ef` | Primary background gradient |
| **Lavender Mist** | `#e7e6fa` | Secondary background gradient |
| **Coral Accent** | `#f65a83` | Buttons, headings, highlights |
| **Midnight Indigo** | `#2d2a4a` | Text color |
| **Soft White** | `#fff9fb` | Card backgrounds, input fields |

### Typography
- **Headings:** Poppins (400, 600, 700 weights)
- **Body Text:** Quicksand (300, 400, 500, 600 weights)
- **Font Sizes:** Responsive scaling from mobile to desktop

### Visual Effects
- **Glassmorphism:** Frosted glass effect on cards
- **Gradients:** Smooth color transitions throughout
- **Shadows:** Soft, feminine shadows (`rgba(244, 170, 210, 0.25)`)
- **Border Radius:** 20px for cards, 15px for inputs, 10px for small elements

---

## 🏗️ Layout Structure

### Header Section
```
🌙 Luna Cycle
Track your body. Understand your rhythm.
```
- Large moon icon with gentle pulse animation
- Elegant app title with coral color
- Italic tagline for rhythm tracking

### Greeting
```
Hey beautiful, let's track your cycle 🌸
```
- Warm, encouraging message
- Sets friendly, supportive tone

### Main Input Card (Glassmorphism)
1. **Date Input Section**
   - Icon: 🌸
   - Large textarea for multiple dates
   - Placeholder with format examples
   - Focus effects with coral glow

2. **Lookback Cycles Section**
   - Icon: 🌿
   - Number input (1-12 range)
   - Default value: 6
   - Helpful hint text

3. **Predict Button**
   - Icon: 💖 (with heartbeat animation)
   - Gradient background (pink → lavender)
   - Hover effects with glow and lift
   - Full-width design

### Loading State
```
[Rotating Spinner]
Reading your rhythm... 🌙
```
- Smooth spinner animation
- Encouraging text during processing

### Results Card (Animated)
**Primary Result (Featured):**
- 🌙 Large moon icon
- Next Period Expected Date
- Confidence range (±X days)
- Gradient background with glow effect

**Secondary Results Grid:**
- 💗 Mean Cycle Length
- 📊 Cycle Variability (std dev)
- 🎯 Confidence Window
- 🌸 Fertile Window

**Optional Warning:**
- ⚠️ Irregular cycle note (if applicable)
- Soft warning styling

**Encouragement:**
```
You're doing great tracking your health! 🌿
```

### Footer
```
💫 This is an estimation tool, not medical advice.
```
- Muted text with disclaimer
- Centered layout with icon

---

## 🎭 Animations & Interactions

### Page Load Animations
1. **Container:** Fade-in-up (0.8s)
2. **Header:** Fade-in (1s)
3. **Main Card:** Slide-up (0.9s)
4. **Footer:** Fade-in (1.5s)

### Icon Animations
- **Moon Icon:** Gentle pulse (3s infinite)
- **Heart Icon:** Heartbeat effect (1.5s infinite)

### Button Interactions
- **Hover:** Lift effect (-3px) + enhanced shadow
- **Active:** Slight press (-1px)
- **Disabled:** 60% opacity, no interactions

### Result Display
- **Card:** Slide-in from bottom with scale
- **Primary Result:** Continuous glow pulse
- **Secondary Items:** Hover slide-right effect

### Input Focus States
- **Border Color:** Changes to coral
- **Glow:** Soft coral shadow (4px)
- **Lift:** Subtle -2px translation

---

## 📱 Responsive Design

### Desktop (> 768px)
- Max width: 650px
- Full padding and spacing
- Side-by-side layouts where appropriate

### Tablet (≤ 768px)
- Reduced padding
- Smaller font sizes
- Stacked primary result

### Mobile (≤ 480px)
- Compact layout
- Centered content
- Full-width elements
- Touch-friendly sizing

---

## 🔧 Technical Implementation

### File Structure
```
luna-cycle.html    - Main HTML structure
luna-style.css     - Complete styling (no frameworks)
luna-script.js     - Async functionality
```

### Key Features

#### HTML
- Semantic markup
- Proper form structure
- Accessible labels and ARIA attributes
- Clean, commented code

#### CSS
- CSS Custom Properties (variables)
- Flexbox and Grid layouts
- Keyframe animations
- Media queries for responsiveness
- Glassmorphism effects
- Print-friendly styles

#### JavaScript
- Async/await for API calls
- Clean error handling
- Input validation
- Date formatting utilities
- Smooth scroll to results
- Keyboard shortcuts (Ctrl+Enter to submit)

---

## 🌟 User Experience Flow

1. **Arrival**
   - Beautiful gradient background appears
   - Content fades in with staggered timing
   - Greeting message welcomes user

2. **Input**
   - User reads friendly prompts
   - Icons guide each section
   - Hints provide format help
   - Focus states give clear feedback

3. **Submission**
   - Button shows heartbeat animation
   - Click triggers hover glow
   - Form submits asynchronously

4. **Processing**
   - Loading spinner appears
   - Encouraging message shown
   - Button disabled during processing

5. **Results**
   - Card slides in smoothly
   - Primary result highlighted with glow
   - Secondary info in organized grid
   - Warning shown if needed
   - Encouragement message provides closure

6. **Review**
   - User can read results easily
   - Hover effects provide interactivity
   - Scroll to top smooth if needed

---

## 🎯 Design Goals Achieved

✅ **Calm & Elegant** - Soft pastels, smooth animations  
✅ **Modern** - Glassmorphism, gradients, contemporary typography  
✅ **Feminine** - Pink/lavender palette, flower/moon icons  
✅ **Professional** - Clean code, proper structure, accessibility  
✅ **Attractive for Girls** - Encouraging messages, beautiful aesthetics  
✅ **Easy to Use** - Clear labels, helpful hints, intuitive flow  

---

## 🚀 Backend Integration

### API Endpoint Used
```
POST http://localhost:8000/predict
```

### Request Format
```json
{
  "past_starts": ["2025-07-01", "2025-07-29", "2025-08-27"],
  "lookback": 6
}
```

### Response Format
```json
{
  "predicted_date": "2025-11-20",
  "mean_cycle": 28.5,
  "std_dev": 1.3,
  "ci_lower": "2025-11-19",
  "ci_upper": "2025-11-21",
  "fertile_window_start": "2025-11-05",
  "fertile_window_end": "2025-11-13",
  "note": "Optional irregularity warning"
}
```

---

## 📝 Usage Instructions

### For Users

1. **Access the App**
   ```
   http://localhost:8000/luna
   ```

2. **Enter Your Data**
   - Type past period start dates (one per line)
   - Format: YYYY-MM-DD
   - Example:
     ```
     2025-07-01
     2025-07-29
     2025-08-27
     ```

3. **Adjust Settings (Optional)**
   - Change "lookback cycles" if desired
   - Default of 6 works well for most

4. **Get Your Prediction**
   - Click "💖 Predict My Next Period"
   - Wait for beautiful results to appear
   - Review all metrics provided

### For Developers

1. **Serve the Files**
   - Place HTML in root directory
   - Place CSS and JS in `/static/` folder
   - Ensure FastAPI serves static files

2. **Configure Backend**
   - Update `API_BASE_URL` in luna-script.js if needed
   - Ensure `/predict` endpoint is working
   - Test CORS settings

3. **Customize Design**
   - Modify CSS variables in `:root`
   - Adjust animations in `@keyframes`
   - Update colors while maintaining contrast

---

## ♿ Accessibility Features

- Semantic HTML elements
- Proper form labels
- Focus indicators on all interactive elements
- Keyboard navigation support (Tab, Enter, Ctrl+Enter)
- High contrast text (WCAG AA compliant)
- Screen reader friendly structure
- Print-friendly styles

---

## 🎨 Design Inspiration

The Luna Cycle design draws inspiration from:
- **Phases of the moon** (gentle, cyclical, natural)
- **Blooming flowers** (growth, femininity, beauty)
- **Soft watercolors** (calm, soothing, artistic)
- **Modern wellness apps** (clean, professional, trustworthy)

---

## 💡 Pro Tips

### For Best Visual Experience
- Use on screens with good color reproduction
- Enable smooth scrolling in browser
- Use modern browsers (Chrome, Firefox, Safari, Edge)
- Avoid very old devices (glassmorphism requires CSS support)

### For Best Predictions
- Enter at least 3-6 past dates
- Use consistent morning dates
- Track regularly for patterns
- Update after each new cycle

---

## 🌸 Final Notes

Luna Cycle represents a thoughtful approach to women's health tracking, combining:
- **Scientific accuracy** (statistical predictions)
- **Emotional intelligence** (encouraging, supportive language)
- **Visual appeal** (beautiful, calming design)
- **Technical excellence** (clean code, smooth performance)

The design is **framework-free**, relying only on:
- Pure HTML5
- Pure CSS3
- Vanilla JavaScript
- Google Fonts (Poppins & Quicksand)

This ensures:
- Fast loading times
- Easy maintenance
- Full customization control
- No dependency issues

---

**Created with 💜 for women's health and wellness**

*Luna Cycle - Track your body. Understand your rhythm. 🌙*
