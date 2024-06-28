// import React from "react";
// import { ChatState } from "../context/chatProvider";
// import Box from "@mui/material/Box";
// import SideDrawer from "../components/miscellaneous/SideDrawer";
// import MyChats from "../components/miscellaneous/MyChats";
// import ChatBox from "../components/miscellaneous/ChatBox";

// export default function ChatPage() {
//   const { user } = ChatState();

//   return (
//     <div style={{ width: "100%" }}>
//       {user && <SideDrawer />}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         width="100%"
//         height="91.5vh"
//         padding="10px"
//       >
//         {user && <MyChats />}
//         {user && <ChatBox />}
//       </Box>
//     </div>
//   );
// }

import React from "react";
import { ChatState } from "../context/chatProvider";
import Box from "@mui/material/Box";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  if (!user) {
    return null; // Or some loading spinner or redirect to login
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
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
