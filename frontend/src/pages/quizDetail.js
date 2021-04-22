import { Link, Redirect, useParams } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';
const QuizDetail = () => {
  const params = useParams();
  console.log(params)
  const [errorout, setErrorout] = React.useState('');
  const [quizinfo, setQuizinfo] = React.useState({});
  const [gamestate, setGamestate] = React.useState(false);

  function getQuizDetail () {
    React.useEffect(() => {
      fetch(`${BASE_URL}/admin/quiz/` + params.quizid, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }).then((data) => {
        console.log('Success:', data);
        if (data.status === 200) {
          data.json().then(result => {
            setQuizinfo(result)
            if (result.active > 0) {
              setGamestate(result.active)
              console.log(result.active)
            }
            console.log(quizinfo)
          });
        } else if (data.status === 403) {
          console.log('invaild token')
          console.log(localStorage.getItem('token'))
        }
      }).catch((error) => {
        console.error('Error:', error);
      })
    }, []);
  }
  getQuizDetail()
  let timtotal = 0;

  async function logout () {
    document.cookie = 'Token=; expires = Thu, 01 Jan 2020 00:00:00 UTC';
    console.log(document.cookie);
    const response = await fetch(`${BASE_URL}/admin/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.json()
    // const oupt = await result
    // const sessionID = await oupt
    console.log(result)
  }

  if (!document.cookie) {
    return <Redirect to="/login" />;
  }
  let Nquestion;
  if (quizinfo.questions !== undefined) {
    Nquestion = quizinfo.questions.length;
    timtotal = 0;
    quizinfo.questions.map((each) => {
      timtotal = timtotal + (each.time) * 1;
      return timtotal;
    })
    timtotal = timtotal * 1;
  }
  console.log(quizinfo.active);
  return (
    <div>
      <div>
      {errorout !== ''
        ? (<div className = 'error_pop'>
        <button id = 'error_close' onClick={() => { setErrorout(''); }}> ❌</button>
        <div id = 'error_out'> {errorout} </div>
        </div>)
        : null
      }
      </div>
      <div className = 'dashboard-header' style = {{ height: '5em', top: '0' }}>
        <div>
        <Link to="/login" className = 'button_style' onClick= {logout} style = {{ float: 'right', top: '0' }}>Log out</Link>
        <Link to="/dashboard" className = 'button_style'style = {{ float: 'left', top: '0' }} >back</Link>
        </div>
      </div>
      <div className = 'center_style'>

        <div className = 'one_card_detials'>
          <div className = 'card__header'>
            <div style= {{ margin: 10 + 'px' }} >
              <div><b>Game name:</b></div>
              {quizinfo.name}
            </div>
            <div>
            <img className = 'image' src={quizinfo.thumbnail} alt="" />
            </div>
          </div>
          <div className='comment_text'>
            <div style= {{ margin: 6 + 'px' }} >
              Number of Questons: {Nquestion}
            </div>
            <div style= {{ margin: 6 + 'px' }} >
              Time Total: {timtotal}s
            </div>
          </div>
          <div>
            <Link to = '/dashboard' className = 'button_style' style = {{ float: 'left', fontSize: 13 + 'px' }} onClick= {deleteQz}>Delete</Link>
            <Link to = {`/gameEdit/${params.quizid}`} className = 'button_style' style = {{ float: 'right', fontSize: 13 + 'px' }}>edit</Link>
          </div>
          {/* <button className = 'button_style'style = {{ right: 0, fontSize: 13 + 'px' }} onClick= {deleteQz}>show result</button> */}
          <div className = 'center_style'>
            { gamestate > 0
              ? <center><button className = 'button_style' onClick= {Gameend}>Game End</button></center>
              : <center><button className = 'button_style'style = {{ backgroundColor: 'red' }} onClick= {Gamestart}>Game Start</button></center>}
          </div>
        </div>
      </div>
    </div>
  )
  async function Gameend () {
    const response = await fetch(`${BASE_URL}/admin/quiz/${params.quizid}/end`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
    setGamestate(-1)

    setErrorout(<div><p>Would you like to view the results?</p>

      <div>
      <Link to = '/dashboard'
      onClick={() => navigator.clipboard.writeText(`http://127.0.0.1:3000/Game/${gamestate}`)}
      className = 'button_style'
    >
      ✔
    </Link>
    </div>
    </div>)
  }
  async function Gamestart () {
    const response = await fetch(`${BASE_URL}/admin/quiz/${params.quizid}/start`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
    setGamestate(true)

    const response2 = await fetch(`${BASE_URL}/admin/quiz/` + params.quizid, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result2 = await response2.json()
    const oupt = await result2
    const sessionID = await oupt.active
    setGamestate(sessionID)
    console.log(oupt.active);
    setErrorout(<div>Successful started!<br/> Session ID:{sessionID}<br/>
    < button to = '/dashboard'
      className = 'button_style'
      onClick={() => navigator.clipboard.writeText(`http://127.0.0.1:3000/joinGame/${sessionID}`)}
    >
      Copy Link
    </button>
    </div>)
  }
  async function deleteQz () {
    const response = await fetch(`${BASE_URL}/admin/quiz/` + params.quizid, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
  }
}
export default QuizDetail;
