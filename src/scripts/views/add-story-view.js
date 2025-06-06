import { getAddStoryTemplate } from '../../templates/pages/add-story-page.js';
import { startWebcam, stopWebcam, capturePhoto } from '../utils/webcam.js';

class AddStoryView {
  render() {
    const main = document.querySelector('#main-content');
    main.innerHTML = getAddStoryTemplate();
  }

  bindCapturePhoto(handler) {
    const button = document.getElementById('capture-btn');
    if (button) {
      button.addEventListener('click', handler);
    }
  }

  bindSubmitStory(handler) {
    const button = document.getElementById('submit-story');
    if (button) {
      button.addEventListener('click', handler);
    }
  }

  getDescription() {
    return document.getElementById('description')?.value.trim() || '';
  }

  getPhotoInput() {
    return document.getElementById('photo-input');
  }

  setPhotoFile(fileList) {
    const photoInput = this.getPhotoInput();
    if (photoInput) {
      photoInput.files = fileList;
    }
  }

  getSubmitButton() {
    return document.getElementById('submit-story');
  }

  showAlert(message) {
    alert(message);
  }


  validateForm() {
    const description = this.getDescription();
    const photoInput = this.getPhotoInput();
    
    if (!description || !photoInput?.files.length) {
      this.showAlert('Please fill all fields and capture a photo');
      return false;
    }
    return true;
  }

  resetForm() {
    const descriptionInput = document.getElementById('description');
    if (descriptionInput) {
      descriptionInput.value = '';
    }
    
    const photoInput = this.getPhotoInput();
    if (photoInput) {
      photoInput.value = '';
    }

    const preview = document.getElementById('photo-preview');
    if (preview) {
      preview.style.display = 'none';
    }
  }

  updatePreview(photoUrl) {
    const preview = document.getElementById('photo-preview');
    if (preview) {
      preview.src = photoUrl;
      preview.style.display = 'block';
    }
  }

  initMap(config, onLocationSelect) {
    const map = L.map('add-story-map').setView(config.DEFAULT_MAP_CENTER, config.DEFAULT_MAP_ZOOM);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
  }

  updateMapMarker(map, marker, position) {
    if (marker) {
      map.removeLayer(marker);
    }

    return L.marker(position).addTo(map)
      .bindPopup(`Location: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`)
      .openPopup();
  }

  showFullPageLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-overlay';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);
  }

  hideFullPageLoading() {
    const loadingDiv = document.querySelector('.loading-overlay');
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  showButtonLoading(button) {
    if (!button) return '';
    
    const originalText = button.innerHTML;
    button.classList.add('button-loading', 'disabled-button');
    const span = document.createElement('span');
    span.textContent = button.textContent;
    button.innerHTML = '';
    button.appendChild(span);
    return originalText;
  }

  hideButtonLoading(button, originalText) {
    if (!button) return;
    
    button.classList.remove('button-loading', 'disabled-button');
    button.innerHTML = originalText;
  }

  async initWebcam(elementId) {
    return await startWebcam(elementId);
  }

  stopWebcam() {
    stopWebcam();
  }

  async captureWebcamPhoto(previewId, photoPreviewId) {
    return await capturePhoto(previewId, photoPreviewId);
  }

  redirectTo(hash) {
    window.location.hash = hash;
  }
}

export default AddStoryView;
