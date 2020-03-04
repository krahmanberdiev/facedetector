import Tilt from 'react-tilt'
import React from 'react';
import logo from './logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='logo ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 100, width: 100, borderRadius: '20px' }} >
                <div className="Tilt-inner">
                    <img style={{paddingTop: '15px'}} src={logo} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo