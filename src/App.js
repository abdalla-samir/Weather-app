import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  let [input, setInput] = useState("0");
  let [degree, setDegree] = useState(0);
  let [name, setName] = useState("Country Name")
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=051e6170314d47cc9cc165511243108&q=${input}&aqi=no`)
      .then((data) => {
        return data.json();
      }).then((data) => {
        setDegree(data.current.temp_c)
        setName(data.location.name);
      }).catch((error) => {
        setDegree("Location Not Found");
      })
  }, [input]);
  let inputData = useRef();
  let prevent = (event) => {
    event.preventDefault();
  }
  let handleChanges = (e) => {
    setInput(inputData.current.value);
  }
  return (
    <div className="App">
      <div className='App-logo'>
        <img src='logo.png' alt='' />
      </div>
      <div className='inputs'>
        <form onSubmit={prevent}>
          <input className='in-one' type='text' name='country' placeholder='Country Name' ref={inputData} />
          <input className='in-two' type='submit' onClick={handleChanges} value='Results' />
        </form>
      </div>
      <div className='results'>
        <h2>{name}</h2>
        <div className='weather-result'>
          {degree + " Degree"}
        </div>
      </div>
    </div>
  );
}
export default App;
