import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import '../App.css';
const BASE_URL = 'http://localhost:5005';

const Dashboard = () => {
  const [errorout, setErrorout] = React.useState('');
  const [theArray, setTheArray] = React.useState([]);
  const [gamename, setGamename] = React.useState('');

  // const [token, setToken] = React.useState('');
  // const [quizs, setQuizs] = React.useState([]);
  React.useEffect(() => {
    fetch(`${BASE_URL}/admin/quiz`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }).then((data) => {
      console.log('Success:', data);
      if (data.status === 200) {
        data.json().then(result => {
          // setQuizs(result.quizzes)
          const quizss1 = result.quizzes.sort(function (a, b) {
            const valueA = a.createdAt;
            const valueB = b.createdAt;
            if (valueA < valueB) return 1;
            if (valueA > valueB) return -1;
            return 0;
          });
          quizss1.map((quiz) => {
            fetch(`${BASE_URL}/admin/quiz/${quiz.id}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            }).then((data1) => {
              console.log('Success:', data1);
              if (data1.status === 200) {
                data1.json().then(eachQuiz => {
                  const quize = eachQuiz;
                  quize.q_id = quiz.id
                  setTheArray(prevArray => [...prevArray, quize])
                });
              } else if (data.status === 403) {
                console.log('invaild token')
                console.log(localStorage.getItem('token'))
              }
            });
            return theArray
          });
        });
      } else if (data.status === 403) {
        console.log('invaild token')
        console.log(localStorage.getItem('token'))
      }
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, []);
  function logout () {
    document.cookie = 'Token=; expires = Thu, 01 Jan 2020 00:00:00 UTC';
    console.log(document.cookie);
  }
  function updatechoice (index, value) {
    const newQuestionChoice = [...theArray];
    newQuestionChoice[index].active = value;
    setTheArray(newQuestionChoice);
  }
  async function Gameend (id, idx) {
    const response = await fetch(`${BASE_URL}/admin/quiz/${id.q_id}/end`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
    setErrorout(<div><p>Would you like to view the results?</p>
      <Link to = '/'
      className = 'button_style'
    >
      ✔
    </Link>
    </div>)
    updatechoice(idx, null)
  }
  console.log(theArray)
  async function Gamestart (id, idx) {
    const response = await fetch(`${BASE_URL}/admin/quiz/${id.q_id}/start`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
    const response2 = await fetch(`${BASE_URL}/admin/quiz/` + id.q_id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result2 = await response2.json()
    const oupt = await result2
    const sessionID = await oupt.active
    updatechoice(idx, sessionID)
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
  async function deleteQz (id) {
    const response = await fetch(`${BASE_URL}/admin/quiz/` + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    const result = await response.result
    console.log(result);
  }

  function QuizCARD () {
    return (
      <div>
        { theArray.map((item, idx) => {
          function choiceDelete () {
            const newQuestionChoice = [...theArray];
            newQuestionChoice.splice(idx, 1);
            setTheArray(newQuestionChoice);
            deleteQz(item.q_id)
            console.log(item);
          }
          let Nquestion = 0;
          let timtotal = 0;
          if (item.questions !== undefined) {
            Nquestion = item.questions.length;
            timtotal = 0;
            item.questions.map((each) => {
              timtotal = timtotal + (each.time) * 1;
              return timtotal;
            })
            timtotal = timtotal * 1;
          }
          function start () {
            Gamestart(item, idx);
          }
          function end () {
            Gameend(item, idx);
          }
          return (
            <div className = 'card' key={idx}>
            <div className = 'card__header'>
              <div style= {{ margin: 10 + 'px' }} >
                <div><b>quiz name:</b></div>
                {item.name}
              </div>
              <div>
              <img className = 'image' src={item.thumbnail} alt="" />
              </div>
            </div>
            <div className='comment_text'>
              <div style= {{ margin: 6 + 'px' }} >
                Number of Questons: {Nquestion}
              </div>
              <div style= {{ margin: 6 + 'px' }} >
                Time Total: {timtotal} s
              </div>
            </div>
            <div>
            <Link to = '/dashboard' className = 'button_style' style = {{ float: 'left', fontSize: 13 + 'px' }} onClick= {choiceDelete}>Delete</Link>
            <Link to = {`/gameEdit/${item.q_id}`} className = 'button_style' style = {{ float: 'right', fontSize: 13 + 'px' }}>edit</Link>
            </div>
            <div className = 'center_style'>
            { item.active > 0
              ? <center><button className = 'button_style' onClick= {end}>Game End</button></center>
              : <center><button className = 'button_style'style = {{ backgroundColor: 'red' }} onClick= {start}>Game Start</button></center>}
          </div>
          </div>
          )
        })}
      </div>
    )
  }

  if (!document.cookie) {
    return <Redirect to="/login" />;
  }
  function newgame () {
    const loginPeople = {
      name: gamename,
    };
    fetch(`${BASE_URL}/admin/quiz/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(loginPeople),
    }).then((data) => {
      console.log('Success:', data);
      if (data.status === 200) {
        data.json().then(result => {
          return <Redirect to="/login" />;
        });
      } else if (data.status === 403) {
        console.log('invaild token')
        console.log(localStorage.getItem('token'))
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <div>
      <div>
      {errorout !== ''
        ? (<div className = 'error_pop'>
        <button id = 'error_close' onClick={() => { setErrorout(''); }}> ❌</button>
        {errorout}
        </div>)
        : null
      }
      </div>
    <div className = 'dashboard-header'>
      <Link to="/login" className = 'button_style' onClick= {logout}>Log out</Link>
    </div>
    <div className = 'dashboard-header'style = {{ height: '7em' }}>
      <center>
      <p> Post a new game here!!!</p>
      <input onChange={e => setGamename(e.target.value)}style = {{ width: '40%' }} value = {gamename} type = 'text' placeholder='Type the new game name'/>
      <Link to="/login" className = 'button_style' onClick= {newgame}>post</Link>
      </center>
    </div>
    <div className="wrap"><QuizCARD/></div>

    </div>
  )
}
export default Dashboard;
