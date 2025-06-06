import { getHomeTemplate } from '../../templates/pages/home-page.js'; //
import { getStoryItemTemplate } from '../utils/story-item.js'; //
import storyDb from '../data/story-db.js'; // Tambahkan ini

class HomeView {
  render(stories = []) {
    const main = document.querySelector('#main-content'); //
    main.innerHTML = getHomeTemplate(); //
    
    const storiesContainer = document.getElementById('stories-container'); //
    const mapContainer = document.getElementById('map'); //
    
    storiesContainer.innerHTML = ''; //
    mapContainer.innerHTML = ''; //
    
    if (stories.length === 0) { //
      storiesContainer.innerHTML = '<p class="empty-message">No stories found. Be the first to share!</p>'; //
      return; //
    }
    
    stories.forEach(story => { //
      storiesContainer.innerHTML += getStoryItemTemplate(story); //
    });
  }

  showError(message) {
    const main = document.querySelector('#main-content'); //
    main.innerHTML = `
      <div class="error-message">
        <h2>Error</h2>
        <p>${message}</p>
        <a href="#/home">Try again</a>
      </div>
    `;
  }

  getPopupTemplate(story) {
    return `
      <div class="popup-content">
        <img src="${story.photoUrl}" alt="${story.name}'s story" width="100">
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <small>Posted: ${new Date(story.createdAt).toLocaleDateString()}</small>
        <p>Location: ${story.lat}, ${story.lon}</p>
      </div>
    `;
  }

  initMap(config) {
    const map = L.map('map').setView(config.DEFAULT_MAP_CENTER, config.DEFAULT_MAP_ZOOM); //
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    return map;
  }

  updateMarkers(map, currentMarkers, stories) {
    // Remove existing markers
    currentMarkers.forEach(marker => map.removeLayer(marker)); //
    const newMarkers = []; //

    // Add new markers
    stories.forEach(story => { //
      if (story.lat && story.lon) { //
        const popupContent = this.getPopupTemplate(story); //
        const marker = L.marker([story.lat, story.lon]) //
          .addTo(map) //
          .bindPopup(popupContent); //
        newMarkers.push(marker); //
      }
    });

    return newMarkers; //
  }

  // Tambahkan metode untuk menghapus semua cerita dari IndexedDB
  async clearAllStoriesFromDb() {
    try {
      await storyDb.clearStories(); //
      this.showAlert('All stories cleared from local storage.'); //
      window.location.hash = '#/home'; // Reload page to reflect changes
    } catch (error) {
      this.showAlert(`Failed to clear stories: ${error.message}`); //
      console.error('Error clearing IndexedDB:', error); //
    }
  }

  showAlert(message) { 
    alert(message); //
  }
}

export default HomeView;