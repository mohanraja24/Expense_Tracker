import React, { useState } from "react";
import { useNavigate,  } from "react-router-dom";
import "./Header.css";

const Header = ()=> {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <nav>
      <div className="navbar">
        <h1 className="navbar-title">Expense Tracker</h1>
          
        </div>
      
    </nav>
  );
}

export default Header;