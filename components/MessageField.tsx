'use client'

import axios from 'axios'
import { FC, useState } from 'react'

interface MessageFieldProps {
  roomId: string
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
  const [input, setInput] = useState<string>('');

  const sendMessage = async (text: string) => {
    await axios.post('/api/message', { text, roomId });
    // Clear the input field after the message is sent
    setInput('');
  };

  const handleSendClick = () => {
    // Ensure that input has a value before sending the message
    if (input.trim() !== '') {
      sendMessage(input);
    }
  };

  return (
    <div className='flex gap-2'>
      Type a new message:
      <input
        onChange={(e) => setInput(e.target.value)}
        className='border border-zinc-300'
        type='text'
        value={input}
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default MessageField;
