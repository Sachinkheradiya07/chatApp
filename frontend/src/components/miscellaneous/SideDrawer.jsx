import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Drawer,
  TextField,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../context/chatProvider";

const SideDrawer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const { setSelectedChat, user, chats, setChats } = ChatState();
  const history = useHistory();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearchError("");
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      const token = userInfo?.token;

      if (!token) {
        throw new Error("User token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${searchQuery}`,
        config
      );

      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      if (error.response && error.response.status === 401) {
        setSearchError("Unauthorized. Please login again.");
      } else {
        setSearchError("Failed to fetch search results. Please try again.");
      }
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);

      const storedUserInfo = localStorage.getItem("userInfo");
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      const token = userInfo?.token;

      if (!token) {
        throw new Error("User token not found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error accessing chat:", error);
      alert("Failed to access chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        <Tooltip title="Search users" placement="bottom-end">
          <IconButton onClick={toggleDrawer(true)} sx={{ mr: 1 }}>
            <SearchIcon sx={{ color: "#000000" }} />
            <Typography sx={{ ml: 1, color: "#000000" }}>
              Search User
            </Typography>
          </IconButton>
        </Tooltip>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Chat-Wave
        </Typography>
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
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileOpen}>My Profile</MenuItem>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
          </Menu>
          <IconButton sx={{ ml: 2, color: "#000000" }}>
            <FontAwesomeIcon icon={faBell} />
          </IconButton>
          {notificationCount > 0 && (
            <span style={{ marginLeft: 5, color: "red" }}>
              {notificationCount}
            </span>
          )}
          <ProfileModal
            user={user}
            isOpen={isProfileModalOpen}
            onClose={handleProfileClose}
          />
        </Box>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, padding: "20px", backgroundColor: "#ffffff" }}>
          <Typography variant="h6">Search User</Typography>
          <TextField
            id="filled-search"
            label="Search By Name Or Email"
            type="search"
            variant="filled"
            fullWidth
            margin="normal"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {searchError && <Alert severity="error">{searchError}</Alert>}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
