import React from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();


  const handleLogin = () => {
    navigate("/admin/")
  }


  return (
    <section className='loginContainer'>
      <div className="headingContainer">
        <div className="heading">
          <h1>Login</h1>
        </div>
      </div>
      <div className='loginFormContainer'>
        <h2>Logind</h2>
        <form className="loginForm" onSubmit={handleLogin}>
          <input type="email" name="email" placeholder='Email' />
          <input type="password" name="password" placeholder='Adgangskode' />
          <button type='submit' className='btn effect2'>Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login