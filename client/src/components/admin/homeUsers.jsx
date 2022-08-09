import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([])
    const [token, setToken] = useState('')

    const getUsers = async (token) => {
        const response = await axios.get('/admin', {
            headers: {Authorization: token}
        })
        setUsers(response.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token) getUsers(token)
    }, [])

    return ( 
        <div className='note-wrapper'>
            {
                users.map(user => (
                <div key={user._id} className="card">
                <h4 title={user.email}>{user.email}</h4>
                <h4 title={user.accountType}>{user.accountType}</h4>
                <h4 title={user.mobile}>{user.mobile}</h4>
                <div className="card-footer">
                    <Link to={`edit/${user._id}`}>Edit</Link>
                </div>
                </div>
                ))
            }
            
        </div>
     );
}
 
export default Home;