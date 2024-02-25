import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTracker';
import ShowList from './components/ShowList';

export default function App() {
  return (
    <div className="App">
     {/* <h1>Expense tracker coming up</h1> */}
     <Router>
           <Routes>
                 <Route path='/' element={< ExpenseTracker onClose={()=>{}} onTrue={()=>{}}/>}></Route>
                 <Route path='/home' element={< ShowList />}></Route>
          </Routes>
      </Router>
    </div>
  );
}

