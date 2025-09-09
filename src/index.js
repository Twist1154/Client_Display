import './style.css';
import { DisplayManager } from './displayManager.js';

class App {
  constructor() {
    this.displayManager = new DisplayManager();
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.displayManager.render();
    });
  }
}

// Initialize the application
new App();
