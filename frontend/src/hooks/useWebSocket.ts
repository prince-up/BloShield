import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data: any;
}

type MessageHandler = (message: WebSocketMessage) => void;

export const useWebSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const handlers = useRef<Map<string, MessageHandler[]>>(new Map());

  useEffect(() => {
    // Ensure we're using the correct protocol
    const wsUrl = url.startsWith('ws') ? url : `ws://${window.location.hostname}:8000/ws`;
    
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        
        // Call all handlers for this message type
        const typeHandlers = handlers.current.get(message.type) || [];
        typeHandlers.forEach(handler => {
          try {
            handler(message);
          } catch (e) {
            console.error(`Error handling message type ${message.type}:`, e);
          }
        });
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        // Reconnection logic could be added here
      }, 3000);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [url]);

  const subscribe = useCallback((messageType: string, handler: MessageHandler) => {
    if (!handlers.current.has(messageType)) {
      handlers.current.set(messageType, []);
    }
    handlers.current.get(messageType)?.push(handler);

    // Return unsubscribe function
    return () => {
      const typeHandlers = handlers.current.get(messageType) || [];
      const index = typeHandlers.indexOf(handler);
      if (index > -1) {
        typeHandlers.splice(index, 1);
      }
    };
  }, []);

  const send = useCallback((message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { isConnected, subscribe, send };
};
