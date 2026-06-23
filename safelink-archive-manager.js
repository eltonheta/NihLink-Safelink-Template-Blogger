/**
 * NihLink Safelink Archive Manager
 * Frontend Script për Management
 * Shtojeni në template-v3.xml
 */

class SafelinkArchiveManager {
  constructor(config) {
    this.config = config;
    this.gasUrl = config.gasUrl || ''; // Google Apps Script Web App URL
    this.archive = [];
    this.init();
  }

  /**
   * Initialize Archive Manager
   */
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupUI();
      this.loadArchive();
    });
  }

  /**
   * Setup Archive UI
   */
  setupUI() {
    const archiveContainer = document.getElementById('safelink-archive');
    if (!archiveContainer) return;

    archiveContainer.innerHTML = `
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5><i class="bi bi-list-check"></i> Safelink Archive</h5>
          <button class="btn btn-sm btn-outline-primary" onclick="safeLinkArchive.loadArchive()">
            <i class="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <input type="text" class="form-control" id="archiveSearch" 
                   placeholder="Kerkoni safelink..." 
                   onkeyup="safeLinkArchive.filterArchive(this.value)" />
          </div>
          <div id="archiveList" class="list-group">
            <div class="text-center p-4">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Load Archive from Google Apps Script
   */
  async loadArchive() {
    if (!this.gasUrl) {
      console.warn('Google Apps Script URL not configured');
      return;
    }

    try {
      const response = await fetch(`${this.gasUrl}?action=archive`);
      this.archive = await response.json();
      this.displayArchive();
    } catch (error) {
      console.error('Error loading archive:', error);
      this.showError('Gabim gjate ngarkimit te archive');
    }
  }

  /**
   * Display Archive List
   */
  displayArchive() {
    const listContainer = document.getElementById('archiveList');
    if (!listContainer) return;

    if (this.archive.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center p-4 text-muted">
          <i class="bi bi-inbox" style="font-size: 2rem;"></i>
          <p>Nuk ka safelink te ruajtur akoma</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = this.archive.map((item, index) => `
      <div class="list-group-item">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.title}</h6>
            <small class="text-muted">
              <i class="bi bi-calendar"></i> 
              ${new Date(item.published).toLocaleDateString('sq-AL')}
            </small>
          </div>
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-info" 
                    onclick="safeLinkArchive.viewItem('${item.id}')" 
                    title="Shiko">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-danger" 
                    onclick="safeLinkArchive.deleteItem('${item.id}', '${item.title}')" 
                    title="Fshij">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Filter Archive
   */
  filterArchive(query) {
    const filtered = this.archive.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.url.toLowerCase().includes(query.toLowerCase())
    );

    const listContainer = document.getElementById('archiveList');
    if (!listContainer) return;

    listContainer.innerHTML = filtered.map((item, index) => `
      <div class="list-group-item">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <h6 class="mb-1">${item.title}</h6>
            <small class="text-muted">
              <i class="bi bi-calendar"></i> 
              ${new Date(item.published).toLocaleDateString('sq-AL')}
            </small>
          </div>
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-outline-info" 
                    onclick="safeLinkArchive.viewItem('${item.id}')">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-outline-danger" 
                    onclick="safeLinkArchive.deleteItem('${item.id}', '${item.title}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /**
   * View Item Details
   */
  viewItem(postId) {
    const item = this.archive.find(i => i.id === postId);
    if (!item) return;

    alert(`
      Title: ${item.title}
      URL: ${item.url}
      Published: ${new Date(item.published).toLocaleString('sq-AL')}
    `);
  }

  /**
   * Delete Item
   */
  async deleteItem(postId, title) {
    if (!confirm(`A jeni i sigurtë që dëshironi të fshini "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${this.gasUrl}?action=delete`, {
        method: 'POST',
        payload: JSON.stringify({ postId: postId })
      });

      const result = await response.json();
      if (result.success) {
        this.showSuccess('Safelink u fshi me sukses');
        this.loadArchive();
      } else {
        this.showError(result.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      this.showError('Gabim gjate fshirjes');
    }
  }

  /**
   * Create New Safelink
   */
  async createSafelink(data) {
    if (!this.gasUrl) {
      console.warn('Google Apps Script URL not configured');
      return false;
    }

    try {
      const response = await fetch(`${this.gasUrl}?action=create`, {
        method: 'POST',
        payload: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        this.showSuccess('Safelink u ruajt me sukses');
        this.loadArchive();
        return true;
      } else {
        this.showError(result.message);
        return false;
      }
    } catch (error) {
      console.error('Error creating safelink:', error);
      this.showError('Gabim gjate ruajtjes');
      return false;
    }
  }

  /**
   * Get Sitemap
   */
  async getSitemap() {
    if (!this.gasUrl) return null;

    try {
      const response = await fetch(`${this.gasUrl}?action=sitemap`);
      return await response.text();
    } catch (error) {
      console.error('Error getting sitemap:', error);
      return null;
    }
  }

  /**
   * Get Stats
   */
  async getStats() {
    if (!this.gasUrl) return null;

    try {
      const response = await fetch(`${this.gasUrl}?action=stats`);
      return await response.json();
    } catch (error) {
      console.error('Error getting stats:', error);
      return null;
    }
  }

  /**
   * Show Success Message
   */
  showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.innerHTML = `
      <i class="bi bi-check-circle"></i> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alert, document.body.firstChild);
    setTimeout(() => alert.remove(), 3000);
  }

  /**
   * Show Error Message
   */
  showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger alert-dismissible fade show';
    alert.innerHTML = `
      <i class="bi bi-exclamation-triangle"></i> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.insertBefore(alert, document.body.firstChild);
    setTimeout(() => alert.remove(), 5000);
  }
}

// Initialize
let safeLinkArchive;
document.addEventListener('DOMContentLoaded', () => {
  safeLinkArchive = new SafelinkArchiveManager(window.config);
});