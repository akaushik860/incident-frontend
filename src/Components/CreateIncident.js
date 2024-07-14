import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incidentData, setIncidentData] = useState({});
  const [userData, setUserData] = useState({});

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.desc) newErrors.desc = "description is required";
    if (!formData.priority) newErrors.priority = "priority is required";
    if (!formData.status) newErrors.status = "status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    type: "",
    firstname: "",
    desc: "",
    priority: "",
    status: ""
  });

  useEffect(() => {
    let data = localStorage.getItem("sessionData");
    if (!data) {
      navigate("/login");
    } else {
      let x = JSON.parse(data);
      setUserData(x);
    }
  }, []);

  async function getIncident() {
    console.log(userData);
    const allData = await fetch(`http://localhost:9000/incident/${id}`, {
      method: "GET", // or 'POST', 'PUT', etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      // body: JSON.stringify(data) // include this for POST, PUT, etc.
    });
    let dataResponse = await allData.json();
    if (dataResponse.status === 401) {
      localStorage.removeItem("sessionData");
      navigate("/login");
    }
    setIncidentData(dataResponse[0]);
  }
  useEffect(() => {
    if (id && userData.token) {
      getIncident();
    }
  }, [id, userData]);

  function getDate(isoDate) {
    const date = new Date(isoDate);
    date.setUTCMinutes(date.getUTCMinutes() + 330); // 5 * 60 + 30
    const day = ("0" + date.getUTCDate()).slice(-2); // Day
    const month = date.toLocaleString("default", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours(); // Hours
    const minutes = ("0" + date.getUTCMinutes()).slice(-2); // Minutes

    // Determine AM/PM and format hours for 12-hour time
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Construct the formatted date string
    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name,value,type)
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data
      let data = {
        type: formData?.type,
        incidentDetails: formData?.desc,
        priority: formData?.priority,
        status: formData?.status
      }
      submitIncident(data)
    }
  };
  async function submitIncident(formData){
    console.log(formData)
    const response = await fetch('http://localhost:9000/incident/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify(formData)
      })
      let x = await response.json();
      if(x.status === 200){
        window.location.href = "/incidents"
      }
  }
  return (
    <>
      {incidentData?.incidentId && (
        <div className="incident-box">
          <h2>Incident Details:</h2>
          <div className="incident-line">
            <h4>Incident ID</h4>
            <h5>{incidentData?.incidentId}</h5>
          </div>
          <div className="incident-line">
            <h4>Type : </h4>
            <h4>{incidentData?.type}</h4>
          </div>
          <div className="incident-line">
            <h4>Reporter Name: </h4>
            <h4>{incidentData?.reporterName}</h4>
          </div>
          <div className="incident-line">
            <h4>Description: </h4>
            <p>{incidentData?.incidentDetails}</p>
          </div>
          <div className="incident-line">
            <h4>Priority: </h4>
            <p>{incidentData?.priority}</p>
          </div>
          <div className="incident-line">
            <h4>Status: </h4>
            <p>{incidentData?.status}</p>
          </div>
          <div className="incident-line">
            <h4>Reported Time: </h4>
            <p>{getDate(incidentData?.reportedDate)}</p>
          </div>
        </div>
      )}
      {id === "new" && (
        <form className="incident-form" >
          <div>
            <div>
              <div style={{ marginBottom: "10px" }}>
                Individual/Enterprise/Government{" "}
                <span style={{ color: "red" }}>*</span>
              </div>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Individual"
                  checked={formData.type === "Individual"}
                  onChange={handleChange}
                />
                Individual
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Enterprise"
                  checked={formData.type === "Enterprise"}
                  onChange={handleChange}
                />
                Enterprise
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Government"
                  checked={formData.type === "Government"}
                  onChange={handleChange}
                />
                Government
              </label>
            </div>
            {errors.type && <span className="form-error">{errors.type}</span>}
          </div>

          <div className="form-side">
            <div className="form-div">
              <label>
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <span className="form-error">{errors.firstname}</span>
              )}
            </div>
          </div>

          <div className="form-div">
            <label>
              Description <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              type="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
            {errors.desc && <span className="form-error">{errors.desc}</span>}
          </div>

          <div className="form-div">
            <label>
              Choose priority <span style={{ color: "red" }}>*</span>
            </label>
            <select className="form-select" id="options" value={formData?.priority} onChange={(e)=>{
                setFormData({...formData,["priority"]: e.target.value })
            }}>
              <option value="">Select an option</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && (
              <span className="form-error">{errors.priority}</span>
            )}
          </div>

          <div className="form-div">
            <label>
              Choose status <span style={{ color: "red" }}>*</span>
            </label>
            <select className="form-select" id="options" value={formData?.status} onChange={(e)=>{
                setFormData({...formData,["status"]: e.target.value })
            }}>
              <option value="">Select an option</option>
              <option name="status" value="Open">Open</option>
              <option name="status" value="In Progress">In progress</option>
              <option name="status" value="Closed">closed</option>
            </select>
            {errors.status && (
              <span className="form-error">{errors.status}</span>
            )}
          </div>

          <button onClick={handleSubmit} className="form-submit" style={{width:"fit-content"}} type="submit">
            Create Incident
          </button>
        </form>
      )}
    </>
  );
};

export default CreateIncident;
