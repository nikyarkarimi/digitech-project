import { useState } from 'react'
import cable from './assets/cable.svg'
import board from './assets/Digitech1v5.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <img id="logo" src="src\assets\Logo_FH.png" alt="Logo of the FH Campus Wien" />
      </header>
      <div id="content">
        <h1>Digitech Board Simulation</h1>
        <div id="sidebar">
          <div>
            <h2>cables</h2>
            <div id="cables">
              <img src={cable} alt="" />
            </div>

          </div>
          <div>
            <h2>jumper</h2>

          </div>
          <div>
            <h2>show:</h2>
            <input type="radio" id="info" name="show" />
            <label htmlFor="info">info</label><br />
            <input type="radio" id="info" name="color" />
            <label htmlFor="info">color</label>
          </div>
          <div>
            <h2>reset</h2>
          </div>
        </div>
        <div>
          <img src={board} alt="" />
        </div>
      </div>

    </>
  )
}

export default App
