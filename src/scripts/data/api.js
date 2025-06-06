import CONFIG from '../config.js';

class API {
  static async _simulateNetworkDelay() {
    if (process.env.NODE_ENV === 'development') {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  static async getAllStories(token, withLocation = false) {
    await this._simulateNetworkDelay();
    const response = await fetch(`${CONFIG.BASE_URL}/stories?location=${withLocation ? 1 : 0}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  }

  static async addStory({ token, description, photo, lat, lon }) {
    await this._simulateNetworkDelay();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat && lon) {
      formData.append('lat', lat);
      formData.append('lon', lon);
    }

    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return response.json();
  }

  static async register({ name, email, password }) {
    await this._simulateNetworkDelay();
    const response = await fetch(`${CONFIG.BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  }

  static async login({ email, password }) {
    await this._simulateNetworkDelay();
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }
}

export default API;