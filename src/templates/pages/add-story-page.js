export function getAddStoryTemplate() {
    return `
      <section class="add-story">
        <h2 class="add-story__title">Add New Story</h2>
        
        <form id="add-story-form" class="add-story__form">
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          
          <div class="form-group">
            <label>Take Photo</label>
            <div class="camera-container">
              <video id="webcam-preview" class="camera-preview" autoplay playsinline></video>
              <button type="button" id="capture-btn" class="capture-btn">Capture</button>
            </div>
            <img id="photo-preview" class="photo-preview" alt="Captured photo preview">
            <input type="file" id="photo-input" accept="image/*" hidden>
          </div>
          
          <div class="form-group">
            <label>Select Location (click on map)</label>
            <div id="add-story-map" class="map-container"></div>
          </div>
          
          <button type="button" id="submit-story" class="submit-btn">Submit Story</button>
        </form>
      </section>
    `;
  }