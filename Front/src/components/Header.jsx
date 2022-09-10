import Logo from '../assets/images/icon-left-font-monochrome-white.svg';
import React from 'react';

const Header = (props) => {
  return (
    <div className="navbar  bg-tertiary border-b-4 border-s">
    <div className='container justify-center'>
      <img className="h-full w-96 " src={Logo} alt="Logo"/>
    </div>
    </div>
  
  );
}

export default Header;

