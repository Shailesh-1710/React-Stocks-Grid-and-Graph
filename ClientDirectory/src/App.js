import React from 'react';
import './App.css';
import Header from './Header'
import All_stocks from './All_stocks'
import History from './Components/History'
import  {BrowserRouter as Router , Route } from 'react-router-dom';
import Home from './Homepage';



function App() {
  return ( 
    <Router>
      <div className="App">
        <Header/>
        <Route path="/" exact component={Home} />
        <Route path="/all-stocks" component={All_stocks} />
        <Route path="/history" component={History}/>
      </div>
    </Router>
  );
}

export default App;
