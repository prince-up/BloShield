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
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        // Use environment variable for WebSocket URL
        const defaultWsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';
        const wsUrl = url.startsWith('ws') ? url : defaultWsUrl;
        
        console.log('Attempting to connect to WebSocket:', wsUrl);
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          console.log('WebSocket connected successfully');
          setIsConnected(true);
          reconnectAttempts.current = 0; // Reset on successful connection
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

        socket.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason);
          setIsConnected(false);
          
          // Attempt to reconnect if we haven't exceeded max attempts
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current++;
            console.log(`Reconnecting... (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);
            setTimeout(connectWebSocket, 3000);
          }
        };

        socket.onerror = (error) => {
          console.error('WebSocket error - make sure backend is running on port 8000:', error);
          setIsConnected(false);
        };

        ws.current = socket;
      } catch (error) {
        console.error('Failed to create WebSocket:', error);
        setIsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
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
