import { DisplayManager } from '../src/displayManager.js';

describe('DisplayManager', () => {
  let displayManager;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = `
      <div id="content"></div>
    `;
    displayManager = new DisplayManager();
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
  });

  test('should create DisplayManager instance', () => {
    expect(displayManager).toBeInstanceOf(DisplayManager);
  });

  test('should render welcome message', () => {
    displayManager.render();
    const contentElement = document.getElementById('content');
    expect(contentElement.innerHTML).toContain('Welcome to Client Display');
    expect(contentElement.innerHTML).toContain('System Status: Active');
  });

  test('should throw error when content element not found', () => {
    document.body.innerHTML = '';
    expect(() => displayManager.render()).toThrow('Content element not found');
  });

  test('should update content', () => {
    displayManager.render();
    const newContent = '<p>New content</p>';
    displayManager.updateContent(newContent);
    const contentElement = document.getElementById('content');
    expect(contentElement.innerHTML).toBe(newContent);
  });
});