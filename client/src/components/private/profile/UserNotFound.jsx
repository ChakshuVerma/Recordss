import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../common/Navbar';

const UserNotFound = () => {
    const NavbarContents = [];

    return(
        <>
        <div className="container">
            <Navbar contents={NavbarContents}/>
            <div className="main-content">
                <div id="user-not-found">
                    <p>User Not Found</p>
                    <Link to="/">Take me home!</Link>
                </div>
            </div>
        </div>
        </>
    );
} 

export default UserNotFound;