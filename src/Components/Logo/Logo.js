import React from 'react' ;
import Tilt from 'react-tilt';
import brain from './brain.png' ;
import './Logo.css' ;

const Logo = () =>{
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt" options={{ max : 95 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop:"20px"}}src={brain} alt="Logo"/>
                </div>
            </Tilt>
        </div>
    )
};

export default Logo ;