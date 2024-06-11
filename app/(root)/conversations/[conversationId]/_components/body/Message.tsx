import React from "react";

type Props = {
  fromCurrentUser: boolean;
  senderImage: string;
  senderName: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
};

const Message = ({  }: Props) => {
  return <div>Message</div>;
};

export default Message;
