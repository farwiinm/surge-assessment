import React from 'react';
import Create from './admin/createUsers';
import Menu from './admin/menuUsers';
import Home from './admin/homeUsers';
import Profile from './admin/profile';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Edit from './admin/editUsers';

const Admin = ({setLogin}) => {
    return ( 
        <>
        <Router>
            <Menu setLogin={setLogin}/>
            <Routes>
            <Route path='/' element={<Home/>} exact/>
            <Route path='/create' element={<Create/>} exact/>
            <Route path='/edit/:id' element={<Edit/>} exact/>
            <Route path='/profile' element={<Profile/>} exact/>
            </Routes> 
        </Router>
        </>
        
   );
}
 
export default Admin;