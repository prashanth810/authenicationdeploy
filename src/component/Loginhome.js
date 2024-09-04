import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Loginhome = () => {
    const [logggedinuser, setLoggeduser] = useState('');
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        setLoggeduser(localStorage.getItem("loggedInUser"))
    }, []);

    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        setTimeout(() => {
            navigate("/login");
        }, 800);
    };


    useEffect(() => {
        fetchproducts();
    }, []);

    const fetchproducts = async () => {
        try {
            const url = `http://localhost:8000/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const res = await fetch(url, headers);
            const resp = await res.json();
            console.log("resp", resp);
            setProducts(resp);

        }
        catch (error) {
            console.log(error);
        }
    }

    const borderstyles = {
        display: 'flex',
        gap: "20px"
    }
    return (
        <div>
            <h2> Well come {logggedinuser}</h2>
            <div>
                {products && products.map((val, i) => {
                    return (
                        <div key={i} style={borderstyles}>
                            <p>{val.name}</p>
                            <p>{val.price}</p>
                        </div>
                    )
                })}
            </div>
            <button onClick={handlelogout}>Logout</button>
        </div>
    )
}

export default Loginhome
