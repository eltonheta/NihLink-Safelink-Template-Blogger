# 🗂️ Safelink Archive & Sitemap System

## 📌 Rreth Sistemit

Ky sistem ju lejon të:
- ✅ Ruani çdo safelink si **Draft Post** në Blogger
- ✅ **Fshini** safelinke të vjetra ose abuzive
- ✅ **Radhitni** dhe kërkoni safelinke
- ✅ **Auto-generate sitemap.xml** për SEO
- ✅ **Shihni statistika** të safelin

---

## 🚀 Setup i Plotë

### **Hapi 1: Shkoni në Google Apps Script**

1. Hapni https://script.google.com
2. Krijoni projekt të ri: `+ New project`
3. Kopjoni kodin nga `google-apps-script.gs`
4. Ngjitni në `Code.gs`

### **Hapi 2: Autorizimi**

1. Klikoni `Run` → Autorizoni me Google Account
2. Zgjidhni kontën e Blogger-it
3. Pranoni lejet

### **Hapi 3: Deploy Web App**

1. Klikoni `Deploy` → `New deployment`
2. Zgjidhni "Web app"
3. "Execute as": Your Account
4. "Who has access": Anyone
5. Klikoni `Deploy`
6. **Kopjoni URL-in e deployuar** (p.sh. `https://script.google.com/macros/d/ABC123.../usercontent`)

### **Hapi 4: Setup në Template**

Në `template-v3.xml`, gjeni seksionin `config` dhe shtoni:

```javascript
window.config = {
  // ... existing config ...
  gasUrl: "https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent",
  archiveEnabled: true
};
```

### **Hapi 5: Shtoni Archive Container në Template**

Në template HTML, shtoni këtë ku dëshironi archive:

```html
<!-- Archive Section -->
<div id='safelink-archive' class='mt-5'></div>
```

### **Hapi 6: Linkim i JavaScript**

Në `template-v3.xml`, shtoni përpara `</body>`:

```html
<script src="https://cdn.jsdelivr.net/gh/yourusername/NihLink-Safelink-Template-Blogger@modernize-v3/safelink-archive-manager.js"></script>
```

---

## 📝 Setup në Blog

### 1. Kalimi i Blogger ID

Gjeni Blogger ID tuaj:
- Shkoni në blog
- Hapni DevTools (F12)
- Console → `document.body.id`
- Kopjoni numrin pas `blog-`

Shembull: `BLOGGER_ID = 1234567890123456`

### 2. Setup API Key

1. Shkoni në https://console.cloud.google.com
2. Krijoni projekt të ri
3. Aktivizoni "Blogger API"
4. Krijoni API Key
5. Kopjoni në `google-apps-script.gs`

---

## 🎯 Përdorimi

### **Krijoni Safelink**

Në template, kur krijohet safelink:

```javascript
// Auto-save në Blogger
const safelinkData = {
  title: "My URL",
  originalUrl: "https://example.com",
  encryptedUrl: "https://yourblog.blogspot.com/p/safelink.html?u=...",
  hasPassword: false,
  countdown: true,
  config: window.config
};

await safeLinkArchive.createSafelink(safelinkData);
```

### **Shihni Archive**

Archive do të shfaqet automatikisht në faqen e blogit me:
- Listën e safelin
- Buton delete
- Kërkim & filter

### **Fshini Safelink**

Klikoni ikonën e trash-it në archive. Ajo do të fshijë post-in në Blogger.

### **Generate Sitemap**

```javascript
// Get sitemap XML
const sitemap = await safeLinkArchive.getSitemap();
console.log(sitemap);
```

Ose direktly: `YOUR_GAS_URL?action=sitemap`

### **Shihni Statistics**

```javascript
const stats = await safeLinkArchive.getStats();
console.log(stats);
// Output: { totalSafelinks: 15, totalViews: 320, ... }
```

---

## 🔒 Security

- ✅ Archive posts janë **private** (draft)
- ✅ Vetëm ju mund t'i shihni
- ✅ Google ruan të dhënat në Blogger servers
- ✅ Encrypted URLs mbeten të sigurta

---

## 📊 Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourblog.blogspot.com/safelink1</loc>
    <lastmod>2024-06-23</lastmod>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  ...
</urlset>
```

### Submit në Google Search Console:

1. Shkoni në Google Search Console
2. Sitemaps → New sitemap
3. Futni: `YOUR_GAS_URL?action=sitemap`
4. Submit

---

## 🐛 Troubleshooting

### **GAS URL nuk funksionon**
- Kontrolloni nëse deployment është aktiv
- Sigurohuni se "Who has access" = "Anyone"
- Refresh faqen

### **Authorization failed**
- Shkoni në Apps Script
- Klikoni gear ⚙️
- Kontrolloni "Project settings"
- Update OAuth scope

### **Archive nuk shfaqet**
- Sigurohuni se `id="safelink-archive"` ekziston në HTML
- Kontrolloni browser console për errors
- Reload faqën

---

## 📚 API Reference

### Create Safelink
```javascript
await safeLinkArchive.createSafelink({
  title: "URL Title",
  originalUrl: "https://example.com",
  encryptedUrl: "https://blog.blogspot.com/p/safelink.html?u=...",
  hasPassword: true,
  countdown: true,
  config: {}
});
```

### Delete Safelink
```javascript
await safeLinkArchive.deleteItem(postId, "Title");
```

### Get Archive
```javascript
await safeLinkArchive.loadArchive();
// Array of safelinks
```

### Get Sitemap
```javascript
const xml = await safeLinkArchive.getSitemap();
```

### Get Stats
```javascript
const stats = await safeLinkArchive.getStats();
```

---

## 📞 Support

Pro Probleme:
1. Kontrolloni console logs (F12)
2. Shihni Google Apps Script logs
3. Hapni issue në GitHub

---

**Made with ❤️ for better safelink management**