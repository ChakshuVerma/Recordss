import React, {useEffect} from  'react';
import {useHistory} from 'react-router-dom';


const Logout = () => {

    const history = useHistory();

    useEffect(() => {
        async function callLogout(){
            try {
                const res = await fetch('/logout', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                       "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
    
                const data = await res.json();
                
                if(data && res.status === 201){
                    history.push('/login');
                }
            } catch (error) {
                console.log('Logout error: '+error);
                history.push('/login');
            }
        }
        callLogout();
    })

    return(
        <h2 style={{color: "#000"}}>Logout Page</h2>
    );
}

export default Logout;