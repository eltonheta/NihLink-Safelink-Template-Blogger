/*
 * NihLink AutoGenerate v3.0.0
 * Modern version using ES6+ and Promise-based API
 * 
 * Created By Anas RAR
 * Modified: 2024
 * Repository: https://github.com/anasrar/NihLink-Safelink-Template-Blogger
 * License: MIT
 */

/**
 * SafelinkAutoGenerator - Automatically encrypts external links
 * @class
 * @param {Array} blacklist - Array of domain names to exclude
 * @param {Object} config - Configuration object
 */
class SafelinkAutoGenerator {
  /**
   * Constructor
   * @param {Array} blacklist - Domains to exclude from encryption
   * @param {Object} config - Configuration options
   */
  constructor(blacklist = [], config = {}) {
    this.blacklist = blacklist.map(domain => domain.toLowerCase());
    this.config = {
      url: '',
      page: 'p/safelink.html',
      keyit: 'NihLink2024',
      countdown: true,
      ...config
    };
    this.processedLinks = 0;
  }

  /**
   * Get the current domain
   * @returns {string} Current domain name
   */
  getCurrentDomain() {
    return window.location.hostname.toLowerCase();
  }

  /**
   * Extract domain from URL
   * @param {string} url - Full URL
   * @returns {string} Domain name
   */
  extractDomain(url) {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch (e) {
      return '';
    }
  }

  /**
   * Check if domain is in blacklist
   * @param {string} domain - Domain to check
   * @returns {boolean} True if in blacklist
   */
  isBlacklisted(domain) {
    return this.blacklist.includes(domain) || domain === this.getCurrentDomain();
  }

  /**
   * Encrypt data using CryptoJS
   * @param {Object} data - Data to encrypt
   * @param {string} password - Encryption password
   * @returns {string} Encrypted data
   */
  encrypt(data, password) {
    if (!window.CryptoJS) {
      throw new Error('CryptoJS is not loaded');
    }
    return encodeURIComponent(
      CryptoJS.AES.encrypt(JSON.stringify(data), password).toString()
    );
  }

  /**
   * Generate Safelink URL
   * @param {string} url - Target URL
   * @returns {string} Encrypted Safelink URL
   */
  generateSafelink(url) {
    const baseUrl = this.config.url || window.location.origin;
    const data = {
      url: url,
      countdown: this.config.countdown
    };
    const encrypted = this.encrypt(data, this.config.keyit);
    return `${baseUrl}/${this.config.page}?u=${encrypted}`;
  }

  /**
   * Process all external links on page
   * @returns {Promise<number>} Number of links processed
   */
  async process() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.processedLinks = this._processLinks();
          resolve(this.processedLinks);
        });
      } else {
        this.processedLinks = this._processLinks();
        resolve(this.processedLinks);
      }
    });
  }

  /**
   * Internal method to process links
   * @private
   * @returns {number} Number of links processed
   */
  _processLinks() {
    let count = 0;
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip if link is empty, internal, or already a safelink
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
      }

      try {
        const domain = this.extractDomain(href);
        
        // Skip if domain is not valid or is in blacklist
        if (!domain || this.isBlacklisted(domain)) {
          return;
        }

        // Generate safelink and update href
        const safelink = this.generateSafelink(href);
        link.setAttribute('href', safelink);
        link.setAttribute('data-safelink', 'true');
        count++;
      } catch (e) {
        console.warn('Error processing link:', href, e);
      }
    });

    console.log(`NihLink AutoGenerate v3.0.0: ${count} links encrypted`);
    return count;
  }

  /**
   * Get statistics
   * @returns {Object} Statistics object
   */
  getStats() {
    return {
      processedLinks: this.processedLinks,
      blacklist: this.blacklist,
      config: this.config
    };
  }
}

// Export for use in CommonJS/ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafelinkAutoGenerator;
}

/*
 * EXAMPLE USAGE:
 * 
 * // Initialize with blacklist and config
 * const generator = new SafelinkAutoGenerator(
 *   ['example.com', 'mysite.com'],
 *   {
 *     url: 'https://myblog.blogspot.com',
 *     page: 'p/safelink.html',
 *     keyit: 'MySecretKey',
 *     countdown: true
 *   }
 * );
 * 
 * // Process all external links
 * generator.process().then(count => {
 *   console.log(`Processed ${count} links`);
 *   console.log(generator.getStats());
 * });
 */