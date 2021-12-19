// import React, { useEffect, useState } from 'react';
// import {useHistory} from 'react-router-dom';
import React from 'react';
import './Dashboard.css';
import Navbar from '../common/Navbar';
import AboutUser from './AboutUser';
import LoadingGIF from '../../resources/loading_gif.gif';
import OptionsForUser from './OptionsForUser';
 

const Dashboard = ({user}) => {
    const NavbarContents = [{name: 'logout', link:'/logout'}];

    return(
        <section className="dashboard">
            <div className="container">
                <Navbar contents={NavbarContents}/>
                <div className="main-content">
                    <div className="left-col">
                        <div className="user-data">
                            { !user ? <img src={LoadingGIF} alt="loading" /> : <AboutUser user={user}/>}
                        </div>
                    </div>
                    <div className="right-col">
                        <OptionsForUser/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;