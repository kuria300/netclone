import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
const Login = () => {

  const [loading, setLoading] = useState(false)
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');

  const user_auth= async(event)=>{
    event.preventDefault();
    setLoading(true)
    if(signState === 'Sign In'){
      await login(email, password)
    }else{
      await signup(name, email, password)
    }
    setLoading(false)
  }
  return (
    <div className='login'>
      <img src={logo} alt='' className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState ==='Sign Up'?<input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Enter Name'/>:<></> }
          <input value={email} type='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email'/>
          <input value={password} type='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
          <button onClick={user_auth} type='submit' disabled={loading} className={`login-button ${loading ? 'loading' : ''}`}>
            {loading ? <span className="spinner"></span> : signState}
          </button>
          <div className='form-help'>
            <div className="remember">
              <input type="checkbox" />
              <label for='checkbox'>Remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState=== 'Sign In'? <p>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>:
          <p>Already Have an Account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login