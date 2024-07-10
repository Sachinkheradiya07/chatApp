import React from "react";
import Box from "@mui/material/Box";
import SingleChat from "../SingleChat";
import { ChatState } from "../../context/chatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ xs: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      padding={3}
      bgcolor="white"
      width={{ xs: "100%", md: "61%" }}
      borderRadius="lg"
      border={1}
      borderColor="grey.300"
      margin={{ xs: "0 auto", md: "inherit" }}
      boxShadow={{ xs: 2, md: 3 }}
      sx={{
        transition: "all 0.3s ease-in-out",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
