import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Create = () => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })

    const history = useNavigate();

    const handleChange = e => {
        const{name, value} = e.target;
        setNote({...note, [name]:value})
    }

    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const {title, content, date} = note;
                const newNote = {
                    title, content, date
                }

                await axios.post('/notes', newNote, {
                    headers: {Authorization: token}
                })
                return history.push('/')
            }
        } catch (error) {
            window.location.href = "/"
        }
    }

    return ( 
        <div className='create-note'>
            <h2>Create a note</h2>
            <form onSubmit={createNote} autoComplete='off'>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" 
                    value={note.title} id="title" name='title' 
                    required onChange={handleChange} />
                </div>
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <input type="text" value={note.content} 
                    id="content" name='content' required 
                    rows="10" onChange={handleChange}/>
                </div>

                <label htmlFor="date">Date: {note.date}</label>
                <div className="row">
                    <input type="date" 
                    value={note.date} id="date" name='date' 
                    required onChange={handleChange}/>
                </div>

                <button type='submit'>Create</button>
            </form>
        </div>
     );
}
 
export default Create;