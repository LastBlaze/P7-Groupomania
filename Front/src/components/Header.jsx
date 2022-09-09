import Logo from '../assets/images/icon-left-font-monochrome-white.svg';
import React from 'react';

const Header = () => {
  return (
    <div className="navbar bg-tertiary border-b-4 border-white">
    <div className='container    '>
      <img className="h-full w-80 ml-28" src={Logo} alt="Logo"/>
    </div>
    <div className="flex-none mr-28 w-96 ">
      <ul className="menu menu-horizontal w-full p-0 text-white text-2xl justify-center">
        <li><a>Connexion</a></li>
        <li><a>Inscription</a></li>
      </ul>
    </div>
  </div>
  );
}

export default Header;

