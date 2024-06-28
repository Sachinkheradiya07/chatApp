import React from "react";
import {
  IconButton,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ProfileModal = ({ user, isOpen, onClose }) => {
  const handleOpen = () => {
    // Handle opening logic if needed
  };

  const handleClose = () => {
    onClose(); // Call the onClose function passed from SideDrawer
  };

  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth maxWidth="sm">
      <DialogTitle style={{ textAlign: "center" }}>{user.name}</DialogTitle>
      <DialogContent dividers>
        <Card sx={{ display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150, borderRadius: "50%" }}
            image={user.pic}
            alt={user.name}
          />
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="body1" align="center">
              Email: {user.email}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
