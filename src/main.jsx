import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FirebaseContext } from "./store/FirebaseContext.jsx";
import { auth, db, storage } from "./firebase/config";
import Context from "./store/FirebaseContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ auth, db, storage }}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
