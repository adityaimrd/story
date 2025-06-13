export function getStoryItemTemplate(story, isSaved = false) {
    return `
      <article class="story-item">
        <img src="${story.photoUrl}" alt="${story.name}'s story" class="story-item__image">
        <div class="story-item__content">
          <h3 class="story-item__name">${story.name}</h3>
          <p class="story-item__description">${story.description}</p>
          <time class="story-item__date">${new Date(story.createdAt).toLocaleDateString()}</time>
          ${story.lat && story.lon ? `
            <div class="story-item__location">
              <small>Location: ${story.lat.toFixed(4)}, ${story.lon.toFixed(4)}</small>
            </div>
          ` : ''}
          <div class="story-item__actions">
            ${isSaved ? `
              <button class="save-story-btn saved" data-id="${story.id}" disabled>Saved</button>
            ` : `
              <button class="save-story-btn" data-id="${story.id}">Save Story</button>
            `}
          </div>
        </div> </article>
    `;
  }