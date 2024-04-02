import React from "react";
import logo from './assets/logo.png';
import {useNavigate} from 'react-router-dom'
import "./style.css";
const Header = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  console.log(pathname);
  const LoginPage = ()=>{
    navigate('/login');
  }
  const RegisterPage = ()=>{
    navigate('/register');
  }
  const LogOut = ()=>{
    navigate('/');
  }
  const AddExpense = ()=>{
    navigate('/add-expense');
  }
  return (
    <div>
      <header className="headerClass">
        <div className="branding">
        <img style={{borderRadius: '12px'}} height={50} width={50} src={logo} alt="logo"/>
        <h1 style={{marginLeft: '8px', fontFamily: 'apercu-medium-pro'}}>CashFlow Control</h1>
        </div>
        {pathname === "/" && (
          <div>
            <button className="button" onClick={LoginPage}>Login</button>
            <button className="button" onClick={RegisterPage}>Register</button>
          </div>
        )}
        {pathname === "/dashboard" && (
          <div>
            <button value="Logout" className="button" onClick={LogOut}>Logout</button>
            <button value="Add Expense" className="button" onClick={AddExpense}>Add Expense</button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
