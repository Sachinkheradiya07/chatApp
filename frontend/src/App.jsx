// import React from "react";
// import { Route } from "react-router-dom";
// import "./App.css";
// import Homepage from "./pages/Homepage";
// import ChatsPage from "./pages/Chatpage";

// function App() {
//   return (
//     <div className="App">
//       <Route exact path="/" component={Homepage} />
//       <Route path="/chats" component={ChatsPage} />
//     </div>
//   );
// }

// export default App;
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/chats" component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
