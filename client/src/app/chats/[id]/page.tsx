import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";

async function Chat({ params }: { params: { id: string } }) {
  if (params.id.length !== 36) notFound();

  const group: ChatGroupType | null = await fetchChatGroup(params.id);
  if (group === null) notFound();

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id);
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  
  return (
    <div>
      <ChatBase users={users} group={group} oldMessages={chats} />
    </div>
  );
}

export default Chat;
