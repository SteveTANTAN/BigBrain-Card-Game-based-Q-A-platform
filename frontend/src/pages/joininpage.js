import { Redirect, useParams } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';

const Joingame = () => {
  const params = useParams();
  console.log(params.sessionID)
  const [sessionId, setsessionId] = React.useState('');
  const [name, setname] = React.useState('');
  const [errorout, setErrorout] = React.useState('');
  const [login, setlogin] = React.useState(false);
  const [playerid, setplayerid] = React.useState('');

  if (login) {
    return <Redirect to = {`/waiting_room/${playerid}`} />;
  }

  function submit () {
    let url;
    if (params.sessionID === undefined) {
      url = `${BASE_URL}/play/join/${sessionId}`
    } else {
      url = `${BASE_URL}/play/join/${params.sessionID}`
    }
    const loginPeople = {
      name: name,
    };
    fetch(url, {
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
          setplayerid(result.playerId)
          console.log(result)
          setlogin(true)
        });
      } else if (data.status === 400) {
        setErrorout('Your name and sessionId are input incorrect')
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
      {params.sessionID === undefined
        ? <div>
          <h4> please Enter your name <br/>and Session ID to Join in this game!</h4>
          sessionID: <input onChange={e => setsessionId(e.target.value)} value = {sessionId} type = 'text'/> </div>
        : <div>
          <h4> please Enter your name to Join in this game!</h4>
          sessionID: {params.sessionID}</div>
      }
      <br/>
      <div>Name: <input onChange={e => setname(e.target.value)} placeholder = 'type you name here' value = {name} type = 'text'/></div>
      <button className = 'button_style' onClick= {submit}>Join in</button>
    </header>
    </div>
  );
};
export default Joingame;
