import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            alert("All Fields are required !!");
        } else {
            axios.post(`http://localhost:8000/auth/login`, { email, password })
                .then((res) => {
                    console.log(res);

                    const jwttoken = res.data.token;
                    const userName = res.data.name; // Assuming your backend sends the user's name in "name"

                    localStorage.setItem("token", jwttoken);
                    localStorage.setItem("loggedInUser", userName); // Store the user's name in localStorage
                    console.log("Logged in user:", userName);

                    navigate("/home"); // Navigate to home after successful login
                })
                .catch((err) => console.log(err));

            setEmail("");
            setPassword("");
        }
    }

    console.log(email, password);

    const marginstyles = {
        marginTop: "10px",
    }

    return (
        <>
            <div className='signup-div'>
                <form className='form-div' onSubmit={handlesubmit}>
                    <h3 style={{ textAlign: 'center', }}>SignIn</h3>

                    <div className='email-div'>
                        <label>Email:</label>
                        <div className='email-input' style={marginstyles}>
                            <input type='email' placeholder='Enter email...' value={email} onChange={(e) => setEmail(e.target.value)} style={marginstyles} />
                        </div>
                    </div>
                    <div className='password-div'>
                        <label>Password:</label>
                        <div className='password-input' style={marginstyles}>
                            <input type='password' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className='submit-div'> Log In</button> <span> Don't have an Account? <Link to='/signup'>Sign Up</Link></span>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signin;
