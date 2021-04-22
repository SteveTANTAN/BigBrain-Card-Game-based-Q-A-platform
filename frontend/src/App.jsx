import React from 'react';
import './App.css';
// import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect,
} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import QuizDetail from './pages/quizDetail';
import GameEdit from './pages/Game_compoents/gameedit';
import QuestionEdit from './pages/Game_compoents/question_edit';
import NewQuestion from './pages/Game_compoents/newQuestion';
import Joingame from './pages/joininpage';
import Backend from './pages/backend';
import Waiting from './pages/waitingRoom';
import Gameplay from './pages/game_player';
export default function App () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Joinnew/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/regist">
            <Register/>
          </Route>

          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/admin/quiz/:quizid">
          <QuizDetail/>
          </Route>

          <Route exact path="/gameEdit/:quizid">
            <GameEdit/>
          </Route>

          <Route exact path="/gameEdit/:quizid/newquestion">
            <NewQuestion/>
          </Route>
          <Route exact path="/gameEdit/:quizid/:questionid">
            <QuestionEdit/>
          </Route>

          <Route exact path="/joinGame/:sessionID">
            <Joingame/>
          </Route>

          <Route exact path="/joinGame">
            <Joingame/>
          </Route>

          <Route exact path="/waiting_room/:player_id">
            <Waiting/>
          </Route>
          <Route exact path="/backend/:q_id/:sessionid">
            <Backend/>
          </Route>
          <Route exact path="/game/:player_id">
            <Gameplay/>
          </Route>
          <Route exact path="/gamefinished">
            <Gamefinished/>
          </Route>
          <Route exact path="/gameresult">
            <Gameresult/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Joinnew () {
  return (
    <div className='App'>
      <header className = 'App-header'>
        <h3>
        <Link to="/joinGame" >Have session ID? Click here to play the game!</Link>
        </h3>
        <h3>
        <Link to="/login" >Have account? Click here to login!</Link>
        </h3>
      </header>
    </div>
  );
}
function Gamefinished () {
  return (
    <div className='App'>
      <header className = 'App-header'>
        <h1>Game closed</h1>
      <li>Game result for player(not finish yet)</li>

      </header>
    </div>
  );
}
function Gameresult () {
  return (
    <div className='App'>
      <header className = 'App-header'>
      <h1>Game closed</h1>
      <li>Game result for mangement (not finish yet)</li>

      </header>
    </div>
  );
}
