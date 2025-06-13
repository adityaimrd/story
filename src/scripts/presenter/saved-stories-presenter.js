import SavedStoriesView from '../views/saved-stories-view.js';
import storyDb from '../data/story-db.js';

class SavedStoriesPresenter {
  constructor() {
    this._view = new SavedStoriesView();
    this._setupEventListeners();
  }

  async show() {
    try {
      const savedStories = await storyDb.getAllStories();
      this._view.render(savedStories);
    } catch (error) {
      console.error('Error fetching saved stories:', error);
      this._view.showAlert(`Failed to load saved stories: ${error.message}`);
    }
  }

  _setupEventListeners() {
    this._view.bindDeleteSavedStory(async (id) => {
      if (confirm('Are you sure you want to delete this saved story?')) {
        try {
          await storyDb.deleteStory(id);
          this._view.showAlert('Story deleted from saved list!');
          this.show(); 
        } catch (error) {
          console.error('Error deleting story from IndexedDB:', error);
          this._view.showAlert(`Failed to delete story: ${error.message}`);
        }
      }
    });
  }
}

export default SavedStoriesPresenter;