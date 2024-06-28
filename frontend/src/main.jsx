// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import ChatProvider from "./context/chatProvider.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ChatProvider>
//     {/* <React.StrictMode> */}
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//     {/* </React.StrictMode> */}
//   </ChatProvider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/chatProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>
);
