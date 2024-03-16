'use client'

import axios from 'axios'
import { FC, useState } from 'react'

interface MessageFieldProps {
  roomId: string
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (text: string) => {
    const res = await axios.post('/api/message', { text, roomId })

    if(res){
      setInput("");
    }
  }

  return (
    <div className='flex gap-2'>
      type a new message:
      <input
        onChange={( e ) => setInput(e.target.value)}
        className='border border-zinc-300'
        type='text'
        value={input}
      />
      <button onClick={() => sendMessage(input || '')}>send</button>
    </div>
  )
}

export default MessageField
