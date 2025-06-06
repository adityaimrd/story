import HomeView from '../views/home-view.js'; 
import API from '../data/api.js'; 
import CONFIG from '../config.js'; 
import storyDb from '../data/story-db.js'; 

class HomePresenter {
  constructor() {
    this._view = new HomeView(); //
    this._map = null; //
    this._markers = []; //
  }

  async show() {
    const token = localStorage.getItem('token'); //
    if (!token) { //
      window.location.hash = '#/login'; //
      return; //
    }

    let stories = []; //

    try {
      stories = await storyDb.getAllStories(); //
      if (stories.length > 0) { //
        console.log('Stories loaded from IndexedDB.'); //
        this._view.render(stories); //
        this._initMap(); //
        this._markers = this._view.updateMarkers(this._map, this._markers, stories); //
      } else {
        console.log('No stories in IndexedDB, fetching from API...'); //
      }

      const { error, message, listStory } = await API.getAllStories(token, true); //
      
      if (error) { //
        throw new Error(message); //
      }

      await storyDb.clearStories(); //
      for (const story of listStory) { //
        await storyDb.putStory(story); //
      }
      stories = listStory; //
      console.log('Stories updated from API and saved to IndexedDB.'); //

      this._view.render(stories); //
      this._initMap(); //
      this._markers = this._view.updateMarkers(this._map, this._markers, stories); //

    } catch (error) {
      console.error('Error fetching or storing stories:', error); 
      if (stories.length === 0) { //
        this._view.showError(error.message); //
      }
    }
  }

  _initMap() {
    if (!this._map) { //
      this._map = this._view.initMap(CONFIG); //
    }
  }
}

export default HomePresenter;