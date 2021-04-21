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

// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

// import axios from 'axios';

/* import JoinGame from "./components/JoinGame/JoinGame";
import WaitingRoom from "./components/WaitingRoom/WaitingRoom";
import PlayGame from "./components/PlayGame/PlayGame";
import PostGame from "./components/PostGame/PostGame";

import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import Scoreboard from "./components/Scoreboard/Scoreboard"; */

/* import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

export const API_ROOT = "https://kahootz.herokuapp.com";
export const API_WS_ROOT = "ws://localhost:3000/cable";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
}; */
// const BASE_URL = 'http://localhost:5005';
/* const myAxios = {
  post: (path, ...args) => axios.post(BASE_URL + path, ...args),
  get: (path, ...args) => axios.get(BASE_URL + path, ...args),
  put: (path, ...args) => axios.put(BASE_URL + path, ...args),
  delete: (path, ...args) => axios.delete(BASE_URL + path, ...args),
}; */
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
          <Route
            exact
            path="/waiting-room"
          />
          <Route
            exact
            path="/game/:id"
          />
          <Route
            exact
            path="/game/:id/scoreboard"
          />

          <Route
            exact
            path="/post-game"
          />
          <Route exact path="/signup" />

          <Route exact path="/create-quiz" />
        </Switch>
      </div>
    </Router>
  );
}

function Joinnew () {
  return (
    <div className='App'>
      <header className = 'App-header'>
        <Link to="/login" >Have account? Click here to login!</Link>
      </header>
    </div>
  );
}
