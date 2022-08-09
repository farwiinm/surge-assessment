import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';

const Home = () => {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) => {
        const response = await axios.get('/notes', {
            headers: {Authorization: token}
        })
        setNotes(response.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token) getNotes(token)
    }, [])

    const deleteNote = async (id) => {
        try {
            if (token){
                await axios.delete(`/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href ='/'
        }
    }

    return ( 
        <div className='note-wrapper'>
            {
                notes.map(note => (
                <div key={note._id} className="card">
                <h4 title={note.title}>{note.title}</h4>
                <div className="text-wrapper">
                    <p>{note.content}</p>
                </div>
                <p className="date">{format(note.date)}</p>
                <div className="card-footer">
                    <Link to={`edit/${note._id}`}>Edit</Link>
                </div>
                <button onClick={() => deleteNote(note._id)} className="close">Delete</button>
                </div>
                ))
            }
            
        </div>
     );
}
 
export default Home;