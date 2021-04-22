import { Link, Redirect, useParams } from 'react-router-dom';
import React from 'react';
import Select from 'react-select'
import '../App.css';
const BASE_URL = 'http://localhost:5005';
const Gameplay = () => {
  const params = useParams();
  console.log(params)
  // decleration
  const [errorout, setErrorout] = React.useState('');
  const [quizinfo, setQuizinfo] = React.useState({});
  const [questionChoice, setQuestionChoice] = React.useState(['', '']);
  const [questionanswer, setquestionanswer] = React.useState([{}]);
  const [questiontype, setquestiontype] = React.useState('true');
  // window auto matic freshing
  setInterval(() => {
    window.location.reload();
  }, 15000);
  async function getstatus () {
    const response = await fetch(`${BASE_URL}/play/${params.player_id}/question`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const result = await response.json()
    const oupt = await result.question
    console.log(response)
    if (response.status === 400) {
      setErrorout(
        <div>
        <div>Game closed! click button to exit game </div>
        <br/>
        <Link to = {'/gamefinished'} className = 'button_style'> exit</Link>
      </div>
      )
      return <Redirect to = "/gamefinished"/>;
    }

    setQuizinfo(oupt)
    setQuestionChoice(oupt.answers)
    setquestiontype(oupt.Multi)
    console.log(questiontype)
  }

  React.useEffect(() => {
    getstatus();
  }, []);
  // fecthing for answer showing
  async function showanswer () {
    const response = await fetch(`${BASE_URL}/play/${params.player_id}/answer`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json()
    const result1 = await result.answerIds

    console.log(QuestionPart1(result1));
    setErrorout(
      <div> {QuestionPart1(result1)} </div>
    )
  }
  // question section showing
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
  // question section showing
  function QuestionPart1 (item) {
    return (item.map((choice, idx) =>
      <div key={idx}>
        <div className ='question_choice'>
          <li style= {{ margin: 5 + 'px', float: 'left' }} >
            {questionChoice[item]}
          </li>
        </div>

      </div>
    ));
  }
  // showing the each quiz card
  function QuizCARD () {
    if (quizinfo !== undefined && quizinfo.answers !== undefined) {
      return (
      <div>
        <div>
          <div>
              <div className = 'card__header'>
                <h3>{quizinfo.question}</h3>
              <div>
                Time: {quizinfo.time}<br/>
                Weight: {quizinfo.points} marks
              </div>
              <div>
              <img className = 'image' src={quizinfo.thumbnail} alt="" />
              </div>
            </div>
            <div className='comment_text'style= {{ width: 85 + '%' }}>
              <h4>
                Question Title：<br/>
              {quizinfo.question}
              </h4>
              {quizinfo.Multi
                ? <p>Type: MultiChoice</p>
                : <p>Type: One Choice</p>}
              Selecttion：
                {QuestionPart(quizinfo.answers)}

                <div style= {{ margin: 6 + 'px' }} >
              </div>
              Help URL: {quizinfo.url}

            </div>
          </div>
          <div className = 'card__header'>
          </div>

        </div>
      </div>
      );
    }
    return <div>Game no start yet</div>;
  }
  // function for saving
  function save () {
    console.log(questionanswer)
    console.log(questionChoice)
    console.log(questiontype)

    var anser = [];
    questionChoice.map((item, idx) => {
      if (questiontype === 'true') {
        questionanswer.map((ans) => {
          if (ans.value === item) {
            anser.push(idx);
          }
          console.log(ans.value)
          return ans;
        })
      } else {
        if (questionanswer.value === item) {
          anser.push({ idx });
        }
      }
      return item;
    })
    console.log(anser)
    const loginPeople = {
      answerIds: anser
    }
    if (loginPeople === undefined || loginPeople.length === 0) {
      console.log('Answers must be provided');
    }
    // fetching
    fetch(`${BASE_URL}/play/${params.player_id}/answer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(loginPeople),
    }).then((data) => {
      console.log('Success:', data);
      if (data.status === 200) {
        data.json().then(result => {
          setErrorout(
            <div><div>Successful submit !!!</div>
            <button onClick = {showanswer}> show answer</button>
            </div>
          )
        });
      } else if (data.status === 400) {
        setErrorout(
        <div>
        <button onClick = {showanswer}> show answer</button>
        </div>)
      }
    }).catch((error) => {
      console.error('Error:', error);
    })
  }
  if (quizinfo === null) {
    return <h2>Loading posts...</h2>;
  }
  console.log(questionanswer);
  return (
    <div>
      <div>
      {errorout !== ''
        ? (<div className = 'error_pop'>
        <button id = 'error_close' onClick={() => { setErrorout(''); }}> ❌</button>
        <div id = 'error_out'> {errorout}</div>
        </div>)
        : null
      }
      </div>
        <div className = 'dashboard-header' style = {{ height: '5em', top: '0' }}>
        </div>
      <div className = 'center_style'>
      </div>
      <div className = 'center_style'>
        <div className='comment_text'style= {{ margin: 12 + 'px' }}>
          <div style= {{ margin: 6 + 'px' }} >
          </div>
          <div>Successful started!<br/> Session ID:{params.sessionid}<br/>
          </div>
        </div>
        <div className = 'one_card_detials'>
            <QuizCARD/>
            <center>
            <h2>select Answer:</h2>
            <div style ={{ margin: 2 + 'em' }}>
            {questiontype === 'true'
              ? <Select options={questionChoice.map(t => ({ value: t, label: t }))}
                onChange = {e => setquestionanswer(e)}
                isMulti
                placeholder="select correct Answer"/>
              : <Select options={questionChoice.map(t => ({ value: t, label: t }))}
                onChange = {e => setquestionanswer(e)}
                placeholder="select correct Answer"/>}
            </div>
            </center>
          <center><button onClick = {save} className = 'button_style'>save and submit</button> <br/></center>
        </div>
      </div>
    </div>
  )
}
export default Gameplay;
