import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import GlobalProvider from "../contexts/global";
import "../styles/globals.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // on mount, check if we already logged in
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("user", JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <>
      <GlobalProvider value={{ firebaseAuth, isLoggedIn, setIsLoggedIn }}>
        <h1>I AM THE OMNIPRESENT HEADER TAG</h1>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}

export default MyApp;
