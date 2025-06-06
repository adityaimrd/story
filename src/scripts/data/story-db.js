import { openDB } from 'idb'; //

const DATABASE_NAME = 'dicoding-story-app-db'; //
const DATABASE_VERSION = 1; //
const OBJECT_STORE_NAME = 'stories'; //

const storyDb = {
  async init() {
    return openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' }); //
      },
    });
  },

  async getStory(id) {
    const db = await this.init(); //
    return db.get(OBJECT_STORE_NAME, id); //
  },

  async getAllStories() {
    const db = await this.init(); //
    return db.getAll(OBJECT_STORE_NAME); //
  },

  async putStory(story) {
    const db = await this.init(); //
    return db.put(OBJECT_STORE_NAME, story); //
  },

  async deleteStory(id) {
    const db = await this.init(); //
    return db.delete(OBJECT_STORE_NAME, id); //
  },

  async clearStories() {
    const db = await this.init(); //
    return db.clear(OBJECT_STORE_NAME); //
  },
};

export default storyDb;