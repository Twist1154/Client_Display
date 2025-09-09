# **App Name**: Hapo Display

## Core Features:

- Screen Code Generation: Generates a unique 20-character alphanumeric code for screen registration.
- Admin Registration: Enables screen registration via a web-based admin panel.
- REST API Connection: Connects to backend REST endpoints for authentication and screen pairing.
- WebSocket Connection: Establishes real-time communication with the backend via WebSockets.
- Content Rendering: Displays content received from WebSocket subscriptions.
- Error Handling: Handles pairing errors and manages WebSocket reconnections.
- Emergency Message Tool: Subscribes to an emergency broadcast topic and displays incoming messages prominently; the server may use reasoning to decide when to include details about the individual screen or its assigned broadcast groups.
- Android TV Compatibility: Supports Android TV features, including DPAD navigation and Leanback launcher integration.
- Video Playback: Plays video content using react-native-video.
- Image Caching: Caches images for offline use and faster loading with react-native-fast-image.
- Offline Caching: Caches content for offline playback using react-native-fs or expo-file-system.
- TV Navigation: Manages TV navigation and focus using react-native-tvos.
- Secure Storage: Stores JWT tokens securely using expo-secure-store.

## Style Guidelines:

- Primary color: Light teal (#99e2d0) to convey a sense of calm and clarity, suitable for long viewing periods on digital displays.
- Background color: Dark gray (#333333) for high contrast and reduced eye strain in various lighting conditions.
- Accent color: Warm orange (#ffbb5e) to highlight interactive elements and important notifications, providing a gentle visual cue without overwhelming the user.
- Body and headline font: 'PT Sans', a humanist sans-serif that combines a modern look and a little warmth or personality.
- Use a set of simple, outlined icons for intuitive navigation.
- A clean and grid-based layout, with emphasis on clear, legible typography.
- Subtle transitions and animations to provide a polished user experience without being distracting.
- Success: #32CD32 (Lime Green)  Status ONLINE
- Error: #FF4500 (OrangeRed)   Errors, offline, emergency states
- Maintenance: #FFD700 (Gold)  MAINTENANCE status
- Emergency: #FF0000 / #FFFFFF   Emergency alert overlay (background/text)
- Layout: Clean, grid-based layout for clear hierarchy.
- Icons: Simple, outlined icons for intuitive TV navigation.
- Animations: Subtle transitions for playlists, alerts, and focus changes; avoid distracting effects.
- Focus management: Highlight currently selected element clearly for DPAD navigation.
- Overlay panels: Semi-transparent overlays for text on video/image content (e.g., rgba(0,0,0,0.5)).