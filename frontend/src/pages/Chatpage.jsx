import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { ChatState } from "../context/chatProvider";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  const { user } = ChatState();

  if (!user) {
    return null;
  }

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer user={user} />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
