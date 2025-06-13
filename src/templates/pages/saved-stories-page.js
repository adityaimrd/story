// PA-interm/src/templates/pages/saved-stories-page.js
export function getSavedStoriesTemplate() {
  return `
    <section class="saved-stories">
      <h2 class="saved-stories__title">Your Saved Stories</h2>
      <div id="saved-stories-container" class="stories__list">
        <p class="empty-message">No saved stories found. Save some stories to view them here!</p>
      </div>
    </section>
  `;
}