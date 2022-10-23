import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useGlobalContext } from "../contexts/global";

function RegisterPage() {
  const { firebaseAuth } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setIsLoggedIn(false);
        console.log(errorMessage);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
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
          onClick={registerUser}
          style={{
            fontSize: "21px",
            padding: "10px",
          }}
        >
          REGISTER NA SIGE NA
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
