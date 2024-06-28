import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";

const SideDrawer = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const history = useHistory();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = () => {
    setProfileModalOpen(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0", // Background color matching your UI
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow matching your UI
      }}
    >
      {/* Left Section - Search Users */}
      <Tooltip title="Search users" placement="bottom-end">
        <IconButton onClick={() => {}} sx={{ mr: 1 }}>
          <SearchIcon sx={{ color: "#000000" }} />{" "}
          {/* Adjust color as needed */}
          <Typography sx={{ ml: 1, color: "#000000" }}>
            Search User
          </Typography>{" "}
          {/* Adjust color as needed */}
        </IconButton>
      </Tooltip>

      {/* Center Section - Chat-Wave */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
          color: "#000000",
        }}
      >
        {" "}
        {/* Adjust size and color as needed */}
        Chat-Wave
      </Typography>

      {/* Right Section - Avatar, Bell Icon, and Profile Menu */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={user?.name || "User Avatar"}
          src={
            user?.picture ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          sx={{ cursor: "pointer", width: 40, height: 40, ml: 2 }}
          onClick={handleAvatarClick}
          aria-controls="avatar-menu"
          aria-haspopup="true"
        />
        <Menu
          id="avatar-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileOpen}>My Profile</MenuItem>
          <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
        <IconButton sx={{ ml: 2, color: "#000000" }}>
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
        <ProfileModal
          user={user}
          isOpen={isProfileModalOpen}
          onClose={handleProfileClose}
        />
      </Box>
    </Box>
  );
};

export default SideDrawer;
