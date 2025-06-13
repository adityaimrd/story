import { getSavedStoriesTemplate } from '../../templates/pages/saved-stories-page.js';
import { getStoryItemTemplate } from '../utils/story-item.js';

class SavedStoriesView {
  render(stories = []) {
    const main = document.querySelector('#main-content');
    main.innerHTML = getSavedStoriesTemplate();

    const savedStoriesContainer = document.getElementById('saved-stories-container');
    savedStoriesContainer.innerHTML = ''; 

    if (stories.length === 0) {
      savedStoriesContainer.innerHTML = '<p class="empty-message">No saved stories found. Save some stories to view them here!</p>';
      return;
    }

    stories.forEach(story => {
      
      savedStoriesContainer.innerHTML += `
        <div class="story-item-wrapper">
        ${getStoryItemTemplate(story, true)} <button class="delete-saved-story-btn" data-id="${story.id}">Delete</button> 
        </div>
      `;
    });
  }

  bindDeleteSavedStory(handler) {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-saved-story-btn')) {
        const storyId = event.target.dataset.id;
        handler(storyId);
      }
    });
  }

  showAlert(message) {
    alert(message);
  }
}

export default SavedStoriesView;