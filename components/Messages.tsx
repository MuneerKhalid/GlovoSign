"use client";
import { pusherClient } from "@/lib/pusher";
import { FC, useEffect, useState } from "react";

interface MessagesProps {
  roomId: string;
}

const Messages: FC<MessagesProps> = ({ roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    const handleIncomingMessage = (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    };

    pusherClient.bind("incoming-message", handleIncomingMessage);

    return () => {
      pusherClient.unsubscribe(roomId);
      pusherClient.unbind("incoming-message", handleIncomingMessage);
    };
  }, [roomId]);

  return (
    <div>
      {/* {initialMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))} */}
      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
};

export default Messages;
