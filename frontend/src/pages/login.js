import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorout, setErrorout] = React.useState('');
  const [login, setlogin] = React.useState(false);

  if (document.cookie || login) {
    return (<Redirect to="/dashboard"/>)
  }
  function submit () {
    const loginPeople = {
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/admin/auth/login`, {
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
          setlogin(true);
        });
      } else if (data.status === 400) {
        data.json().then(result => {
          setErrorout(result.error)
        });
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className='App'>
    <header className = 'App-header'>
      <div>
      {errorout !== ''
        ? (<div className = 'error_pop'>
        <button id = 'error_close' onClick={() => { setErrorout('') }}> ❌</button>
        <div id = 'error_out'> {errorout}</div>
        </div>)
        : null
      }
      </div>
      <h4> please Log in!  </h4>
      Email: <input onChange={e => setEmail(e.target.value)} value = {email} type = 'text'/>
      Password: <input onChange={e => setPassword(e.target.value)} value = {password} type = 'password'/>
      <button to="/dashboard" className = 'button_style' onClick= {submit}>Login</button>
      <Link to="/regist" >No Account? Regist one</Link>
    </header>
    </div>
  );
};
export default Login;
