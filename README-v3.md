# NihLink Safelink Template v3.0 🔐

> **Modern, fast, and secure URL encryption for Blogger**

[![GitHub release](https://img.shields.io/badge/release-v3.0.0-blue)](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Bootstrap](https://img.shields.io/badge/bootstrap-5.3-purple)](https://getbootstrap.com)
[![CryptoJS](https://img.shields.io/badge/cryptojs-4.1-red)](https://cryptojs.org)

## ✨ What's New in v3.0

- 🎨 **Dark Mode** - Toggle dark/light theme with persistent storage
- ⚡ **Modern Stack** - Bootstrap 5, ES6+, Zero jQuery
- 🚀 **Better Performance** - Lighter dependencies, optimized code
- 🎯 **Improved UX** - Smooth animations, responsive design
- 📚 **Better Code** - ES6 Classes, JSDoc comments, cleaner structure

## 🎯 Features

- 🔒 **AES-256 Encryption** - Industry-standard encryption
- 🔑 **Password Protection** - Optional password for additional security
- ⏱️ **Countdown Timer** - Delay before redirecting to actual link
- 🌙 **Dark Mode** - Native dark mode with auto-save
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎨 **Modern UI** - Bootstrap 5 with smooth animations
- ♿ **Accessible** - ARIA labels and semantic HTML
- 📊 **Analytics Ready** - Built-in analytics support

## 📦 Stack

- **Bootstrap 5.3** - UI Framework
- **CryptoJS 4.1** - AES Encryption
- **Bootstrap Icons** - Icon library
- **QR Code Library** - QR code generation (optional)
- **Vanilla JavaScript** - No jQuery required!

## 🚀 Quick Start

### Installation

1. **Clone or fork** this repository
2. **Choose your template:**
   - `template-v3.xml` - Modern version (recommended)
   - `template.xml` - Original version

3. **Copy template content**
4. **Go to Blogger Dashboard** → Design → Edit HTML
5. **Paste the template** (backup your current template first)
6. **Save changes**

## ⚙️ Configuration

Edit the settings in the `Settings` widget:

```javascript
url: "",                    // Your blog URL (auto-detect if empty)
page: "p/safelink.html",    // Safelink page URL
output: "#output",          // Where to display decrypted link
defaultkey: "NihLink2024",  // Default encryption key
fixednavbar: true,          // Fixed navigation bar
countdown: true,            // Enable countdown by default
timedown: 10,               // Countdown duration in seconds
analytics: true,            // Enable analytics
lang: {                     // Language/messages
  urlempty: "URL mund të mos jetë e zbrazët",
  convertsuccess: "Konvertimi i URL-it ishte i suksesshëm...",
  validtext: "HTTP, HTTPS, ose WWW",
  gourltext: "Kliko këtu për të shkuar",
  nourl: "Nuk ka URL këtu",
  errorconvert: "URL nuk mund të konvertohet",
  emptypass: "Fjalekalimi nuk mund të jetë i zbrazët",
  wrongpass: "Fjalekalimi është i pasaktë",
  countdowntext: "Ju lutemi prisni {{anascountdown}} sekonda"
}
```

## 📖 Usage

### How to Create Safelinks

1. **Go to your blog homepage**
2. **Enter the URL** you want to encrypt
3. **Optionally add a password**
4. **Toggle countdown** if desired
5. **Click Convert**
6. **Copy the generated safe link**
7. **Share it!**

### How to Use in Posts

Add this anywhere in your post HTML:

```html
<p>Your content here...</p>
<div id='output'></div>
<p>More content here...</p>
```

The decrypted link will appear where `<div id='output'></div>` is placed.

## 🔄 Auto-Generate Safelinks

Use `autogenerate-v3.js` to automatically encrypt external links:

```javascript
const generator = new SafelinkAutoGenerator(
  ['example.com', 'mysite.com'],  // Blacklist
  {
    url: 'https://myblog.blogspot.com',
    page: 'p/safelink.html',
    keyit: 'MySecretKey',
    countdown: true
  }
);

// Process all external links
generator.process().then(count => {
  console.log(`Processed ${count} links`);
});
```

## 🎨 Customization

### Change Colors

Edit CSS variables in the template:

```css
:root {
  --primary-color: #0d6efd;       /* Blue */
  --danger-color: #dc3545;        /* Red */
  --success-color: #198754;       /* Green */
  --warning-color: #ffc107;       /* Yellow */
}
```

### Change Language

Modify the `lang` object in settings:

```javascript
lang: {
  urlempty: "Your custom message",
  convertsuccess: "Your custom message",
  // ... more messages
}
```

## 🌙 Dark Mode

- **Automatic Detection** - Respects system preferences (on first visit)
- **Manual Toggle** - Click the moon/sun icon in navbar
- **Persistent** - Choice is saved in localStorage
- **Smooth Transition** - 0.3s fade between modes

## 📱 Browser Support

| Browser | Support |
|---------|----------|
| Chrome  | ✅ 90+  |
| Firefox | ✅ 88+  |
| Safari  | ✅ 14+  |
| Edge    | ✅ 90+  |
| Mobile  | ✅ Modern |

## 🔐 Security

- ✅ **AES-256 Encryption** - Military-grade encryption
- ✅ **Client-side Only** - No server involvement
- ✅ **No Data Storage** - Links not stored anywhere
- ✅ **HTTPS Only** - Always use HTTPS for your blog

## 📊 API Reference

### SafelinkGenerator

```javascript
const generator = new SafelinkGenerator(config);

// Generate safelink
const link = generator.generateSafelink(
  'https://example.com',
  'password',      // optional
  true            // countdown enabled
);
```

### SafelinkDecryptor

```javascript
const decryptor = new SafelinkDecryptor(config);

// Decrypt URL parameter
const data = decryptor.decryptUrl(encryptedUrl, password);

// Get URL parameter
const encrypted = decryptor.getUrlParameter('u');
```

### ThemeManager

```javascript
const theme = new ThemeManager();

// Toggle theme
theme.toggleTheme();

// Check if dark mode
console.log(theme.darkMode); // true or false
```

## 🐛 Troubleshooting

### "CryptoJS not loaded"
- Make sure CDN links are working
- Check browser console for network errors

### "Password is incorrect"
- Verify the default key in settings
- Check if password was used when creating link

### Links not appearing
- Ensure `<div id='output'></div>` is in your post
- Check if the page is set correctly in settings

## 📝 License

MIT License - feel free to use and modify!

## 👨‍💻 Credits

- **Original** - [Anas RAR](https://github.com/anasrar)
- **Modernization** - [Your Name/Contributors]
- **CryptoJS** - [Jeff Mott](https://cryptojs.org)
- **Bootstrap** - [Bootstrap Team](https://getbootstrap.com)

## 🔗 Links

- 📖 [Original Repository](https://github.com/anasrar/NihLink-Safelink-Template-Blogger)
- 🐛 [Report Issues](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger/issues)
- 💡 [Suggestions](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger/discussions)

---

**Made with ❤️ for the Blogger community**