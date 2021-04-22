import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import Login from './pages/login';
import './App.css';
// import axios from 'axios'


describe("path = </>", () => {

  test('test Link for session', () => {
    render(<App />);

    const inputEl = screen.getByRole('link', {  name: /have session id\? click here to play the game!/i});
    expect(inputEl).toBeInTheDocument();
    expect(screen.getByRole('link', {  name: /have account\? click here to login!/i})).toBeInTheDocument();
  });
  test('test Link for login', () => {
    render(<App />);
    expect(screen.getByRole('link', {  name: /have account\? click here to login!/i})).toBeInTheDocument();
  });
});

describe("path = </login>", () => {

  test('login button', () => {
    render(
    <Router>
    <Login />
    </Router>);

    const inputEl = screen.getByRole('button', {  name: /login/i})
    expect(inputEl).toBeInTheDocument();

  });
  test('login_title', () => {
    render(
      <Router>
      <Login />
      </Router>);
    const inputEl = screen.getByRole('heading', {  name: /please log in!/i})
    expect(inputEl).toBeInTheDocument();
  });
});
