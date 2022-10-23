import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useGlobalContext } from "../contexts/global";

function LoginPage() {
  const router = useRouter();
  const { firebaseAuth, setIsLoggedIn, isLoggedIn } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = () => {
    setError("");
    setIsLoggedIn(null);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        setIsLoggedIn(true);
        router.push("/authenticated");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setIsLoggedIn(false);
      });
  };

  const logoutUser = () => {
    signOut(firebaseAuth)
      .then(() => setIsLoggedIn(false))
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setIsLoggedIn(false);
      });
  };

  // null is that small window where firebase is still trying to auth you
  if (isLoggedIn === null) {
    return (
      <div>
        <h1>Authenticating...</h1>
      </div>
    );
  }

  if (isLoggedIn === true) {
    return (
      <div>
        <h1>Already logged in</h1>
        <button onClick={logoutUser}>Log out</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {error.length > 0 && (
        <h2 style={{ color: "red", fontWeight: "bold" }}>{error}</h2>
      )}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Email</label>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div>
        <button
          onClick={loginUser}
          style={{
            fontSize: "21px",
            padding: "10px",
          }}
        >
          LOGIN NA SIGE NA
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
