import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Create = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        accountType: ''
    })

    const history = useNavigate();

    const handleChange = e => {
        const{name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const createUser = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const {email, password, accountType} = user;
                const newUser = {
                    email, password, accountType
                }

                await axios.post('/admin', newUser, {
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
            <h2>Create a user</h2>
            <form onSubmit={createUser} autoComplete='off'>
                <div className="row">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" 
                    value={user.email} id="title" name='email' 
                    required onChange={handleChange} />
                </div>
                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={user.password} 
                    id="content" name='password' required 
                    rows="10" onChange={handleChange}/>
                </div>

                <label htmlFor="accountType">Account Type</label>
                <div className="row">
                    <input type="text" 
                    value={user.accountType} id="date" name='accountType' 
                    required onChange={handleChange}/>
                </div>

                <button type='submit'>Create</button>
            </form>
        </div>
     );
}
 
export default Create;