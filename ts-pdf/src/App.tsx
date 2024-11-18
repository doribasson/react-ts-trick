import React from 'react';
import './App.css';
import FormComponent from './components/FormComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Fill out the form</h1>
      <FormComponent />
    </div>
  );
}

export default App;
