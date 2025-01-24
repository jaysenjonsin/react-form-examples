import { useState } from 'react';
import './App.css';
import Hello from './components/hello';
import ReactHookForm from './components/ReactHookForm';
import VanillaForm from './components/VanillaForm';

function App() {
  return (
    <>
      <ReactHookForm />
      <VanillaForm />
    </>
  );
}

export default App;
