import axios from 'axios';
import React from 'react';
import { useState } from 'react'

function Login({setLogin}) {
	const [user, setUser] = useState({
		email: '',
		password: ''
	})
	const [error, setError] = useState('')

	const onChange = e => {
		const {name, value} = e.target;
		setUser({...user, [name]:value})
		setError('')
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const response = await axios.post('/login', {
				email: user.email,
				password: user.password
			})
			setUser({email: '', password: ''})
			localStorage.setItem('tokenStore', response.data.token)
			setLogin(true)
		} catch (error) {
			error.response.data.message && setError(error.response.data.message)
		}
	}

	return(
		<div className='login create-note'>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" required name='email' 
				id="login-email" placeholder="E-mail" 
				value={user.email} onChange={onChange}/>

				<input type="password" required name='password' 
				id="login-password" placeholder="Password" 
				value={user.password} onChange={onChange}/>

				<button type='submit'>Login</button>
				<p>Contact Admin if you have trouble logging in</p>
				<h3>{error}</h3>
			</form>
		</div>
	)
}
 
export default Login;