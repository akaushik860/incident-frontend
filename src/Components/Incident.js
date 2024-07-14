import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Incident = () => {
    const navigate = useNavigate();
    const [incidents,setIncidents] = useState([]);
    const [userId,setUserId] = useState("");
    const [userData,setUserData] = useState({})

  useEffect(()=>{
   let data = localStorage.getItem("sessionData")
   if(!data){
    navigate("/login")
   }
   else{
    let x = (JSON.parse(data))
    setUserId(x.user.id)
    setUserData(x);
   }
  },[])


  async function getIncidents(){
    const allData = await fetch(`http://localhost:9000/incident/user/${userId}`, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        // body: JSON.stringify(data) // include this for POST, PUT, etc.
      })
    let dataResponse = await allData.json()
    if(dataResponse.status === 401){
            localStorage.removeItem("sessionData")
            navigate("/login")
    }
    console.log(dataResponse)
    setIncidents(dataResponse)
  }
  useEffect(()=>{
    if(userId){
        console.log(userId)
        getIncidents();
    }
  },[userId]);
  return (
    <>
      <div className="incident-page">
        <div>
          <h2>My Incidents</h2>
          {incidents.map((item) => {
            return (
              <div onClick={()=>navigate(`/incidents/${item?.incidentId}`)} className="incident-heading">
                <h3>{item?.incidentId}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Incident;
