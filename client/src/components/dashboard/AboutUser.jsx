import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DefaultImage from '../../resources/default-user-image.jpeg';

const AboutUser = ({user}) => {

    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        if(!user.profilePic)
            setUserImg(DefaultImage);
        else
            setUserImg(user.profilePic);
    }, [user.profilePic]);

    return(
        <>
            <div className="user-img-container">
                <img src={userImg} alt="User-Pic" />
            </div>
            <ul>
                <li id="user-name"><Link to="/myprofile">{user.username}</Link></li>
                <li id="user-age"><span>Age: </span>{user.age}</li>
            </ul>
        </>
    );
}

export default AboutUser;