import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        "&:hover": {
          backgroundColor: "#38B2AC",
          color: "white",
        },
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        paddingX: 3,
        paddingY: 2,
        marginBottom: 2,
        borderRadius: 1,
      }}
    >
      <Avatar sx={{ marginRight: 2 }} alt={user.name} src={user.pic} />
      <Box>
        <Typography>{user.name}</Typography>
        <Typography variant="body2">
          <b>Email:</b> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
