import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Signup from "../components/authentication/Signup";
import Login from "../components/authentication/Login";
import useMediaQuery from "@mui/material/useMediaQuery";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Homepage() {
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: isMobile ? "90%" : "35%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          backgroundColor: "white",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
          margin: 1,
        }}
      >
        <Typography variant="h4" style={{ fontFamily: "Work Sans" }}>
          Chat-Wave
        </Typography>
      </Box>
      <Box
        sx={{
          width: isMobile ? "90%" : "35%",
          padding: 2,
          backgroundColor: "white",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
          marginTop: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          variant="fullWidth"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Login />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Signup />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}
