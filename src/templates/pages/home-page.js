export function getHomeTemplate() {
    return `
      <section class="stories">
        <h2 class="stories__title">Recent Stories</h2>
        <div id="stories-container" class="stories__list"></div>
      </section>
      
      <section class="map-section">
        <h2 class="map-section__title">Stories Locations</h2>
        <div id="map" class="map-container"></div>
      </section>
    `;
  }