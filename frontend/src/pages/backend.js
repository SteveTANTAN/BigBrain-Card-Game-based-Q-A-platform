import { Link, Redirect, useParams } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';
const Backend = () => {
  const params = useParams();
  console.log(params)
  const [errorout, setErrorout] = React.useState('');
  const [quizinfo, setQuizinfo] = React.useState({});
  const [sateresult, setStateResult] = React.useState();
  const [satepostion, setpostion] = React.useState('');
  setInterval(() => {
    // window.location.reload();
  }, 10000);
  React.useEffect(() => {
    fetch(`${BASE_URL}/admin/session/${params.sessionid}/status`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((data) => {
      console.log('Success:', data);
      if (data.status === 200) {
        data.json().then(result => {
          console.log(result.results)
          setQuizinfo(result.results)
          setStateResult(result.results.questions)
          setpostion(result.results.position)
          console.log(satepostion)
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
  console.log(sateresult)
  async function nextQ () {
    const response = await fetch(`${BASE_URL}/admin/quiz/${params.q_id}/advance`, {
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
    window.location.reload();
  }

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

  function QuestionPart (item) {
    return (item.map((choice, idx) =>
      <div key={idx}>
        <div className ='question_choice'>
          <li style= {{ margin: 5 + 'px', float: 'left' }} >
            {choice}
          </li>
        </div>

      </div>
    ));
  }
  function Correctanswer (item) {
    if (item.Multi) {
      return <div>{item.correctAnswer.value}</div>
    }
    return (item.correctAnswer.map((choice, idx) =>
      <div key={idx}>
        <div className ='question_choice'>
          <li style= {{ margin: 5 + 'px', float: 'left' }} >
            {choice.value}
          </li>
        </div>

      </div>
    ));
  }
  function QuizCARD () {
    if (quizinfo.questions !== undefined && quizinfo.questions[satepostion] !== undefined) {
      const item = quizinfo.questions[satepostion]
      return (
      <div>
        <div className = 'one_card_detials'>
          <div>
              <div className = 'card__header'>
              <div>
                <div style= {{ margin: 6 + 'px' }} ><b>Question {satepostion + 1}</b></div>
                Time: {item.time}<br/>
                Weight: {item.points} marks

              </div>
              <div>
              <img className = 'image' src={item.thumbnail} alt="" />
              </div>
            </div>
            <div className='comment_text'style= {{ width: 85 + '%' }}>
              <h4>
                Question Title：<br/>
              {item.question}
              </h4>
              {item.Multi
                ? <p>Type: MultiChoice</p>
                : <p>Type: One Choice</p>}
              Selecttion：
                {QuestionPart(item.answers)}
              Correct answer：
              {Correctanswer(item)}
                <div style= {{ margin: 6 + 'px' }} >
              </div>
              Help URL: {item.url}

            </div>
          </div>
          <div className = 'card__header'>
          </div>
          <center>
          </center>
        </div>
      </div>
      );
    }
    return <div>Game no start yet</div>;
  }
  if (quizinfo === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <div>
      <div>
      {errorout
        ? (<div className = 'error_pop'>
        <Link to={`/gameEdit/${params.quizid}`} id = 'error_close' onClick={() => { setErrorout(false); }}> ❌</Link>
        <div id = 'error_out'> </div>
        </div>)
        : null
      }
      </div>
        <div className = 'dashboard-header' style = {{ height: '5em', top: '0' }}>
          <div>
          <Link to="/login" className = 'button_style' onClick= {logout} style = {{ float: 'right', top: '0' }}>Log out</Link>
          <Link to='/dashboard' className = 'button_style'style = {{ float: 'left', top: '0' }} >back</Link>
          </div>
        </div>
      <div className = 'center_style'>
      </div>
      <div className = 'center_style'>
        <div className='comment_text'style= {{ margin: 12 + 'px' }}>
          <div style= {{ margin: 6 + 'px' }} >
          </div>
          <div>Successful started!<br/> Session ID:{params.sessionid}<br/>
          < button to = '/dashboard'
            className = 'button_style'
            onClick={() => navigator.clipboard.writeText(`http://127.0.0.1:3000/joinGame/${params.sessionid}`)}
          >
            Copy invited Link
          </button>
          </div>
          <div style= {{ margin: 6 + 'px' }} >
            who is playing:
            {/* {QuestionPart(quizinfo.players)} */}
            {quizinfo.players} <br/>
          </div>
          <div style= {{ margin: 6 + 'px' }} >
            Game start?
            {quizinfo.answerAvailable
              ? <div>True, this is question {satepostion + 1}</div>
              : <div>Waiting for press next question to start!</div>} <br/>
          </div>
        </div>
        { quizinfo.answerAvailable || quizinfo.active
          ? <div>
            <button onClick = {nextQ} style ={{ backgroundColor: 'red' }} className ='button_style'>start or move to next question</button>
            <QuizCARD/>
            </div>
          : <div>
              game finished
            </div>}

      </div>
    </div>
  )
}
export default Backend;
