import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:5000/login", { 
        user,
        password,
      });
  
      if (res.data === "exist") {
        localStorage.setItem("username", user);
        history("/home", { state: { id: user } });
      } else if (res.data === "notexist") {
        alert("User has not signed up");
      } else if (res.data === "Incorrect_password") {
        alert("Password incorrect");
      } else {
        alert("Error while logging in. Please try again later.");
      }
    } catch (e) {
      console.log(e);
      alert("Error while logging in. Please check your internet connection.");
    }
  }
  

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        <input
          type="text"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
}

export default Login;
