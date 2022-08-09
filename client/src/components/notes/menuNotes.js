import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({setLogin}) => {
    const handleLogout = () => {
        localStorage.clear()
        setLogin(false)
    }
    return ( 
        <header>
            <h1><Link to="/">Notes List</Link></h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create a Note</Link></li>
                <li onClick={handleLogout}><Link to="/">Logout</Link></li>
            </ul>
        </header>
     );
}
 
export default Menu;