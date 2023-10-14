import './App.css';
import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  const apiKey = process.env.REACT_APP_API_KEY

  const [country, setCountry] = useState('us');
  const [progress, setProgress] = useState(0);
  const [mode , setMode] = useState('top-headlines');

  return (
    <div>
      <Router basename='/'>
        <NavBar selectCountry={setCountry} setMode={setMode} />
        <LoadingBar
          color='blue'
          height={3}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route exact path='/' key="general" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"general"} heading={"All Hot Topics"} mode={mode} />} />
          <Route exact path='/business' key="business" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"business"} heading={"Top Business Topics"} mode={mode} />} />
          <Route exact path='/entertainment' key="entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"entertainment"} heading={"Top Entertainment Topics"} mode={mode} />} />
          <Route exact path='/general' key="general" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"general"} heading={"All General Topics"} mode={mode} />} />
          <Route exact path='/health' key="health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"health"} heading={"Top Health Topics"} mode={mode} />} />
          <Route exact path='/science' key="science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"science"} heading={"Top Science Topics"} mode={mode} />} />
          <Route exact path='/sports' key="sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"sports"} heading={"Top Sports Topics"} mode={mode} />} />
          <Route exact path='/technology' key="technology" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={18} country={country} category={"technology"} heading={"Top Technology Topics"} mode={mode} />} />
        </Routes>
      </Router>
    </div>
  )
}
