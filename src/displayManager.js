export class DisplayManager {
  constructor() {
    this.contentElement = null;
  }

  render() {
    this.contentElement = document.getElementById('content');
    if (!this.contentElement) {
      throw new Error('Content element not found');
    }

    this.displayWelcomeMessage();
  }

  displayWelcomeMessage() {
    this.contentElement.innerHTML = `
      <div class="welcome-container">
        <h2>Welcome to Client Display</h2>
        <p>The application is running successfully!</p>
        <div class="status">
          <span class="status-indicator active"></span>
          <span>System Status: Active</span>
        </div>
      </div>
    `;
  }

  updateContent(content) {
    if (this.contentElement) {
      this.contentElement.innerHTML = content;
    }
  }
}
