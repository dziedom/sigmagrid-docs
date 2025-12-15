// Client module to fix static file links in footer
// This ensures static file links bypass client-side routing

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  // Defensive helper to safely get string values
  function safeString(value) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (typeof value.toString === 'function') return String(value);
    return '';
  }

  // Defensive helper to safely get href
  function safeHref(link) {
    try {
      const href = link.href || link.getAttribute('href');
      return safeString(href);
    } catch (e) {
      console.warn('Error getting href from link:', e);
      return '';
    }
  }

  function fixStaticLinks() {
    // Select all static file links in footer (llms.txt, mcp.json, openapi.json, ai-plugin.json)
    const staticLinks = document.querySelectorAll(
      'footer a[href="/llms.txt"], ' +
      'footer a[href="/mcp.json"], ' +
      'footer a[href="/openapi.json"], ' +
      'footer a[href="/.well-known/ai-plugin.json"]'
    );
    
    staticLinks.forEach((link) => {
      // Skip if already processed (check for data attribute)
      if (link.dataset.staticLinkFixed) {
        return;
      }
      
      // Remove target="_blank" if it was set, we want same tab
      link.removeAttribute('target');
      link.setAttribute('rel', '');
      
      // Mark as processed to avoid duplicate handlers
      link.dataset.staticLinkFixed = 'true';
      
      // Add click handler to force full page navigation
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Use href property to get the actual resolved URL
        const href = safeHref(link);
        if (href) {
          window.location.href = href;
        }
        return false;
      }, true); // Use capture phase to intercept early
    });
  }

  // Run immediately and multiple times to catch React re-renders
  fixStaticLinks();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixStaticLinks);
  } else {
    fixStaticLinks();
  }

  // Run after React hydration (Docusaurus uses React)
  setTimeout(fixStaticLinks, 100);
  setTimeout(fixStaticLinks, 500);
  setTimeout(fixStaticLinks, 1000);
  
  // Use MutationObserver to catch dynamic changes
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      fixStaticLinks();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
})();

