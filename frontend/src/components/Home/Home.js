import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import './Home.css';

function Home() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login"); 
    };

    return (
        <div className="home-container">
            <div className="sidebar">
            <h2>Menu</h2>
                <ul>
                    <li><Link to="addTrans">Add Transaction</Link></li>
                    <li><Link to="viewTrans">View transaction</Link></li>
                    <li><Link to="viewGraph">View Graph</Link></li>
                    <li><Link to="currencyconverter">Currency Convertor</Link></li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            <div className="homepage">
                <Outlet /> 
            </div>
        </div>
    );
}

export default Home;
