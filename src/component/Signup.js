import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); // Fixed typo here
    const [password, setPassword] = useState('');
    const [allerros, setAllerrors] = useState("");
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            toast.error("All Field's are required");
        } else {
            axios.post(`http://localhost:8000/auth/signup`, { name, email, password })
                .then((res) => console.log(res));
            setName("");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/login");
            }, 800)
                .catch((err) => console.log(err));
        }
    }


    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (allerros) {
            setAllerrors(""); // Clear error message when user starts typing
        }
    };



    console.log(name, email, password);

    const marginstyles = {
        marginTop: "6px",
    }
    // const errorstyles = {
    //     color: "red",
    // }

    return (
        <>
            <div className='signup-div'>
                <form className='form-div' onSubmit={handlesubmit}>
                    <h3 style={{ textAlign: 'center' }}>Signup</h3>
                    <div className='name-div'>
                        <label>Username:</label>
                        <div className='name-input' style={marginstyles}>
                            <input type='text' autoFocus placeholder='Enter name...' value={name} onChange={handleInputChange(setName)} />
                        </div>
                    </div>
                    <div className='email-div'>
                        <label>Email:</label>
                        <div className='email-input' style={marginstyles}>
                            <input type='email' placeholder='Enter email...' value={email} onChange={handleInputChange(setEmail)} />
                        </div>
                    </div>
                    <div className='password-div'>
                        <label>Password:</label>
                        <div className='password-input' style={marginstyles}>
                            <input type='password' placeholder='Enter password...' value={password} onChange={handleInputChange(setPassword)} />
                        </div>
                    </div>
                    <div>
                        {/* {allerros && <p style={errorstyles}>{allerros}</p>} */}
                        <button className='submit-div' style={{ marginBottom: "16px" }}>Sign Up</button>
                        <span>Already have an Account? <Link to='/login'>Login</Link></span>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup;
