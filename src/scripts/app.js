import '../styles/main.css';
import HomePresenter from './presenter/home-presenter.js';
import AddStoryPresenter from './presenter/add-story-presenter.js';
import LoginPresenter from './presenter/login-presenter.js';
import RegisterPresenter from './presenter/register-presenter.js';
import { initViewTransition } from './utils/view-transition.js';
import { registerServiceWorker } from './utils/sw-register.js'; 
import { subscribePushNotification } from './utils/push-notification.js'; 
import CONFIG from './config.js'; // Import CONFIG

class App {
  constructor() {
    this._homePresenter = new HomePresenter();
    this._addStoryPresenter = new AddStoryPresenter();
    this._loginPresenter = new LoginPresenter();
    this._registerPresenter = new RegisterPresenter();
    
    this._setupNavigation();
    this._renderPage();
    initViewTransition();
    this._registerServiceWorkerAndPush();
  }

  _setupNavigation() {
    window.addEventListener('hashchange', () => {
      this._renderPage();
    });
  }


  _renderPage() {
    const hash = window.location.hash;
    
    switch (hash) {
      case '#/home':
        this._homePresenter.show();
        break;
      case '#/add-story':
        this._addStoryPresenter.show();
        break;
      case '#/login':
        this._loginPresenter.show();
        break;
      case '#/register':
        this._registerPresenter.show();
        break;
      default:
        window.location.hash = '#/home';
        this._homePresenter.show();
    }
  }
  
  _registerServiceWorkerAndPush() { 
    registerServiceWorker().then(async (serviceWorkerRegistration) => {
      if (serviceWorkerRegistration) {
        console.log('Service Worker registered. Attempting to subscribe for push notifications...');
        try {
          await subscribePushNotification(serviceWorkerRegistration, CONFIG.VAPID_PUBLIC_KEY);
          console.log('Push notification subscription successful.');
        } catch (error) {
          console.error('Failed to subscribe to push notifications:', error);
        }
      }
    });
  }
}


new App();