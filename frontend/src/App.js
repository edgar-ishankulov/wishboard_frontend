import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Search from './components/Search';



const App = () => {
  const [word, setWord] = useState('')

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    console.log(word);
  }

  console.log(word);

  return (
    <div>
      <Header title="Images Gallery 2" version="1.0.0"/>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
