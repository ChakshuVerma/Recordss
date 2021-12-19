import React from 'react';

const Footer = () =>{

    const PortfolioURL = "https://chakshuverma.github.io/Chakshu-Verma-Portfolio/";
    const DeveloperName = "Chakshu Verma";

    return(
        <>
            <footer className="footerbar">
                <p className="text"><a href={PortfolioURL} rel="noopener noreferrer" target="_blank">{DeveloperName}</a></p>
            </footer>
        </>
    );

}

export default Footer;