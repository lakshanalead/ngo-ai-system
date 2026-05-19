import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Signup Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl mb-5">
        Signup
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 block mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Signup
      </button>
    </div>
  );
}

export default Signup;