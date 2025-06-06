export function initViewTransition() {
    if (!document.startViewTransition) {
      document.startViewTransition = (callback) => {
        callback();
        return {
          ready: Promise.resolve(),
        };
      };
    }
  }
  
  export function navigateWithTransition(url) {
    document.startViewTransition(() => {
      window.location.href = url;
    });
  }