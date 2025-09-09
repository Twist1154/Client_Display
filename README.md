# Hapo Display - Digital Signage Screen

This is a Next.js-based application designed to function as a client for a digital signage system. It can register itself with a content management system, display a playlist of images and videos, and show full-screen emergency alerts.

## Features

- **Device Registration**: On first launch, the screen displays a unique code to be registered in a central admin panel.
- **Content Playback**: Once registered, it plays a loop of images and videos defined in a playlist. It currently supports image and video content types.
- **Emergency Alerts**: The application can receive and display full-screen, high-priority emergency messages that overlay any playing content. These messages are summarized by an AI flow for conciseness.
- **Status Monitoring**: The screen reports its status (Online, Offline, Maintenance) and provides a side menu with detailed device information.
- **Persistent State**: Registration status is saved in the browser's local storage.

## Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **UI**: React, ShadCN UI, Tailwind CSS
- **AI**: Genkit for summarizing emergency messages.
- **Styling**: Tailwind CSS with CSS Variables for theming.
- **Icons**: Lucide React

## Getting Started

To get started, run the development server:

```bash
npm run dev
```

The application will start on `http://localhost:9002`.

### Key Components

- `src/app/page.tsx`: The main entry point of the application, managing state for registration, content, and emergencies.
- `src/components/hapo/`: Contains all the major UI components for the application, including:
    - `RegistrationScreen.tsx`: The screen for device pairing.
    - `ContentScreen.tsx`: The screen that displays the content playlist.
    - `EmergencyOverlay.tsx`: The overlay for critical alerts.
    - `SideMenu.tsx`: A slide-out panel for device status and actions.
- `src/hooks/use-hapo-socket.ts`: A custom hook that simulates a WebSocket connection for receiving content, status, and emergency messages from a server.
- `src/ai/flows/emergency-message-summarization.ts`: A Genkit flow that uses an AI model to summarize long emergency messages.
