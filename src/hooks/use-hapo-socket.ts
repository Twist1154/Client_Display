"use client";

import { useState, useEffect, useRef } from 'react';

type SocketStatus = 'online' | 'offline' | 'maintenance';

type Message = {
  type: 'content' | 'status' | 'emergency';
  payload: any;
  timestamp: number;
};

type UseHapoSocketProps = {
  isRegistered: boolean;
};

export function useHapoSocket({ isRegistered }: UseHapoSocketProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRegistered) {
      console.log('Socket: Connecting...');
      
      // Send initial online status and an empty playlist
      setMessages([
        { type: 'status', payload: { status: 'online' }, timestamp: Date.now() },
        { type: 'content', payload: { playlist: [] }, timestamp: Date.now() + 1 }
      ]);
      
      // This interval can be used to simulate future messages from a real backend
      messageInterval.current = setInterval(() => {
        // Example: simulate a status change
        const rand = Math.random();
        if (rand < 0.1) { // 10% chance of status change
          const newStatus: SocketStatus = Math.random() > 0.5 ? 'maintenance' : 'online';
          console.log(`Socket: Sending status update to ${newStatus}`);
          setMessages(prev => [...prev, { type: 'status', payload: { status: newStatus }, timestamp: Date.now() }]);
        }
      }, 30000); // Check every 30 seconds

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
