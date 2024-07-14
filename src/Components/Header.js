import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  useEffect(() => {
    let data = localStorage.getItem("sessionData");
    if (data) {
      setLoginData(JSON.parse(data));
    }
  }, []);
  function handleLogout() {
    let data = localStorage.getItem("sessionData");
    if (data) {
      localStorage.removeItem("sessionData");
      window.location.href = "/";
    }
  }
  return (
    <div className="header">
      <h3>Incident Management System</h3>
      <div className="header-right">
        {loginData?.token && <h4>Hi, {loginData?.user?.firstname}</h4>}
        {loginData.token && <h4 onClick={()=>window.location.href = "/incidents/new"} className="create-new">Create Incident</h4>}
        {loginData?.token && (
          <h4 onClick={handleLogout} className="create-new">
            Logout
          </h4>
        )}
        {!loginData?.token && (
          <h4
            onClick={() => (window.location.href = "/login")}
            className="create-new"
          >
            Login
          </h4>
        )}
         {!loginData?.token && (
          <h4
            onClick={() => (window.location.href = "/signup")}
            className="create-new"
          >
            SignUp
          </h4>
        )}
      </div>
    </div>
  );
};

export default Header;
