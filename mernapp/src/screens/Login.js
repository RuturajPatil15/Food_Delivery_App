import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    //ye is liye use kiya q ki user ne login page ka data submit kiya to oo direct jayga Home page pe 
    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })

        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid Credentials")
        }
        //jaisehi success.true hua to user jayega Home page pe or authToken create hua dikaya console me
        if (json.success) {
            //useremail name se email save kiya credentials.email me
            localStorage.setItem("UserEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));
            
            Navigate("/")
        }

        //json.stringfy check kiya console me chal raha hai kya
        console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))

    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div >
            <div className='container'style={{backgroundColor: "",marginTop: "100px"}}>
             <h1 style={{paddingLeft: "40%", paddingBottom: "25px"}}>Login Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="m-3 btn btn-info">Submit</button>
                    <Link to="/signup" className='m-3 btn btn-danger'>I'am a new user</Link>
                </form>
            </div>
        </div>
    )
}
