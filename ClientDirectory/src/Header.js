import React from 'react';
import './App.css';
import {Link} from  'react-router-dom'
import logo from './logo.png'


function Header() {

  const NavStyle = {
      color : 'white'
  }


  return (
        <nav>
            <Link style={NavStyle}  to = "/">
            <img src={logo} alt="LOGO" width="50px" height="50px"/>
            </Link>
            
            <ul className="header-links">
            <Link style={NavStyle} to='/'>
                <li>HOME</li>
              </Link>
              <Link style={NavStyle} to="/all-stocks">
                <li>View All Stocks</li>
              </Link>
              <Link style={NavStyle} to='History'>
                <li>Stock History</li>
              </Link>
            </ul>
        </nav>
  );
}

export default Header;
