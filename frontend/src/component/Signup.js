import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Fixed typo here
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            alert("All Fields are required !!");
        } else {
            axios.post(`http://localhost:8000/auth/signup`, { name, email, password })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");
        }
    }

    console.log(name, email, password);

    const marginstyles = {
        marginTop: "10px",
    }

    return (
        <>
            <div className='signup-div'>
                <form className='form-div' onSubmit={handlesubmit}>
                    <h3 style={{ textAlign: 'center' }}>Signup</h3>
                    <div className='name-div'>
                        <label>Username:</label>
                        <div className='name-input' style={marginstyles}>
                            <input type='text' autoFocus placeholder='Enter name...' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='email-div'>
                        <label>Email:</label>
                        <div className='email-input' style={marginstyles}>
                            <input type='email' placeholder='Enter email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='password-div'>
                        <label>Password:</label>
                        <div className='password-input' style={marginstyles}>
                            <input type='password' placeholder='Enter password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className='submit-div'>Sign Up</button> <span>Already have an Account? <Link to='/login'>Login</Link></span>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup;
