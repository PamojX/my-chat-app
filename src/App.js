import React, { useState } from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { allowedEmails } from "./allowedUsers";
import ChatRoom from "./ChatRoom";
import RequestAccess from "./RequestAccess";

function App() {
  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const email = result.user.email;
        if (allowedEmails.includes(email)) {
          setUser(result.user);
        } else {
          setUser({ email, notAllowed: true });
        }
      })
      .catch((error) => console.log(error));
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Welcome to Private Chat</h2>
        <button onClick={signIn}>Sign in with Google</button>
      </div>
    );
  }

  if (user?.notAllowed) {
    return <RequestAccess email={user.email} />;
  }

  return <ChatRoom user={user} />;
}

export default App;
