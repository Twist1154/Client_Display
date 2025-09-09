
"use client";

import { useState, useEffect, useRef } from 'react';

type Message = {
  type: 'content' | 'status' | 'emergency';
  payload: any;
  timestamp: number;
};

type UseHapoSocketProps = {
  isRegistered: boolean;
};

export function useRealHapoSocket({ isRegistered }: UseHapoSocketProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (isRegistered) {
      const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

      if (!socketUrl) {
        console.error("WebSocket URL is not defined. Please set NEXT_PUBLIC_WEBSOCKET_URL in your environment.");
        return;
      }

      console.log('Socket: Connecting to', socketUrl);
      ws.current = new WebSocket(socketUrl);

      ws.current.onopen = () => {
        console.log('Socket: Connection established');
        const initialStatusMessage: Message = {
            type: 'status',
            payload: { status: 'online' },
            timestamp: Date.now()
        };
        setMessages([initialStatusMessage]);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Socket: Received message', message);
          setMessages(prev => [...prev, { ...message, timestamp: Date.now() }]);
        } catch (error) {
          console.error('Socket: Error parsing message', error);
        }
      };

      ws.current.onerror = (error) => {
        console.error('Socket: WebSocket error', error);
      };

      ws.current.onclose = () => {
        console.log('Socket: Connection closed');
        const offlineStatusMessage: Message = {
            type: 'status',
            payload: { status: 'offline' },
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, offlineStatusMessage]);
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    } else {
        setMessages([]);
        if (ws.current) {
            ws.current.close();
        }
    }
  }, [isRegistered]);

  return { messages };
}
