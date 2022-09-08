import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <nav>
        <Link to="/">Login</Link>
        <Link to="/singup">Signup</Link>
    </nav>
  )
}

export default Navbar;