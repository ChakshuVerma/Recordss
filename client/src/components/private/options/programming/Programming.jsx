import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Navbar from '../../../common/Navbar';


const Programming = () =>{

    const history = useHistory();
    const [user, setUser] = useState('');
    const NavbarContents = [];

    useEffect(() => {
        async function callProgramming(){
            try {
                const res = await fetch('/programming', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                       "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
    
                const data = await res.json();
                
                if(data && res.status === 201){
                    setUser(data.user);
                }
                else{
                    history.push('/login');
                }
            } catch (error) {
                console.log('Dashboard error: '+error);
                history.push('/login');
            }
        }
        callProgramming();
    }, [history]);


    return(
        <>
            <section className="programming">
                <div className="container">
                    <Navbar contents={NavbarContents}/>
                </div>
                <div className="main-content">
                    <h2 style={{color: "#000"}}>Programming {user.name}</h2>
                </div>
            </section>
        </>
    );
}

export default Programming;