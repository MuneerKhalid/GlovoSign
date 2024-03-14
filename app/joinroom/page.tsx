"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  const [roomIdInput, setRoomIdInput] = useState("");

  const router = useRouter();

  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter Room Id"
        className="input-field mt-3"
        onChange={(e) => setRoomIdInput(e.target.value)}
        value={roomIdInput}
      />

      <Button onClick={() => joinRoom(roomIdInput)} size="lg" className=" text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto mt-5 sm:mb-0">Join Room</Button>
    </div>
  );
};

export default page;
