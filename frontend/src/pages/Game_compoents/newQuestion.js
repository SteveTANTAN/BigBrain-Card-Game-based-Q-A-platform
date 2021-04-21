import { Link, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select'
import React from 'react';
import '../../App.css';
import fileToDataUrl from '../temp';

const BASE_URL = 'http://localhost:5005';
const NewQuestion = () => {
  const params = useParams();
  const [errorout, setErrorout] = React.useState(false);
  const [quizinfo, setQuizinfo] = React.useState({});
  const [questionTile, setquestionTitle] = React.useState('');
  const [questionChoice, setQuestionChoice] = React.useState(['', '']);
  const [questionanswer, setquestionanswer] = React.useState([{}]);
  const [questiontype, setquestiontype] = React.useState('true');
  const [questionTime, setQuestionTime] = React.useState('10');
  const [questionid, setquestionid] = React.useState('');
  const [url, setURL] = React.useState('');
  const [points, setPoints] = React.useState('1');
  const [quizPhoto, setquizPhoto] = React.useState(null);

  // let questionDetail;
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
          setquestionid(result.questions.length);
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

  if (!document.cookie) {
    return <Redirect to="/login" />;
  }
  function updatechoice (index, value) {
    const newQuestionChoice = [...questionChoice];
    newQuestionChoice[index] = value;
    setQuestionChoice(newQuestionChoice);
  }

  console.log(questionChoice);

  function QuizCARD () {
    if (quizinfo.questions !== undefined) {
      // const item = questionDetail[questionid]
      return (
        <div>
          <div>
          </div>
          <div className = 'card__header'>
        </div>
      </div>
      )
    }
    return <div>Loading......</div>;
  }
  function addRow () {
    const newQuestionChoice = [...questionChoice];
    newQuestionChoice.push('');
    setQuestionChoice(newQuestionChoice);
  }
  function save () {
    const newQuestionChoice = quizinfo;
    const newStruct = {
      Multi: questiontype,
      answers: questionChoice,
      correctAnswer: questionanswer,
      points: points,
      question: questionTile,
      thumbnail: null,
      time: questionTime,
      url: url
    }
    const file = quizPhoto;
    console.log(file);
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (file === null || !validFileTypes.find(type => type === file.type)) {
      newQuestionChoice.questions[questionid] = newStruct
      setquizPhoto(quizinfo.questions[questionid].thumbnail,)
      setQuizinfo(newQuestionChoice);
      const loginPeople = {
        questions: quizinfo.questions,
        name: quizinfo.name,
        thumbnail: quizinfo.thumbnail
      };
      fetch(`${BASE_URL}/admin/quiz/${params.quizid}`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(loginPeople),
      }).then((data) => {
        console.log('Success:', data);
        if (data.status === 200) {
          data.json().then(result => {
            setErrorout(true);
            document.getElementById('error_out').innerText = 'Successful EDIT!!!  '
            console.log(JSON.stringify(loginPeople));
          });
        } else if (data.status === 400) {
          setErrorout(true);
          document.getElementById('error_out').innerText = 'Your password and email are not mactching'
        }
      }).catch((error) => {
        console.error('Error:', error);
      })
    } else {
      fileToDataUrl(file)
        .then((srcurl) => {
          setquizPhoto(srcurl)
          newStruct.thumbnail = srcurl;
          newQuestionChoice.questions[questionid] = newStruct
          setquizPhoto(quizinfo.questions[questionid].thumbnail,)
          setQuizinfo(newQuestionChoice);
          const loginPeople = {
            questions: quizinfo.questions,
            name: quizinfo.name,
            thumbnail: quizinfo.thumbnail
          };
          fetch(`${BASE_URL}/admin/quiz/${params.quizid}`, {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(loginPeople),
          }).then((data) => {
            console.log('Success:', data);
            if (data.status === 200) {
              data.json().then(result => {
                setErrorout(true);
                document.getElementById('error_out').innerText = 'Successful EDIT!!!  '
                console.log(JSON.stringify(loginPeople));
              });
            } else if (data.status === 400) {
              setErrorout(true);
              document.getElementById('error_out').innerText = 'Your password and email are not mactching'
            }
          }).catch((error) => {
            console.error('Error:', error);
          })
        });
    }
  }

  const options = [
    { value: '10', label: '10 s' },
    { value: '20', label: '20 s' },
    { value: '30', label: '30 s' },
    { value: '60', label: '1 min' },
    { value: '120', label: '2 min' },
  ]
  const pointsoptions = [
    { value: '1', label: '1 marks' },
    { value: '2', label: '2 marks' },
    { value: '5', label: '5 marks' },
    { value: '7', label: '7 marks' },
    { value: '10', label: '10 marks' },
  ]
  const questionoptions = [
    { value: 'true', label: 'multiChoice' },
    { value: 'false', label: 'OneChoice' },

  ]
  console.log(questionTime);
  console.log(questiontype);
  return (
    <div>
      <div>
      {errorout
        ? (<div className = 'error_pop'>
        <Link to= {'/gameEdit/' + params.quizid} id = 'error_close' onClick={() => { setErrorout(false); }}> ❌</Link>
        <div id = 'error_out'> </div>
        </div>)
        : null
      }
      </div>
        <div className = 'dashboard-header' style = {{ height: '5em', top: '0' }}>
          <div>
          <Link to="/" className = 'button_style' onClick= {logout} style = {{ float: 'right', top: '0' }}>Log out</Link>
          <Link to={'/gameEdit/' + params.quizid} className = 'button_style'style = {{ float: 'left', top: '0' }} >back</Link>
          </div>
        </div>
      <div className = 'center_style'>

      </div>
      <div className = 'center_style'>
        <div className = 'one_card_detials'>
        <div className = 'card__header'>
          <div>
          </div>
          <div>
          </div>
        </div>
        <QuizCARD/>

        <div style= {{ margin: 15 + 'px' }}>
          <div style = {{ width: 50 + '%' }}>
            Time:<Select
              value={options.filter(({ value }) => value === questionTime) }
              options={options}
              onChange = {e => setQuestionTime(e.value)}
            /> </div>
          <div style = {{ width: 50 + '%' }}>
            Points:<Select
              value={pointsoptions.filter(({ value }) => value === points) }
              options={pointsoptions}
              onChange = {e => setPoints(e.value)}
            /> </div>
          <h4> Title:
          <input
            type = 'text'
            onChange = {e => setquestionTitle(e.target.value)}
            value = {questionTile}
            placeholder="Type in the Tile here"
          />
          </h4>

          <h4> URL:
          <input
            type = 'text'
            onChange = {e => setURL(e.target.value)}
            value = {url}
            placeholder="Paste the Link you Want"
          />
          </h4>

          <div>
            {questionChoice.map((choice, idx) => {
              function choiceDelete () {
                const newQuestionChoice = [...questionChoice];
                newQuestionChoice.splice(idx, 1);
                setQuestionChoice(newQuestionChoice);
              }
              return (
                <div key={idx} style= {{ padding: 15 + 'px' }}>
                <div style= {{ float: 'left' }}><EmailInput
                index = {idx}
                setemail = {updatechoice}
                emailvalue = {questionChoice}
              /></div>
              {questionChoice.length > 2
                ? <div><button onClick = {choiceDelete} style= {{ float: 'right', height: 2 + 'em' }}>❌</button></div>
                : <div/>}
               {/* <button onClick = {asAnswer} className = 'button_style'>set as answer</button> */}

                </div>
              )
            })}
          </div>
          {questionChoice.length < 6
            ? <div><button onClick = {addRow} className = 'button_style'>ADD choice</button> <br/></div>
            : <div/>}
          <div style = {{ width: 100 + '%' }}>
            <div style = {{ width: 50 + '%' }}>
              Questiontype:<Select
                value={questionoptions.filter(({ value }) => value === questiontype) }
                options={questionoptions}
                onChange = {e => setquestiontype(e.value)}
              />
            </div>
          Correct answer:
          <div>
          {questiontype === 'true'
            ? <Select options={questionChoice.map(t => ({ value: t, label: t }))}
              onChange = {e => setquestionanswer(e)}
              isMulti
              placeholder="select correct Answer"/>
            : <Select options={questionChoice.map(t => ({ value: t, label: t }))}
              onChange = {e => setquestionanswer(e)}
              placeholder="select correct Answer"/>}
          </div>
          <div>
            <p>Update photo:</p>
            <img className = 'edit_game_image' src={quizPhoto} alt="" />
            <div>
            <label htmlFor="photo_upload">Choose a profile picture:(only for image file)</label><br/>
            <input type="file"
                id="photo_upload" name="photo_upload"
                accept="image/png,image/jpg,image/jpeg"
                onChange = {e => setquizPhoto((e.target.files[0]))}
                className='button_style'></input>
            </div>
            </div>
          <center><button onClick = {save} className = 'button_style'>save and submit</button> <br/></center>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
function EmailInput ({ index, setemail, emailvalue }) {
  return (
    <div>
      choice {index + 1}:
      <input
        type = 'text'
        onChange = {e => setemail(index, e.target.value)}
        value = {emailvalue[index]}
        placeholder="Choice statement"
      />
    </div>
  )
}
EmailInput.propTypes = {
  index: PropTypes.number,
  setemail: PropTypes.func,
  emailvalue: PropTypes.array,
}
export default NewQuestion;
