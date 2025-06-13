
import HomeView from '../views/home-view.js';
import API from '../data/api.js';
import CONFIG from '../config.js';
import storyDb from '../data/story-db.js';

class HomePresenter {
  constructor() {
    this._view = new HomeView();
    this._map = null;
    this._markers = [];
    this._stories = []; 
    this._setupEventListeners();
  }

  async show() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    try {
      const { error, message, listStory } = await API.getAllStories(token, true);
      
      if (error) {
        throw new Error(message);
      }
      this._stories = listStory; 
      this._view.render(this._stories); 
      this._initMap();
      this._markers = this._view.updateMarkers(this._map, this._markers, this._stories);
      

    } catch (error) {
      console.error('Error fetching stories:', error);
      try {
        const storiesFromDb = await storyDb.getAllStories();
        if (storiesFromDb.length > 0) {
          console.log('Error fetching from API, loading stories from IndexedDB fallback.');
          this._stories = storiesFromDb;
          this._view.render(this._stories); //
          this._initMap();
          this._markers = this._view.updateMarkers(this._map, this._markers, this._stories);
          this._view.showAlert(`Could not load new stories. Showing offline data. Error: ${error.message}`);
        } else {
          this._view.showError(error.message); //
        }
        this._setupEventListeners();
      } catch (dbError) {
        console.error('Error fetching stories from IndexedDB fallback:', dbError);
        this._view.showError(`Failed to load stories: ${error.message} (also failed to load from offline storage).`);
      }
    }
  }

  _initMap() {
    if (!this._map) {
      this._map = this._view.initMap(CONFIG);
    }
  }

  _setupEventListeners() {
    this._view.bindSaveStory(async (storyId, buttonElement) => {
      try {
        const storyToSave = this._stories.find(story => story.id === storyId);
        if (storyToSave) {
          await storyDb.putStory(storyToSave); //
          this._view.showAlert('Story saved successfully!'); //
          buttonElement.innerText = 'Saved'; //
          buttonElement.disabled = true; //
          buttonElement.classList.add('saved'); //
        }
      } catch (error) {
        console.error('Error saving story to IndexedDB:', error); //
        this._view.showAlert(`Failed to save story: ${error.message}`); //
      }
    });
  }
}

export default HomePresenter;