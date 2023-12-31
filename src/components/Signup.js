import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // token save karke redirect kar denge history hook ka use karke
      localStorage.setItem('token', json.authtoken);
      history("/home");
      props.showAlert("Successfull Created Account", "success")
    }
    else {
      props.showAlert("Invalide Credential", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div className='container'>
      <h1 className="d-flex justify-content-center" style={{ color: "white" }}>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
