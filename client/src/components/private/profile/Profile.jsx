import React, {useEffect, useState} from 'react';
import './Profile.css';
import {useHistory} from 'react-router-dom'
import UserNotFound from './UserNotFound';
import UserProfile from './UserProfile';
import LoadingGIF from '../../../resources/loading_gif.gif';


const Profile = () => {
    const [rootUser, setRootUser] = useState(null);
    const history = useHistory();
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        async function callProfile(){
            try {
                const res = await fetch(`/myprofile`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                       "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
    
                const data = await res.json();
                
                if(data){
                    setDataFetched(true);
                    if(res.status === 201){
                        setRootUser(data.user);
                    }
                }
                else{ 
                    history.push('/login');
                }
            } catch (error) {
                console.log('Profile error: '+error);
                history.push('/login');
            }
        } 
        callProfile();
    }, [history])


    return(
        <>
            <section className="profile">
                {
                    !dataFetched?<img src={LoadingGIF} alt="Loading-GIF"/>:rootUser ? <UserProfile user={rootUser} />:<UserNotFound/>
                }
            </section> 
        </>
    );
}

export default Profile;