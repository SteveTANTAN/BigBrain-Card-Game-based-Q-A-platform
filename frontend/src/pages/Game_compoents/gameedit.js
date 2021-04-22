import { Link, Redirect, useParams } from 'react-router-dom';
import React from 'react';
import '../../App.css';
import fileToDataUrl from '../temp';

const BASE_URL = 'http://localhost:5005';
const GameEdit = () => {
  const params = useParams();
  console.log(params)
  const [errorout, setErrorout] = React.useState(false);
  const [quizinfo, setQuizinfo] = React.useState({});
  const [quizName, setquizName] = React.useState('');
  const [quizPhoto, setquizPhoto] = React.useState(null);
  const [updatename, setupdatename] = React.useState(false);
  const [updatePhoto, setupdatePhoto] = React.useState(false);

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
          setquizName(result.name)
          setquizPhoto(result.thumbnail)
          console.log(quizPhoto)
        });
      } else if (data.status === 403) {
        console.log('invaild token')
        console.log(localStorage.getItem('token'))
      }
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, []);
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
  let timtotal = 0;
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
  console.log(quizinfo.questions);
  function QuestionPart (item) {
    return (item.answers.map((choice, idx) =>
      <div key={idx}>
        <div className ='question_choice'>
          <li style= {{ margin: 5 + 'px', float: 'left' }} >
            {choice}
          </li>
        </div>

      </div>
    ));
  }
  function QuizCARD () {
    if (quizinfo.questions !== undefined) {
      console.log(quizinfo)
      return (quizinfo.questions.map((item, idx) =>
      <div key={idx}>
        <div className = 'one_card_detials'>
          <div>
              <div className = 'card__header'>
              <div>
                <div style= {{ margin: 6 + 'px' }} ><b>Question:{idx + 1}</b></div>
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
                {QuestionPart(item)}
                <div style= {{ margin: 6 + 'px' }} >
                {/* Number of Questons: {(item.questions).length} */}
              </div>
              Help URL: {item.url}

            </div>
          </div>
          <div className = 'card__header'>
          </div>
          <center>
            <Link to = {`/gameEdit/${params.quizid}/${idx}`} className = 'button_style'style = {{ float: 'left', top: '0' }}>edit</Link>
          </center>
        </div>
      </div>
      ));
    }
    return <div>Loading......</div>;
  }
  function submit () {
    setupdatePhoto(false);
    setupdatename(false);
    const file = quizPhoto;
    console.log(file);
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (file === null || !validFileTypes.find(type => type === file.type)) {
      setquizPhoto(quizinfo.thumbnail)
      const loginPeople = {
        questions: quizinfo.questions,
        name: quizName,
        thumbnail: quizPhoto
      };
      fetch(`${BASE_URL}/admin/quiz/${params.quizid}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(loginPeople),
      }).then((data) => {
        console.log('Success:', data);
        if (data.status === 200) {
          data.json().then(result => {
            setErrorout(true);
            document.getElementById('error_out').innerText = 'Successful update !!!'
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
          const loginPeople = {
            questions: quizinfo.questions,
            name: quizName,
            thumbnail: srcurl
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
                document.getElementById('error_out').innerText = 'Successful update !!!'
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

        { updatename
          ? <div>
              <p>Update game name:</p>
              <input
              type = 'text'
              onChange = {e => setquizName(e.target.value)}
              value = {quizName}
            />
            </div>
          : <center>
            <div><b>Game name: {quizName}</b></div>
            <button className = 'button_style'onClick={() => { setupdatename(true); }}>Edit gamename</button>
            </center>}
        { updatePhoto
          ? <div>
            <p>Update photo:</p>
            <div>
            <label htmlFor="photo_upload">Choose a profile picture:(only for image file)</label><br/>
            <input type="file"
                id="photo_upload" name="photo_upload"
                accept="image/png,image/jpg,image/jpeg"
                onChange = {e => setquizPhoto((e.target.files[0]))}
                className='button_style'></input>
            </div>
            </div>
          : <center>
            <img className = 'edit_game_image' src={quizPhoto} alt="" />
            <button className = 'button_style'onClick={() => { setupdatePhoto(true); }}>Edit photo</button>
          </center>}

        {updatePhoto || updatename
          ? <button className = 'button_style' style= {{ backgroundColor: 'red' }} onClick = {submit}> Game part update submit</button>
          : <div/>}

      </div>
      <div className = 'center_style'>
        <div className='comment_text'style= {{ margin: 12 + 'px' }}>
          <div style= {{ margin: 6 + 'px' }} >
            Number of Questons: {Nquestion}
          </div>
          <div style= {{ margin: 6 + 'px' }} >
            Time Total: {timtotal} s
          </div>
        </div>
        <Link to = {`/gameEdit/${params.quizid}/newquestion`} className = 'button_style' style = {{ fontSize: 17 + 'px' }}>ADD a new question</Link>

        <QuizCARD/>
      </div>
    </div>
  )
}
export default GameEdit;
