import './Login-Register.css';
import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {FaMailBulk, FaLock} from 'react-icons/fa'


const Login = () =>{
    const history = useHistory();
    const NavbarContents = [];
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const IconStyle = {
        height: '30', 
        width: '30',   
        marginRight: '15px', 
        display: 'inline',
    };

    const ErrorToast = (errorMsg) => {
        toast.error(errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }

    const SuccesToast = (succesMsg) => {
        toast.success(succesMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        });
    }

    const LoginUser = async (e) =>{
        e.preventDefault();
        
        const res = await fetch('./login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password})
        });

        const data = await res.json();
        
        // 201 means success
        if(!data || res.status !== 201){
            ErrorToast(data.error);
            console.clear();
        }
        else{
            SuccesToast(data.message);
            setTimeout(() => {
                history.push('/');
            }, 1000)
        }
    }

    return(
        <>
            <ToastContainer style={{fontSize:"2rem"}} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} limit={2} theme={"dark"} pauseOnFocusLoss={false} draggable pauseOnHover={false}/>
            <section className="login">
                <div className="container">
                    <Navbar contents={NavbarContents}/>
                    <div className="main-content">
                        <div className="center-div">
                            <h1>Login</h1>
                            <div className="form-container">
                                <form method='POST' onSubmit={LoginUser}>
                                    <div className="input-div">
                                        <FaMailBulk style={IconStyle}/>
                                        <input value={email} name='email' required type="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                                    </div>
                                    <div className="input-div">
                                        <FaLock style={IconStyle}/>
                                        <input value={password} name='password' required type="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                                    </div>
                                    <div className="submit-div">
                                        <input type="submit" value="Sign In"></input>
                                        <Link to="/register">New User?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </section>
        </>
    )
}

export default Login;
