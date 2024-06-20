// import React, { useState } from "react";
// import Stack from "@mui/material/Stack";
// import {
//   FormControl,
//   TextField,
//   IconButton,
//   InputAdornment,
//   Button,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const history = useHistory();

//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       setErrorMessage("Please Fill all the Feilds");
//       setLoading(false);
//       return;
//     }
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       setErrorMessage("Login   Success!");
//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );

//       setUser(data);
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/chats");
//     } catch (error) {
//       setErrorMessage("Error Occured");
//       setLoading(false);
//     }
//   };

//   return (
//     <Stack spacing={2} color={"black"}>
//       {errorMessage && (
//         <Typography color="error" variant="body2">
//           {errorMessage}
//         </Typography>
//       )}
//       <FormControl required>
//         <TextField
//           fullWidth
//           label="Enter Your Email"
//           placeholder="Enter Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl required>
//         <TextField
//           fullWidth
//           label="Enter Your Password"
//           placeholder="Enter Your Password"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={handleClickShowPassword}
//                   onMouseDown={(event) => event.preventDefault()}
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </FormControl>
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         disabled={loading}
//       >
//         {loading ? <CircularProgress size={24} /> : "Log In"}
//       </Button>
//       <Button
//         type="button"
//         variant="contained"
//         color="error"
//         onClick={handleGuestLogin}
//       >
//         Get Guest User Credentials
//       </Button>
//     </Stack>
//   );
// }

import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const setUser = (user) => {
    // Implement this function to set user data, perhaps using a context or state management library
  };

  const handleGuestLogin = () => {
    // Implement guest login logic here
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setErrorMessage("Please fill all the fields");
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
        "/api/user/login",
        { email, password },
        config
      );

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      setErrorMessage("Error occurred: " + error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} color={"black"}>
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={submitHandler}
      >
        {loading ? <CircularProgress size={24} /> : "Log In"}
      </Button>
      <Button
        type="button"
        variant="contained"
        color="error"
        onClick={handleGuestLogin}
      >
        Get Guest User Credentials
      </Button>
    </Stack>
  );
}
