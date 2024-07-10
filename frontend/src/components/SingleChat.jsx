import React, { useState } from "react";
import { ChatState } from "../context/chatProvider";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getSender, getSenderFull } from "../config/ChatLogic";
import ProfileModal from "../components/miscellaneous/ProfileModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [profileUser, setProfileUser] = useState(null);

  const handleProfileOpen = (user) => {
    setProfileUser(user);
    setProfileModalOpen(true);
  };

  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

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
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: { xs: "space-between" },
              alignItems: "center",
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
                {/* <UpdateGroupChatModal
                  fetchMessages={fetchAgain}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                /> */}
              </>
            )}
          </Typography>
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
