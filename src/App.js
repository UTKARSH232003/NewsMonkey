

import './App.css';
import Navbar from './components/Navbar';
import React,{useState} from 'react';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App(){
  const PageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const handleSetProgress = (progress) =>{
    setProgress(progress);
  }
  return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar color='#f11946' progress={progress}/>
        <Routes>
          <Route exact path="/" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="general" pageSize={PageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="business" pageSize={PageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="entertainment" pageSize={PageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="general" pageSize={PageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="health" pageSize={PageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="science" pageSize={PageSize} country="in" category="science" />} />
          <Route exact path="/technology" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="technology" pageSize={PageSize} country="in" category="technology" />} />
          <Route exact path="/sports" element={<News setProgress={handleSetProgress} apiKey={apiKey}  key="sports" pageSize={PageSize} country="in" category="sports" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;