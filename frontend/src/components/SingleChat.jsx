import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getSender, getSenderFull } from "../config/ChatLogic";
import { ChatState } from "../context/chatProvider";
import ProfileModal from "../components/miscellaneous/ProfileModal";
import UpdateGroupChatModal from "../components/miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "../components/ScrollableChat";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleProfileOpen = (user) => {
    setProfileUser(user);
    setProfileModalOpen(true);
  };

  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load the messages", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setMessages([...messages, data]);
        setNewMessage(""); // Clear input after sending
      } catch (error) {
        console.error("Failed to send the message", error);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontSize: { xs: "28px", md: "30px" },
              pb: 3,
              px: 2,
              width: "100%",
              fontFamily: "Work Sans",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f4f4f4",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <IconButton
                  onClick={() =>
                    handleProfileOpen(getSenderFull(user, selectedChat.users))
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bgcolor="#E8E8E8"
            width="100%"
            height="100%"
            sx={{
              overflowY: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? (
              <CircularProgress
                size={80}
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className="messages" style={{ overflowY: "auto" }}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <Box mt={3} display="flex" alignItems="center">
              <TextField
                variant="filled"
                fullWidth
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
                sx={{
                  backgroundColor: "#E0E0E0",
                  borderRadius: "8px",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#E0E0E0",
                    borderRadius: "8px",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
                sx={{
                  ml: 2,
                  padding: "12px 24px",
                  backgroundColor: "#1976d2",
                  ":hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h4" component="div">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
      <ProfileModal
        user={profileUser}
        isOpen={isProfileModalOpen}
        onClose={handleProfileClose}
      />
    </>
  );
};

export default SingleChat;
