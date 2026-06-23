# 🔐 NihLink Safelink - v3.0 Modernized Edition

> **Modern, Fast & Secure URL Encryption for Blogger** - Completely Rewritten with Bootstrap 5, ES6+, and Dark Mode

[![GitHub](https://img.shields.io/badge/GitHub-eltonheta-blue?logo=github)](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger)
[![Version](https://img.shields.io/badge/version-3.0.0-success)](CHANGELOG-v3.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple)](https://getbootstrap.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)](https://www.javascript.com)

![Screenshot](screenshot.png)

## 🎯 Për Çfarë Shërbën?

**NihLink v3.0** është një sistem i plotë për enkriptimin dhe mbrojtjen e lidhjeve në Blogger. Ju lejon të:

- 🔒 Enkriptoni URL-et me AES-256
- 🔑 Shtoni fjalëkalim mbrojtjeje
- ⏱️ Shtonje timer countdown
- 🌙 Ndërrojini temat (Dark Mode)
- 📱 Punoni në të gjithë pajisjet
- ⚡ Ngarkimi i shpejtë (pa jQuery)

## ✨ Çfarë Ka të Re në v3.0

| Karakteristika | v2.6.5 | v3.0 |
|---|---|---|
| Bootstrap | 4.3.1 | 5.3 ✅ |
| jQuery | Po ❌ | Jo ✅ |
| Dark Mode | - | Po ✅ |
| Font Awesome | Po | Bootstrap Icons ✅ |
| ES6+ Classes | - | Po ✅ |
| Performance | ~85KB | ~45KB ✅ |
| Browser Support | IE 11 | Modern Only ✅ |

## 🚀 Quick Start

### 1. Fork ose Download

```bash
git clone https://github.com/eltonheta/NihLink-Safelink-Template-Blogger.git
cd NihLink-Safelink-Template-Blogger
git checkout modernize-v3
```

### 2. Shkoni në Blogger Dashboard

1. Settings → Languages and Formatting
2. Design → Edit HTML
3. **Backup your current template** ⚠️
4. Copy content from `template-v3.xml`
5. Paste and Save

### 3. Konfiguroni Settingsat

Edit në **Appearance → Settings Widget**:

```javascript
{
  url: "https://yourblog.blogspot.com",
  page: "p/safelink.html",
  defaultkey: "YourSecretKey123",
  countdown: true,
  timedown: 10,
  lang: {
    urlempty: "URL mund të mos jetë e zbrazët",
    convertsuccess: "Konvertimi i URL-it ishte i suksesshëm!",
    // ... më shumë opcione
  }
}
```

## 📖 Dokumentim

- 📚 [README-v3.md](README-v3.md) - Dokumentim i kompletë
- 🔄 [CHANGELOG-v3.md](CHANGELOG-v3.md) - Historia e ndryshimeve
- 🛠️ [API Reference](README-v3.md#-api-reference) - Për developers

## 🎨 Features

### 🔐 Enkriptim i Sigurt
```javascript
// Automatic AES-256 encryption
const link = generator.generateSafelink('https://example.com', 'password', true);
```

### 🌙 Dark Mode
- Toggle manual në navbar
- Auto-save në localStorage
- Smooth transitions
- Responsive design

### ⚡ Vanilla JavaScript (Zero Dependencies)
```javascript
// Modern ES6+ Classes
class SafelinkGenerator { ... }
class SafelinkDecryptor { ... }
class ThemeManager { ... }
class SafelinkAutoGenerator { ... }
```

### 📱 Fully Responsive
- Mobile-first design
- Tablet optimized
- Desktop enhanced
- Touch-friendly

### 🎯 Auto-Generate Safelinks
```javascript
const generator = new SafelinkAutoGenerator(
  ['example.com', 'mysite.com'],
  {
    url: 'https://myblog.blogspot.com',
    keyit: 'YourSecret',
    countdown: true
  }
);

generator.process().then(count => {
  console.log(`${count} links encrypted`);
});
```

## 🛠️ Teknologjia

- **Bootstrap 5.3** - UI Framework
- **CryptoJS 4.1** - AES Encryption
- **Bootstrap Icons** - Icon Library
- **Vanilla JavaScript** - Modern ES6+
- **No jQuery** - Better Performance

## 📊 Krahasimi me Versionin Origjinal

### Madhësia e Fajllave
```
Original (v2.6.5):
- Bootstrap 4.3.1: ~54KB
- jQuery 2.1.4: ~84KB
- Font Awesome 5.0.10: ~65KB
- Total: ~200KB+

v3.0 Modernized:
- Bootstrap 5.3: ~30KB
- CryptoJS 4.1: ~15KB
- Bootstrap Icons: ~8KB
- Total: ~53KB ✅ 73% më i vogël!
```

### Performance
- ⚡ Më i shpejtë në ngarkimin e faqes
- 📉 Më pak requests (CDN kombinuar)
- 💪 Më i fuqishëm në faqet mobile
- 🎯 Better SEO score

## 🔒 Sigurësia

- ✅ **AES-256 Encryption** - Standardi ushtarak
- ✅ **Client-side Only** - Asnjë server involvement
- ✅ **No Data Storage** - Linqet nuk ruhen kurrësesi
- ✅ **HTTPS Required** - Për sigurinë maksimale
- ✅ **Open Source** - Kontrolluar nga komunitet

## 🐛 Troubleshooting

### Linqet nuk shfaqen
```javascript
// Sigurohuni se keni <div id='output'></div> në post
<p>Your content...</p>
<div id='output'></div>
```

### "CryptoJS not loaded"
```javascript
// Kontrolloni network tab në DevTools
// Sigurohuni se CDN-et janë accessible
```

### Password-i nuk punon
```javascript
// Përdorni të njëtin key gjatë enkriptimit dhe dekriptimit
defaultkey: "SameKeyUsedForEncryption"
```

## 🤝 Kontribucioni

Kërkojnë kontribute! Ju lutemi:

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Licenca

MIT License - Të lirë për përdorim personal dhe komercial

```
Copyright (c) 2024 Elton Heta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

## 🙏 Falenderime

- **Original Developer** - [Anas RAR](https://github.com/anasrar) për ideën origjinale
- **CryptoJS** - [Jeff Mott](https://cryptojs.org)
- **Bootstrap Team** - Për UI framework
- **Community** - Për suportin

## 📞 Kontakt & Support

- 🐛 [Report Bug](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger/issues)
- 💡 [Suggest Feature](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger/discussions)

## 🔗 Links

- 🌐 [Live Demo](https://nihlink.blogspot.com)
- 📖 [Original Repository](https://github.com/anasrar/NihLink-Safelink-Template-Blogger)
- 🎨 [My Portfolio](https://github.com/eltonheta)

---

## 📈 Project Stats

- ⭐ Stars: [![GitHub stars](https://img.shields.io/github/stars/eltonheta/NihLink-Safelink-Template-Blogger?style=social)](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger)
- 🍴 Forks: [![GitHub forks](https://img.shields.io/github/forks/eltonheta/NihLink-Safelink-Template-Blogger?style=social)](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger)
- 👁️ Watchers: [![GitHub watchers](https://img.shields.io/github/watchers/eltonheta/NihLink-Safelink-Template-Blogger?style=social)](https://github.com/eltonheta/NihLink-Safelink-Template-Blogger)

---

**Made with ❤️ for the Blogger & Web Developer Community**

*Last Updated: June 2024 | Version 3.0.0*
