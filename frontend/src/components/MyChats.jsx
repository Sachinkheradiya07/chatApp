import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Add as AddIcon } from "@mui/icons-material";
import { ChatState } from "../context/chatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <Box
      display={{ xs: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      padding={3}
      bgcolor="white"
      width={{ xs: "100%", md: "31%" }}
      borderRadius="lg"
      border="1px solid #000"
    >
      <Box
        paddingBottom={3}
        paddingLeft={3}
        fontSize={{ xs: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">My Chats</Typography>
        <GroupChatModal>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ fontSize: { xs: "17px", md: "10px", lg: "17px" } }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        padding={3}
        bgcolor="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : chats && chats.length > 0 ? (
          chats.map((chat) => (
            <Box
              key={chat._id}
              onClick={() => handleChatClick(chat)}
              cursor="pointer"
              bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              paddingX={3}
              paddingY={2}
              borderRadius="lg"
              marginBottom={2}
            >
              <Typography variant="body1">
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </Typography>
              {chat.latestMessage && (
                <Typography variant="caption">
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </Typography>
              )}
            </Box>
          ))
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
