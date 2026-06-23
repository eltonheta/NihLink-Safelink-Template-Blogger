/**
 * NihLink Safelink Archive System
 * Google Apps Script untuk Blogger Integration
 * 
 * Setup:
 * 1. Shkoni në script.google.com
 * 2. Krijoni projekt të ri
 * 3. Kopjoni këtë kod
 * 4. Deploy si Web App
 * 5. Autorizoni me Blogger API
 */

const BLOGGER_ID = 'YOUR_BLOGGER_ID'; // https://www.blogger.com/blogger.g?blogID=BLOGGER_ID
const LABEL = 'Safelink-Archive';
const API_KEY = 'YOUR_GOOGLE_API_KEY'; // https://console.cloud.google.com

/**
 * DoGet - Handle requests
 */
function doGet(e) {
  const action = e.parameter.action || 'index';
  
  if (action === 'archive') {
    return getArchive();
  } else if (action === 'sitemap') {
    return generateSitemap();
  } else if (action === 'stats') {
    return getStats();
  }
  
  return HtmlService.createHtmlOutput('Invalid action');
}

/**
 * DoPost - Create/Update/Delete safelin
 */
function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  if (action === 'create') {
    return createSafelinkPost(data);
  } else if (action === 'delete') {
    return deleteSafelinkPost(data.postId);
  } else if (action === 'update') {
    return updateSafelinkPost(data);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: false,
    message: 'Invalid action'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Krijo Safelink Post në Blogger
 */
function createSafelinkPost(data) {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    
    // Krijo draft post
    const post = blog.createPost(`Safelink: ${data.title || 'Untitled'}`);
    
    // Set content me encrypted URL
    const content = `
      <div class="safelink-archive-item">
        <h3>Original URL</h3>
        <input type="text" value="${data.originalUrl}" readonly class="safelink-original" />
        
        <h3>Encrypted Link</h3>
        <input type="text" value="${data.encryptedUrl}" readonly class="safelink-encrypted" />
        
        <h3>Metadata</h3>
        <ul>
          <li><strong>Created:</strong> ${new Date().toISOString()}</li>
          <li><strong>Password Protected:</strong> ${data.hasPassword ? 'Yes' : 'No'}</li>
          <li><strong>Countdown:</strong> ${data.countdown ? 'Yes' : 'No'}</li>
          <li><strong>Views:</strong> 0</li>
        </ul>
        
        <h3>Settings</h3>
        <pre>${JSON.stringify(data.config, null, 2)}</pre>
      </div>
    `;
    
    post.setContent(content);
    post.setLabels([LABEL]);
    post.moveToTrash(); // Keep as draft
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      postId: post.getId(),
      message: 'Safelink u ruajt'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fshij Safelink Post
 */
function deleteSafelinkPost(postId) {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    const post = blog.getPostById(postId);
    post.deletePost();
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Safelink u fshi'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Ndrysho Safelink Post
 */
function updateSafelinkPost(data) {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    const post = blog.getPostById(data.postId);
    
    post.setTitle(`Safelink: ${data.title}`);
    post.setContent(data.content);
    post.publish();
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Safelink u përditësua'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Merr Archive të Safelin
 */
function getArchive() {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    const posts = blog.getPosts();
    const archive = [];
    
    posts.forEach(post => {
      if (post.getLabels().includes(LABEL)) {
        archive.push({
          id: post.getId(),
          title: post.getTitle(),
          url: post.getURL(),
          published: post.getPublished(),
          labels: post.getLabels()
        });
      }
    });
    
    return ContentService.createTextOutput(JSON.stringify(archive))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Generate Sitemap XML
 */
function generateSitemap() {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    const posts = blog.getPosts();
    const baseUrl = blog.getUrl();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    posts.forEach(post => {
      if (post.getLabels().includes(LABEL)) {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(post.getURL())}</loc>\n`;
        xml += `    <lastmod>${formatDate(post.getUpdated())}</lastmod>\n`;
        xml += '    <priority>0.8</priority>\n';
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '  </url>\n';
      }
    });
    
    xml += '</urlset>';
    
    return ContentService.createTextOutput(xml)
      .setMimeType(ContentService.MimeType.XML);
  } catch (e) {
    return ContentService.createTextOutput('Error generating sitemap')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Merr Statistics
 */
function getStats() {
  try {
    const blog = BloggerApp.getBlog(BLOGGER_ID);
    const posts = blog.getPosts();
    
    let totalPosts = 0;
    let totalViews = 0;
    
    posts.forEach(post => {
      if (post.getLabels().includes(LABEL)) {
        totalPosts++;
        // Views tracking would require additional setup
      }
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      totalSafelinks: totalPosts,
      totalViews: totalViews,
      generatedAt: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({
      error: e.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Utility: Escape XML characters
 */
function escapeXml(str) {
  return str.replace(/[<>&'"]/g, function(c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

/**
 * Utility: Format date for XML
 */
function formatDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}