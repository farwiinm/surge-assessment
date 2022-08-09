import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

const Edit = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        accountType: '',
        mobile: '',
        id: ''
    })

    const history = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('tokenStore')

            if (id) {
                const response = await axios.get(`/admin/${id}`, {
                    headers: {Authorization: token}
                })
                setUser({
                    firstName: response.data.firstName,
                    lastName:response.data.lastName,
                    email: response.data.email,
                    id: response.data._id,
                    password: response.data.password,
                    accountType: response.data.accountType,
                    mobile: response.data.mobile
                })
            }
            
        }
        getUser()
    }, [id])

    const handleChange = e => {
        const{name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const editUser = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const {firstName,lastName,email,password,accountType,mobile} = user;
                const newUser = {
                    firstName,lastName,email,password,accountType,mobile
                }

                await axios.put(`/admin/${id}`, newUser, {
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
            <form onSubmit={editUser} autoComplete='off'>
                <div className="row">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                    value={user.firstName} id="title" name='firstName' 
                     onChange={handleChange} />
                </div>

                <div className="row">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" value={user.lastName} 
                    id="content" name='lastName'  
                    rows="10" onChange={handleChange}/>
                </div>

                <div className="row">
                    <label htmlFor="email">Email</label>
                    <input type="text" value={user.email} 
                    id="content" name='email' required 
                    rows="10" onChange={handleChange}/>
                </div>

                <div className="row">
                    <label htmlFor="password">Password</label>
                    <input type="text" value={user.password} 
                    id="content" name='password' required 
                    rows="10" onChange={handleChange}/>
                </div>

                <div className="row">
                    <label htmlFor="accountType">Account Type</label>
                    <input type="text" value={user.accountType} 
                    id="content" name='accountType' 
                    rows="10" onChange={handleChange}/>
                </div>

                <div className="row">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" value={user.mobile} 
                    id="content" name='mobile'  
                    rows="10" onChange={handleChange}/>
                </div>

                <button type='submit'>Update</button>
            </form>
        </div>
     );
}
 
export default Edit;