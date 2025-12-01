// Client module to fix static file links in footer
// This ensures /llms.txt and /mcp.json links bypass client-side routing

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  function fixStaticLinks() {
    const staticLinks = document.querySelectorAll('footer a[href="/llms.txt"], footer a[href="/mcp.json"]');
    
    staticLinks.forEach((link) => {
      // Set target to _self to force same-tab navigation, bypassing router
      link.setAttribute('target', '_self');
      link.setAttribute('rel', '');
      
      // Remove target="_blank" if it was set, we want same tab
      link.removeAttribute('target');
      
      // Add click handler to force full page navigation
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = link.getAttribute('href');
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

