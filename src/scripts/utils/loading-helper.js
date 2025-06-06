class LoadingHelper {
    static showFullPageLoading() {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading-overlay';
      loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
      document.body.appendChild(loadingDiv);
    }
  
    static hideFullPageLoading() {
      const loadingDiv = document.querySelector('.loading-overlay');
      if (loadingDiv) {
        loadingDiv.remove();
      }
    }
  
    static showButtonLoading(button) {
      button.classList.add('button-loading', 'disabled-button');
      const span = document.createElement('span');
      span.textContent = button.textContent;
      button.innerHTML = '';
      button.appendChild(span);
    }
  
    static hideButtonLoading(button, originalText) {
      button.classList.remove('button-loading', 'disabled-button');
      button.innerHTML = originalText;
    }
  }
  
  export default LoadingHelper;