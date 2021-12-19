import React from 'react';
import {Link} from 'react-router-dom';
import VocabularyImage from '../../resources/Vocabulary.png';
import ProgrammingImage from '../../resources/Programming.jpg'

const Options = () => {

    const optionsArray=[
                        {name: 'Vocabulary', imgSrc: VocabularyImage, link: '/vocabularyOverview', description: "Are you trying to increase your vocabulary but can't find a place to document it well ? Worry no more, this is just the perfect place for it. Supported with the basic functionalities of adding and deleting words as well as loaded with additional features like grouping words and searching the word meanings to assist you . "},
                        {name: 'Programming', imgSrc: ProgrammingImage, link: '/programmingOverview', description: "This is a demo description for coding . "},
                        ];

    return(
    <>
        <div className="options" id="options">
            <div className="center-div">
                {
                    optionsArray.map((option, index)=>{
                        if(index%2 === 0){
                            return (
                                <li key={index}>
                                    <div className="option-details" id={option.name}>
                                        <div className="option-image"><Link to={option.link}><img src={option.imgSrc} alt={optionsArray.name}/></Link></div>
                                        <div className="option-about">
                                            <p className="name">{option.name}</p>
                                            <p className="description">{option.description}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                        else{
                            return (
                                <li key={index}>
                                    <div className="option-details" id={option.name}>
                                        <div className="option-about">
                                            <p className="name">{option.name}</p>
                                            <p className="description">{option.description}</p>
                                        </div>
                                        <div className="option-image"><Link to={option.link}><img src={option.imgSrc} alt={optionsArray.name}/></Link></div>
                                    </div>
                                </li>    
                            );
                        }
                    })
                }
            </div>
        </div>
    </>
    );
}

export default Options;