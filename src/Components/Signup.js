import React, { useEffect } from "react";
import { useState } from "react";

const Signup = () => {
  const [pincodeData, setPincodeData] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    mobilenumber: "",
    fax: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.mobilenumber)
      newErrors.mobilenumber = "Mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  async function signupFunction(data){
    const response = await fetch('http://localhost:9000/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let userData = await response.json();
    if(userData.status === 200){
      window.location.href = "/login"
    }
    console.log(userData)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data
      signupFunction(formData)
    }
  };

  async function getPinData(pincode) {
    const url = "https://api.postalpincode.in/pincode/" + pincode;
    try {
      fetch(url).then(async (res) => {
        const data = await res.json();
        if (data[0]?.PostOffice !== null) {
          let err = {
            pincode: "",
          };
          setErrors({ ...errors, ...err });
          setPincodeData(data[0].PostOffice[0]);
        } else {
          let err = {
            pincode: "Incorrect PIN",
          };
          setErrors({ ...errors, ...err });
          console.log("Incorrect");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (formData.pincode.length === 6) {
      getPinData(formData.pincode);
    }
  }, [formData.pincode]);

  useEffect(() => {
    if (pincodeData) {
      let temp = {
        country: pincodeData.Country,
        state: pincodeData.State,
        city: pincodeData.Region,
      };

      setFormData({ ...formData, ...temp });
    }
  }, [pincodeData]);

  return (
    <>
      <div className="signup-page">
        <form onSubmit={handleSubmit}>
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
                First Name <span style={{ color: "red" }}>*</span>
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

            <div className="form-div">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-div">
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-div">
            <label>
              Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className="form-error">{errors.address}</span>
            )}
          </div>

          <div className="form-side">
            <div className="form-div">
              <label>
                Country <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <span className="form-error">{errors.country}</span>
              )}
            </div>

            <div className="form-div">
              <label>
                State <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <span className="form-error">{errors.state}</span>
              )}
            </div>
          </div>

          <div className="form-side">
            <div className="form-div">
              <label>
                City <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="form-error">{errors.city}</span>}
            </div>

            <div className="form-div">
              <label>
                Pincode <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
              {errors.pincode && (
                <span className="form-error">{errors.pincode}</span>
              )}
            </div>
          </div>

          <div className="form-div">
            <label>
              Mobile Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleChange}
            />
            {errors.mobilenumber && (
              <span className="form-error">{errors.mobilenumber}</span>
            )}
          </div>

          <div className="form-side">
            <div className="form-div">
              <label>Fax</label>
              <input
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
              />
            </div>

            <div className="form-div">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-div">
            <label>
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="form-error">{errors.password}</span>
            )}
          </div>

          <div className="form-div">
            <label>
              Confirm Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button className="form-submit" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
