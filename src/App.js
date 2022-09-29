import { useState, useEffect, useCallback } from "react";
import { MdCopyAll } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import { nanoid, customAlphabet } from "nanoid";
import Slider from 'react-smooth-range-input'

import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {

  const [hasNumbers, setHasNumbers] = useState(true);
  const [hasSpecialChars, setHasSpecialChars] = useState(true);
  const [hasUppercase, setHasUppercase] = useState(true);
  const [hasLowercase, setHasLowercase] = useState(true);
  const [lengthPass, setLenghtPass] = useState(12);
  const [password, setPassword] = useState('Here will be your password generated...');

  const handleSpecialChars = (e) => {
    setHasSpecialChars(e.target.checked);
  }

  const handleNumbers = (e) => {
    setHasNumbers(e.target.checked);
  }

  const handleUppercase = (e) => {
    setHasUppercase(e.target.checked);
  }

  const handleLowercase = (e) => {
    setHasLowercase(e.target.checked);
  }

  const handleLengthPass = (e) => {
    setLenghtPass(e);
  }

  const getPassword = () => new Promise((resolve, reject) => {

    const noNumberAlphabetLowerCase = `abcdefghijklmnopqrstuvwxyz`;
    const noNumberAlphabetUpperCase = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const numberAlphabet = `1234567890`;
    const specialCharsAlphabet = `~!@#$%^&*()_+-=[]{};':",./<>?|`;

    let finalDictionary = "";
    finalDictionary += hasSpecialChars ? specialCharsAlphabet : '';
    finalDictionary += hasUppercase ? noNumberAlphabetUpperCase : '';
    finalDictionary += hasLowercase ? noNumberAlphabetLowerCase : '';
    finalDictionary += hasNumbers ? numberAlphabet : '';

    let passwordGenerated = "";
    passwordGenerated = customAlphabet(finalDictionary, lengthPass)();

    setPassword(passwordGenerated);

  })

  const copyPassword = () => {
    const textToCopy = document.querySelector("#password-field").value;
    
    if(textToCopy == "Here will be your password generated..."){
      return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("📝 Password copied to clipboard");
    })
  }

  return (
    <div className="body-app">
      <div className="container">
        <div className="title">
          <h3>Generate </h3>
          <h3 className="gradient">A Strong </h3>
          <h3>Password</h3>
        </div>
        <div className="password-section">
          <div className="password-input">
            <input type="text" id="password-field" value={password} disabled/>
            <MdCopyAll color="#92FE9D" className="copy-btn" size={40} style={{marginLeft: '1rem'}} disabled={password == "Here will be your password generated..."} onClick={copyPassword}/>
          </div>
          <button className="generate-password-btn" onClick={getPassword}>Generate your password</button>
        </div>
        <hr />
        <div className="options-toolbox">
          <div className="slider-input">
            <label name="length-pass">How many characters? </label>
            <Slider barStyle={{width: '50%'}} value={lengthPass} min={0} max={64} barHeight={10} barColor="#ebebeb" onChange={handleLengthPass}/>
          </div>
          <div className="checkbox-input">
            <label name="has-specialchars">Special Characters</label>
            <input type="checkbox" checked={hasSpecialChars} onChange={handleSpecialChars}/>
          </div>
          <div className="checkbox-input">
            <label name="has-numbers">Numbers</label>
            <input type="checkbox" checked={hasNumbers} onChange={handleNumbers}/>
          </div>
          <div className="checkbox-input">
            <label name="has-uppercase">Uppercase Characters</label>
            <input type="checkbox" checked={hasUppercase} onChange={handleUppercase}/>
          </div>
          <div className="checkbox-input">
            <label name="has-lowercase">Lowercase Characters</label>
            <input type="checkbox" checked={hasLowercase} onChange={handleLowercase}/>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored"/>
    </div>
  );
}

export default App;
