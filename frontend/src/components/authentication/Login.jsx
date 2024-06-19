import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} color={"black"}>
        <FormControl required>
          <TextField
            fullWidth
            label="Enter Your Email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl required>
          <TextField
            fullWidth
            label="Enter Your Password"
            placeholder="Enter Your Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
        <Button type="submit" variant="contained" color="error">
          Get Guest User Credentials
        </Button>
      </Stack>
    </form>
  );
}
