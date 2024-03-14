import MessageField from '@/components/MessageField'
import Messages from '@/components/Messages'

interface PageProps {
  params: {
    roomId: string
  }
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params
  // const existingMessages = await db.message.findMany({
  //   where: {
  //     chatRoomId: roomId,
  //   },
  // })

  // const serializedMessages = existingMessages.map((message) => ({
  //   text: message.text,
  //   id: message.id,
  // }))

  return (
    <div>
      <p>messages:</p>
      <Messages roomId={roomId} />
      <MessageField roomId={roomId} />
    </div>
  )
}

export default page
