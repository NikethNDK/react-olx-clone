// PostContext.jsx
import { createContext, useState } from "react";

export const PostContext = createContext(null);

function Details({ children }) {
  const [postDetails, setPostDetails] = useState(null);
  
  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}

export default Details;

