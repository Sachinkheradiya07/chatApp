import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";

const SideDrawer = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const history = useHistory();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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
        backgroundColor: "#f0f0f0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Tooltip title="Search users" placement="bottom-end">
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search User"
              value={searchText}
              onChange={handleSearchChange}
              sx={{ ml: 1, width: "200px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: "#000000" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Chat-Wave
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      >
        <Avatar
          alt={user?.name || "User Avatar"}
          src={
            user?.picture ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          sx={{ ml: 2, cursor: "pointer", width: 40, height: 40 }}
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
          <MenuItem onClick={logOutHandler}>Logout</MenuItem>
        </Menu>
        <IconButton sx={{ ml: 2 }}>
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
