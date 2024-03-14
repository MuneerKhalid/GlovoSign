'use client'

import axios from 'axios'
import { FC, useState } from 'react'

interface MessageFieldProps {
  roomId: string
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
  // let input = ''
  const [input, setInput] = useState<string>('');


  const sendMessage = async (text: string) => {
    await axios.post('/api/message', { text, roomId })
    setInput('');
  }

  return (
    <div className='flex gap-2'>
      type a new message:
      <input
        onChange={({ target }) => setInput(target.value)}
        className='border border-zinc-300'
        type='text'
        value={input}
      />
      <button onClick={() => sendMessage(input || '')}>send</button>
    </div>
  )
}

export default MessageField
