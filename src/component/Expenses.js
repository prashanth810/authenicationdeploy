import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';

const Expenses = () => {
    const [logggedinuser, setLoggeduser] = useState('');
    const [expenses, setExpenses] = useState([]);

    const [expenseform, setExpenseform] = useState(false);
    const [expenseinfo, setExpenseinfo] = useState({ text: '', amount: '' });

    const [expenseammount, setExpenseammoubt] = useState(0);
    const [incomeammount, setIncomeammount] = useState(0);

    useEffect(() => {
        const ammounts = expenses.map((val, i) => val.amount);

        const income = ammounts.filter((val) => val > 0)
            .reduce((acc, val) => (acc += val), 0);

        const exp = ammounts.filter((val) => val < 0)
            .reduce((acc, val) => (acc += val), 0) * -1;

        setIncomeammount(income);
        setExpenseammoubt(exp);

    }, [expenses]);





    const handlechange = (e) => {
        const { name, value } = e.target;
        const copyexpenseinfo = { ...expenseinfo };
        copyexpenseinfo[name] = value;
        setExpenseinfo(copyexpenseinfo);
    }

    const handleexpenses = async (e) => {
        const { text, amount } = expenseinfo;

        if (!text || !amount) {
            toast.warning("All fields are required !!");
        } else {
            try {
                const url = "http://localhost:8000/expenses";
                const request = {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text, amount })
                };

                const result = await fetch(url, request);
                const resp = await result.json();

                setExpenses([...expenses, resp.data]);
                alert("Expense added!!")

                setExpenseinfo({ text: '', amount: '' });

            } catch (error) {
                console.log(error);
            }
        }
    };





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
        fetchexpenses();
    }, []);

    const fetchexpenses = async () => {
        try {
            const url = `http://localhost:8000/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const res = await fetch(url, headers);
            if (res.status === 403) {
                navigate('/login');
                return;
            }
            const resp = await res.json();
            console.log("resp", resp);
            setExpenses(resp.data);

        }
        catch (error) {
            console.log(error);
        }
    };

    const handledeleteexpense = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                const response = await fetch(`http://localhost:8000/expenses/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });

                if (response.ok) {
                    setExpenses(expenses.filter(expense => expense._id !== id));
                    toast.success("Expense deleted!");
                } else {
                    toast.error("Failed to delete expense.");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while deleting expense.");
            }
        }
    }



    return (
        <div>
            <div className='expenses_home'>
                <div>
                    <h3> Well come {logggedinuser}</h3>
                </div>
                <div>
                    <button className='closebutton' onClick={handlelogout}>Logout</button>
                </div>
                <div>
                    <button className='addexpenses' onClick={() => setExpenseform(true)}>Add Expenses</button>
                </div>
            </div>
            <div className='incomaxpense_data'>
                <p> You Balance = <span style={{ color: incomeammount - expenseammount > 0 ? '#27ae60' : '#e74c3c' }}>{incomeammount - expenseammount}</span></p>
                <p> Income = <span className='incomes'>{incomeammount}</span></p>
                <p> Expense = <span className='expenses'>{expenseammount}</span></p>
            </div>
            <div className='expenses_tracking_table'>
                {expenses && expenses.map((val, i) => (
                    <div key={i} className='borderstyles'>
                        <div>
                            <button className='closebutton' onClick={() => handledeleteexpense(val._id)}> X </button>
                        </div>
                        <div>
                            <p>{val.text}</p>
                        </div>
                        <div>
                            <p style={{ color: val.amount > 0 ? '#27ae60' : '#e74c3c' }}>{val.amount}</p>
                        </div>
                    </div>
                ))}
            </div>


            <div>
                {expenseform === true ? (
                    <div className={`signup_form ${expenseform === true ? 'actine_form' : ""}`}>
                        <form className='form-div' onSubmit={handleexpenses}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ textAlign: 'center', }}>New expenses...</h3>
                                </div>
                                <div>
                                    <button onClick={() => setExpenseform(false)}> x </button>
                                </div>
                            </div>

                            <div className='email-div'>
                                <label>Expense details</label>
                                <div className='email-input'>
                                    <input type='text' name='text' value={expenseinfo.text} placeholder='Enter expense description...' onChange={handlechange} />
                                </div>
                            </div>
                            <div className='password-div'>
                                <label> Amount </label>
                                <div className='password-input'>
                                    <input type='number' name='amount' value={expenseinfo.amount} placeholder='Enter amount...' onChange={handlechange} />
                                </div>
                            </div>
                            <div>
                                <button className='submit-div' style={{ marginBottom: "16px" }}> ADD </button>
                            </div>
                        </form>
                    </div>
                ) : ("")}
            </div>



        </div>
    )
}

export default Expenses
