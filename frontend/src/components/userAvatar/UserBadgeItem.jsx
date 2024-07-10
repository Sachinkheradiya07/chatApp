import React from "react";
import { Chip } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Chip
      label={
        <span>
          {user.name}
          {admin === user._id && <span> (Admin)</span>}
        </span>
      }
      onDelete={handleFunction}
      deleteIcon={<CloseIcon />}
      color="primary"
      sx={{ margin: 1, fontSize: 12, padding: "0 4px", borderRadius: "16px" }}
    />
  );
};

export default UserBadgeItem;
