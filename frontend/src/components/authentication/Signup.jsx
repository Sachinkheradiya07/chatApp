import React, { useState } from "react";
import {
  Stack,
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!name || !email || !password || !confirmPassword || !profilePicture) {
      setErrorMessage("All fields are required, including a profile picture.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password is too short");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("pic", profilePicture);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Sign-up successful!");
      // Clear form fields upon successful submission if needed
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfilePicture(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Stack spacing={2}>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </Stack>
    </form>
  );
}
