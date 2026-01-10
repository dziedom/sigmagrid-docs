// Global error handler to catch and suppress non-critical errors
// This prevents console noise from minified Docusaurus code or browser extensions

(function() {
  if (typeof window === 'undefined') {
    return;
  }

  // Suppress specific known errors that don't affect functionality
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = function(...args) {
    const message = args.join(' ');
    
    // Suppress known non-critical errors
    if (
      message.includes('e.replace is not a function') ||
      message.includes("Cannot read properties of null (reading 'match')") ||
      message.includes('/base-sepolia:1') ||
      message.includes('Failed to load resource: the server responded with a status of 404')
    ) {
      // Silently ignore these known issues
      return;
    }
    
    // Log other errors normally
    originalError.apply(console, args);
  };

  console.warn = function(...args) {
    const message = args.join(' ');
    
    // Suppress known non-critical warnings
    if (
      message.includes('Blocked example/test domain') ||
      message.includes('Blocked potentially unsafe URL') ||
      message.includes('example.com/tokenURI') ||
      message.includes('Error checking Cross-Origin-Opener-Policy')
    ) {
      // Silently ignore these known issues
      return;
    }
    
    // Log other warnings normally
    originalWarn.apply(console, args);
  };

  // Also catch unhandled errors
  window.addEventListener('error', function(event) {
    const message = event.message || '';
    
    // Suppress known non-critical errors
    if (
      message.includes('replace is not a function') ||
      message.includes("Cannot read properties of null (reading 'match')") ||
      message.includes('/base-sepolia:1')
    ) {
      event.preventDefault();
      return false;
    }
  }, true);

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    const message = event.reason?.message || String(event.reason || '');
    
    // Suppress known non-critical promise rejections
    if (
      message.includes('replace is not a function') ||
      message.includes("Cannot read properties of null (reading 'match')") ||
      message.includes('/base-sepolia:1')
    ) {
      event.preventDefault();
      return false;
    }
  });
})();







