import React from 'react';

function Logout() {

    return (
        <form className='text-right'>
            <button 
             className="btn rounded-3xl bg-base-100 hover:text-red-500 text-white"
            onClick={(e) => {
                e.preventDefault()
                localStorage.removeItem('userInfo');
                window.location = "http://localhost:3000/";
            }}>Déconnexion</button>
        </form>
    )
        }

    export default Logout;
