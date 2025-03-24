"use client";

import { getSocket } from "@/lib/socket.config";
import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

function ChatBase({
  group,
  users,
  oldMessages
}: {
  group: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
 
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if(data){
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  },[group.id])

  return (
    <div className="flex ">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}
        <Chats group={group} oldMessages={oldMessages} chatUser={chatUser}/>
      </div>
    </div>
  );
}

export default ChatBase;
