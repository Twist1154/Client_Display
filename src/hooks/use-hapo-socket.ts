"use client";

import { useState, useEffect, useRef } from 'react';

type SocketStatus = 'online' | 'offline' | 'maintenance';

type Message = {
  type: 'content' | 'status' | 'emergency';
  payload: any;
  timestamp: number;
};

const MOCK_CONTENT = [
  { type: 'image', url: 'https://picsum.photos/1920/1080?random=1', duration: 8000, 'data-ai-hint': 'nature landscape' },
  { type: 'video', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4', duration: 10000, 'data-ai-hint': 'cartoon animation' },
  { type: 'image', url: 'https://picsum.photos/1920/1080?random=2', duration: 8000, 'data-ai-hint': 'city architecture' },
];

const MOCK_EMERGENCY_MESSAGE = "This is a test of the emergency broadcast system. A major storm is approaching the area. Please take shelter immediately. Avoid windows and go to the lowest level of your building. This is not a drill. Repeat, this is not a drill.";

type UseHapoSocketProps = {
  isRegistered: boolean;
};

export function useHapoSocket({ isRegistered }: UseHapoSocketProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRegistered) {
      console.log('Socket: Connecting...');
      
      setMessages([{ type: 'status', payload: { status: 'online' }, timestamp: Date.now() }, { type: 'content', payload: { playlist: MOCK_CONTENT }, timestamp: Date.now() + 1 }]);
      
      messageInterval.current = setInterval(() => {
        const rand = Math.random();
        
        // Only one message per interval
        if (rand < 0.05) { // 5% chance of emergency
          console.log('Socket: Sending emergency message');
          setMessages(prev => [...prev, { type: 'emergency', payload: { content: MOCK_EMERGENCY_MESSAGE }, timestamp: Date.now() }]);
          // Auto-clear after 1 minute in this mock. A real system would send a "clear" event.
          setTimeout(() => setMessages(prev => prev.filter(m => m.type !== 'emergency')), 60000); 
        } else if (rand < 0.1) { // 5% chance of status change
          const newStatus: SocketStatus = Math.random() > 0.5 ? 'maintenance' : 'online';
          console.log(`Socket: Sending status update to ${newStatus}`);
          setMessages(prev => [...prev, { type: 'status', payload: { status: newStatus }, timestamp: Date.now() }]);
        }
      }, 20000); 

    } else {
      if (messageInterval.current) {
        clearInterval(messageInterval.current);
      }
      setMessages([]);
    }

    return () => {
      if (messageInterval.current) {
        clearInterval(messageInterval.current);
      }
    };
  }, [isRegistered]);

  return { messages };
}
