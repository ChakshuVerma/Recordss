import React from 'react';
import {Link} from 'react-router-dom';
import VocabularyImage from '../../resources/Vocabulary.png';
import ProgrammingImage from '../../resources/Programming.jpg'

const OptionsForUser = () => {

    const optionsArray=[
        {name: 'Vocabulary', imgSrc: VocabularyImage, link: '/vocabulary', description: 'This is a demo description for vocabulary'},
        {name: 'Programming', imgSrc: ProgrammingImage, link: '/programming', description: 'This is a demo description for coding'},
        ];

    return(
        <>
            <h2 id="options-heading">Our Services</h2>
            {
                optionsArray.map((option, index) => {
                    return(
                        <li key={index} className="option-details">
                            <Link to={option.link}><img src={option.imgSrc} alt={option.name}/></Link>
                            <Link to={option.link}><h2 id="option-name">{option.name}</h2></Link>
                        </li>
                    );
                })
            }                
        </>
    );
}

export default OptionsForUser;