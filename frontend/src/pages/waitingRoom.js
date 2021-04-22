import { useParams, Redirect, /* Link */ } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';

const Waiting = () => {
  const params = useParams();
  console.log(params.sessionID)
  const [errorout, setErrorout] = React.useState('');
  const [correct, setcorrect] = React.useState(false);
  // automaticlly update for fetching
  var intervalID = setInterval(() => {
    getstatus();
  }, 5000);
  if (correct) {
    clearInterval(intervalID);
    return <Redirect to = {`/game/${params.player_id}`} />;
  }
  // fetch ing function
  async function getstatus () {
    const response = await fetch(`${BASE_URL}/play/${params.player_id}/status`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const result = await response.json()
    console.log(params.player_id)
    console.log(result.started)
    if (result.started) {
      setcorrect(true)
    }
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
      <h4>The game have not start yet,<br/> please wait for owener open</h4>
    </header>
    </div>
  );
};
export default Waiting;
