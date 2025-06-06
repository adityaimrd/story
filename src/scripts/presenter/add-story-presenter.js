import AddStoryView from '../views/add-story-view.js';
import API from '../data/api.js';
import CONFIG from '../config.js';

class AddStoryPresenter {
  constructor() {
    this._view = new AddStoryView();
    this._map = null;
    this._marker = null;
    this._position = null;
    this._onHashChange = this._onHashChange.bind(this);
  }

  async show() {
    const token = localStorage.getItem('token');
    if (!token) {
      this._view.redirectTo('#/login');
      return;
    }

    this._view.render();
    this._initMap();
    this._setupEventListeners();
    try {
      await this._view.initWebcam('webcam-preview');
    } catch (error) {
      this._view.showAlert('Could not access camera. Please ensure you have granted camera permissions and have a working camera connected.');
    }

    window.addEventListener('hashchange', this._onHashChange);
  }

  _onHashChange() {
    if (window.location.hash !== '#/add-story') {
      this._view.stopWebcam();
      window.removeEventListener('hashchange', this._onHashChange);
    }
  }

  _initMap() {
    if (!this._map) {
      this._map = this._view.initMap(CONFIG);
      
      this._map.on('click', (e) => {
        this._position = e.latlng;
        this._marker = this._view.updateMapMarker(this._map, this._marker, e.latlng);
      });
    }
  }

  _setupEventListeners() {
    this._view.bindCapturePhoto(async () => {
      try {
        const photo = await this._view.captureWebcamPhoto('webcam-preview', 'photo-preview');
        if (!photo || !photo.length) {
          throw new Error('Failed to capture photo');
        }
        this._view.setPhotoFile(photo);
        this._view.updatePreview(URL.createObjectURL(photo[0]));
      } catch (error) {
        this._view.showAlert('Failed to capture photo. Please ensure your camera is working and you have granted permissions.');
        console.error('Photo capture error:', error);
      }
    });

    this._view.bindSubmitStory(async () => {
      if (!this._view.validateForm()) {
        return;
      }

      const submitButton = this._view.getSubmitButton();
      const originalText = this._view.showButtonLoading(submitButton);

      try {
        const token = localStorage.getItem('token');
        const response = await API.addStory({
          token,
          description: this._view.getDescription(),
          photo: this._view.getPhotoInput().files[0],
          lat: this._position?.lat,
          lon: this._position?.lng,
        });

        if (response.error) {
          throw new Error(response.message);
        }

        this._view.showAlert('Story added successfully!');
        this._view.resetForm();
        this._view.stopWebcam();
        window.removeEventListener('hashchange', this._onHashChange);
        this._view.redirectTo('#/home');
      } catch (error) {
        this._view.showAlert(`Failed to add story: ${error.message}`);
      } finally {
        this._view.hideButtonLoading(submitButton, originalText);
      }
    });
  }
}

export default AddStoryPresenter;
