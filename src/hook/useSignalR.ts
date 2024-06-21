import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

interface Message {
  user: string;
  message: string;
}

const useSignalR = (userId: string | null, userType: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const hubUrl = `https://api-pnv.bluejaypos.vn/signalr_chat.html?userId=${userId}&userType=${userType}`;

    const connect = async () => {
      if (!userId) return; 

      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      newConnection.on('ReceiveMessage', (user: string, message: string) => {
        setMessages(prevMessages => [...prevMessages, { user, message }]);
      });

      try {
        await newConnection.start();
        console.log('SignalR Connected.');
        setConnection(newConnection);
        connectionRef.current = newConnection;
      } catch (error) {
        console.error('SignalR Connection Error: ', error);
      }
    };

    connect();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().then(() => {
          console.log('SignalR Connection stopped.');
          setConnection(null);
        }).catch(err => console.error('Error stopping SignalR connection:', err));
      }
    };
  }, [userId, userType]);

  const sendMessage = async (message: string) => {
    if (!connection) {
      console.error('Cannot send message: SignalR connection not established.');
      return;
    }

    try {
      await connection.invoke('SendMessage', userId!, message);
      console.log('Message sent successfully:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return { connection, messages, sendMessage };
};

export default useSignalR;
