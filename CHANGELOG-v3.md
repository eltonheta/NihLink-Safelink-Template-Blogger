# NihLink v3.0.0 - Changelog

## 3.0.0 - 2024

### Major Updates
- ✅ **Complete Modernization** - Migrated from jQuery to Vanilla JavaScript (ES6+)
- ✅ **Bootstrap 5.3** - Upgraded from Bootstrap 4.3.1 for better performance
- ✅ **Dark Mode** - Added native dark mode toggle with localStorage persistence
- ✅ **Bootstrap Icons** - Replaced Font Awesome with lightweight Bootstrap Icons
- ✅ **ES6 Classes** - Rewrote core functionality using modern JavaScript classes:
  - `SafelinkGenerator` - URL encryption and generation
  - `SafelinkDecryptor` - URL decryption and display
  - `ThemeManager` - Dark mode management
  - `SafelinkAutoGenerator` - Auto-encrypt external links
- ✅ **Improved UI/UX** - Enhanced animations, smooth transitions, better responsive design
- ✅ **Better Performance** - Reduced dependencies, smaller file size
- ✅ **Modern Code Practices** - JSDoc comments, error handling, better structure

### Features
- 🎨 Dark Mode Toggle (stored in localStorage)
- 🔒 AES-256 Encryption (CryptoJS 4.1.1)
- ⏱️ Countdown Timer
- 🔐 Password Protection
- 📱 Fully Responsive Design
- ♿ Better Accessibility
- 🎯 Modern Navigation with Bootstrap 5
- 📊 Ready for Analytics Integration

### Technical Changes
- Removed jQuery dependency
- Replaced Font Awesome with Bootstrap Icons (5x smaller)
- Improved form validation
- Better error handling and user feedback
- Optimized CSS with CSS variables
- More maintainable JavaScript structure

### Breaking Changes
- jQuery is no longer required
- Font Awesome icons replaced with Bootstrap Icons
- Bootstrap 5 required (different class names)
- JavaScript API changes (use new class-based methods)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Modern mobile browsers

---

## Previous Versions

### 2.6.5 - 16/04/2019
- ✅ Add startsWith Polyfill For IE 11 Compatible
- ✅ Fix Fetch BUG #2

### 2.5.4 - 10/04/2019
- ✅ Fix URL Start With "www"
- ✅ Add Countdown Toggle
- ✅ Change Structure Encoding
- ✅ Add `autogenerate.js`

### 2.2.2 - 09/04/2019
- ✅ Add Countdown
- ✅ Fix Deep Extend jQuery

### 2.1.1 - 05/04/2019
- ✅ Add Random Post

### 2.0.1 - 04/04/2019
- ✅ Add Password System