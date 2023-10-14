import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY
  
  constructor() {
    super();
    console.log(this.apiKey);
    this.state = {
      country: 'us',
      progress: 0
    }
  }

  
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  selectCountry = (str) => {
    this.setState({
      country: str
    })
  }

  render() {
    return (
      <div>
        <Router basename='/'>
          <NavBar selectCountry={this.selectCountry} />
          <LoadingBar
            color='blue'
            height={3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route exact path='/' key="general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"general"} heading={"All Hot Topics"} />} />
            <Route exact path='/business' key="business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"business"} heading={"Top Business Topics"} />} />
            <Route exact path='/entertainment' key="entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"entertainment"} heading={"Top Entertainment Topics"} />} />
            <Route exact path='/general' key="general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"general"} heading={"All General Topics"} />} />
            <Route exact path='/health' key="health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"health"} heading={"Top Health Topics"} />} />
            <Route exact path='/science' key="science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"science"} heading={"Top Science Topics"} />} />
            <Route exact path='/sports' key="sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"sports"} heading={"Top Sports Topics"} />} />
            <Route exact path='/technology' key="technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={18} country={this.state.country} category={"technology"} heading={"Top Technology Topics"} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
