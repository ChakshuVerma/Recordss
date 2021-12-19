import './Login-Register.css';
import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaUserAlt, FaMailBulk, FaLock, FaPhoneAlt, FaRegCalendar} from 'react-icons/fa'

const Register = () =>{
    const history = useHistory();

    const NavbarContents = [];
    const [user, setUser] = useState({username: '', phone: '', dob: '', email: '', password: '', cpassword: ''});

    const iconStyling = {
        height: '30', 
        width: '30',   
        marginRight: '15px', 
        display: 'inline',
    };

    const handleInputs = (e) => {
        // We've given names to the input fields so we're extracting the name attribute here
        let eventName = e.target.name;
        let eventValue = e.target.value
        
        setUser({...user, [eventName]: eventValue});
    }

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

    const RegisterUser = async (e) =>{
        e.preventDefault();
        const{username, email, phone, dob, password, cpassword} = user;
 
        const res = await fetch('./register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, phone, dob, password, cpassword})
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
                history.push('./login');
            }, 1000)
        }
    } 

    return(
        <>
            <ToastContainer style={{fontSize:"2rem"}} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} limit={2} theme={"dark"} pauseOnFocusLoss={false} draggable pauseOnHover={false}/>
            <section className="register">
                <div className="container">
                    <Navbar contents={NavbarContents}/>
                    <div className="main-content">
                        <div className="center-div">
                            <h1>Register</h1>
                            <div className="form-container">
                                <form method='POST' onSubmit={RegisterUser}>
                                    <div className="input-div">
                                        <FaUserAlt style={iconStyling}/>
                                        <input value={user.username} name='username' maxLength="10" required type="text" autoComplete="off" onChange={handleInputs} placeholder="Username"></input>
                                    </div>
                                    <div className="input-div">
                                        <FaRegCalendar style={iconStyling}/>
                                        <input value={user.dob} name='dob' required type="date" min="1950-01-01" max="2020-01-01" onChange={handleInputs}></input>
                                    </div>
                                    <div className="input-div">
                                        <FaPhoneAlt style={iconStyling}/>
                                        <input value={user.phone} name='phone' required type="tel" minLength="10" maxLength="10" autoComplete="off" onChange={handleInputs} placeholder="Phone number"></input>
                                    </div>
                                    <div className="input-div">
                                        <FaMailBulk style={iconStyling}/>
                                        <input value={user.email} name='email' required type="email" autoComplete="off" onChange={handleInputs} placeholder="Email"></input>
                                    </div>
                                    <div className="input-div">
                                        <FaLock style={iconStyling}/>
                                        <input value={user.password} name='password' required minLength="6" type="password" autoComplete="off" onChange={handleInputs} placeholder="Password"></input>
                                    </div>
                                    <div className="input-div">
                                        <FaLock style={iconStyling}/>
                                        <input value={user.cpassword} name='cpassword' required minLength="6" type="password" autoComplete="off" onChange={handleInputs} placeholder="Confirm Password"></input>
                                    </div>
                                    <div className="submit-div">
                                        <input type="submit" value="Sign Up"></input>
                                        <Link to="/login">Existing User?</Link>
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

export default Register;
