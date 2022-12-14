import React from 'react';
import Menu from './notes/menuNotes';
import Home from './notes/homeNotes';
import Create from './notes/createNotes';
import Edit from './notes/editNotes';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Profile from './notes/profile';


const Notes = ({setLogin}) => {
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
 
export default Notes;