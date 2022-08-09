import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const Edit = () => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    })

    const history = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore')

            if (id) {
                const response = await axios.get(`/notes/${id}`, {
                    headers: {Authorization: token}
                })
                setNote({
                    title: response.data.title,
                    content:response.data.content,
                    date: new Date(response.data.date).toLocaleDateString(),
                    id: response.data._id
                })
            }
            
        }
        getNote()
    }, [id])

    const handleChange = e => {
        const{name, value} = e.target;
        setNote({...note, [name]:value})
    }

    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const {title, content, date, id} = note;
                const newNote = {
                    title, content, date
                }

                await axios.put(`/notes/${id}`, newNote, {
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
            <h2>Edit note</h2>
            <form onSubmit={editNote} autoComplete='off'>
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

                <button type='submit'>Update</button>
            </form>
        </div>
     );
}
 
export default Edit;