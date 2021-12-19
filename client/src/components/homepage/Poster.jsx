import React from 'react';
import {Link as ScrollLink} from 'react-scroll';
import { FaBook, FaCode} from "react-icons/fa";

const Poster = () => {

    const iconArray = [{alias: FaBook, linkToID: 'Vocabulary'}, {alias: FaCode, linkToID: 'Programming'}]
    const phrase = "Keep track of your progress elegantly!!";

    return(
    <>
        <div className="poster">
            <div className="center-div">
                <div className="text">{phrase}</div>
                <div className="icons">
                    {
                        iconArray.map((icon, index)=>{
                            return <li key={index}><ScrollLink to={icon.linkToID} smooth={true} offset={-80}><icon.alias className="poster-icon"/></ScrollLink></li>
                        })
                    }
                </div>
            </div>
        </div>
    </>
    );
}

export default Poster;