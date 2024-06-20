import React, { useState } from "react";
import {
  Stack,
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return passwordRegex.test(password);
  };

  const postDetails = async (pic) => {
    setPicLoading(true);
    if (!pic) {
      setErrorMessage("Please Select an Image!");
      setPicLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "ddxjrhs6u");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddxjrhs6u/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await response.json();

        if (response.ok) {
          setProfilePicture(result.url);
          console.log(result.url);
        } else {
          throw new Error(result.message || "Failed to upload image");
        }
      } catch (err) {
        console.error("Image upload error:", err.message);
        setErrorMessage("Failed to upload image. Please try again.");
      }
    } else {
      setErrorMessage("Invalid file type. Please select a JPEG or PNG image.");
    }
    setPicLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill all the fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic: profilePicture,
        },
        config
      );
      console.log(data);
      setSuccessMessage("Registration Successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Error Occurred!");
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && (
        <Typography color="success">{successMessage}</Typography>
      )}
      <FormControl fullWidth required>
        <TextField
          label="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth required>
        <TextField
          label="Enter Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth required>
        <TextField
          label="Enter Your Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl fullWidth required>
        <TextField
          label="Confirm Your Password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <input type="file" onChange={(e) => postDetails(e.target.files[0])} />
        {picLoading && <CircularProgress />}
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitHandler}
        disabled={loading || picLoading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </Stack>
  );
}
