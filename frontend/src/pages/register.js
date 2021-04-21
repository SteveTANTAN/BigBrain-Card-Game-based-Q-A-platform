import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';

const Register = () => {
  if (document.cookie) {
    return (<Redirect to="/dashboard"/>)
  }
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorout, setErrorout] = React.useState(false);

  function submit () {
    const loginPeople = {
      email: email,
      password: password,
      name: name,
    };
    fetch(`${BASE_URL}/admin/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPeople),
    }).then((data) => {
      console.log('Success:', data);
      if (data.status === 200) {
        data.json().then(result => {
          document.cookie = 'Token=' + result.token + '';
          localStorage.setItem('token', result.token);
          console.log(document.cookie);
        });
        setLoggedIn(true);
      } else if (data.status === 400) {
        setErrorout(true);
        document.getElementById('error_out').innerText = 'This email has been registed, please change a new one'
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  if (loggedIn) {
    return (<Redirect to="/dashboard"/>)
  }

  return (
    <div className='App'>
      <header className = 'App-header'>
        <div>
          {errorout
            ? (<div className = 'error_pop'>
            <button id = 'error_close' onClick={() => { setErrorout(false) }}> ❌</button>
            <div id = 'error_out'> </div>
            </div>)
            : null
          }
        </div>
        <h4> please enter your details  </h4>
        Email: <input onChange={e => setEmail(e.target.value)} value = {email} type = 'text'/>
        Password: <input onChange={e => setPassword(e.target.value)} value = {password} type = 'password'/>
        Name: <input onChange={e => setName(e.target.value)} value = {name} type = 'text'/>
        <button className = 'button_style' onClick= {submit} > Register</button>
        <Link to="/login" >Back to Login</Link>
      </header>
    </div>
  );
}
export default Register;
