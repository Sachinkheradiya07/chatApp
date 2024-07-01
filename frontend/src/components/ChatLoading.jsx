import React from "react";
import { Box, Skeleton } from "@mui/material";

const ChatLoading = () => {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Skeleton variant="rectangular" height={40} />
      <Skeleton animation="wave" height={40} sx={{ my: 2 }} />
      <Skeleton animation={false} height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton animation="wave" height={40} sx={{ my: 2 }} />
      <Skeleton animation={false} height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton animation="wave" height={40} sx={{ my: 2 }} />
      <Skeleton animation={false} height={40} />
    </Box>
  );
};

export default ChatLoading;
