import React from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ProfileModal = ({ user, isOpen, onClose }) => {
  return (
    <Dialog onClose={onClose} open={isOpen} fullWidth maxWidth="sm">
      <DialogTitle style={{ textAlign: "center" }}>{user?.name}</DialogTitle>
      <DialogContent dividers>
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              marginBottom: 2,
            }}
            image={user?.pic}
            alt={user?.name}
          />
          <Typography variant="body1" align="center">
            Email: {user?.email}
          </Typography>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
