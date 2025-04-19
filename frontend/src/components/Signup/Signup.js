import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", { email, user, password });
      
      if (res.data === "exist") {
        alert("User already exists. Please log in.");
      } else if (res.data === "notexist") {
        alert("Account created successfully!");
        history("/login"); 
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (e) {
      alert("Error while signing up. Please check your internet connection.");
      console.log(e);
    }
  }

  return (
    <div className="login">
      <h1>Signup</h1>
      <form action="POST">
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Username" required />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login">Login Page</Link>
    </div>
  );
}

export default Signup;
