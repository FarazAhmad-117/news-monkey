import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';

export default class App extends Component {
  c='John';
  render() {
    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    )
  }
}
