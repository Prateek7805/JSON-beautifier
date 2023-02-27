import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import Footer from './components/Footer';
import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
function App() {

  const [input, setInput] = useState("");
  const [error, setError] = useState({
    error: false,
    message: ""
  });
  const jsonColorPalatte = {
    keyColor : "#FFB319",
    valueColor : "#00BCD4",
    numColor : "#FF2442",
    boolColor : "#4E89AE"
  }

  const handleError = (err)=>{
    const positionRegex = /at position (\d+)/i;
      const matches = positionRegex.exec(err.message);
      setError(prev=>{
        return {
          ...prev,
          error: true,
          message: err.message
        }
      });
      if(!matches){
        return;
      }
      const position = parseInt(matches[1]);
      console.log(matches);
      setInput(input.substring(0, position)+'⬅️'+input.substring(position));
  }
  const handleBeautify = () =>{
    try{
      const keyPattern = /"(\w+)":/g;
      const stringValuePattern = /: "(.*)"/g;
      const numberValuePattern = /: (\d+)/g;
      const booleanValuePattern = /: (true|false)/g;
      const breakPattern = /\n/g;
      const jsonSData = JSON.parse(input);
      var jsonData = JSON.stringify(jsonSData, null, 4);
      jsonData = jsonData.replace(/ {2,}/g, match=>"&nbsp;".repeat(match.length))

                .replace(keyPattern, (_,group)=>`"<span style="color: ${jsonColorPalatte.keyColor}">${group}</span>":`)
                .replace(stringValuePattern, (_,group)=>`: "<span style="color : ${jsonColorPalatte.valueColor}">${group}</span>"`)
                .replace(numberValuePattern, (_,group)=>`: <span style="color: ${jsonColorPalatte.numColor}">${group}</span>`)
                .replace(booleanValuePattern, (_,group)=>`: <span style="color: ${jsonColorPalatte.boolColor}">${group}</span>`)
                .replace(breakPattern, '<br/>');

      const output = document.getElementById("JSON-OUTPUT");
      output.innerHTML = jsonData;

    }catch(err){
      handleError(err);
    }
  }
  const handleMinify = () =>{
    try{
      const jsonSData = JSON.parse(input);
      const jsonData = JSON.stringify(jsonSData);
      const output = document.getElementById("JSON-OUTPUT");
      output.innerHTML = jsonData;
    }catch(err){
      handleError(err); 
    }
  }
  return (
    <div className="App">
    <Modal show={error.error} onHide={()=>{setError((prev)=>{return {...prev, error: false}})}}>
      <Modal.Header closeButton>
        <Modal.Title>
          Error in Input JSON
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{setError((prev)=>{return {...prev, error: false}})}}>Close</Button>
        </Modal.Footer>
      
    </Modal>
      <div className="container-fluid ">
        <div className='row'>
          <div className='col-12 col-md-5 p-3'>
            <TextInput state={[input, setInput]}/>
          </div>
          <div className='col-12 col-md-2 d-flex justify-content-center align-items-center'>
            <div className="d-flex flex-md-column flex-row">
              <button className='btn btn-success m-1' onClick={()=>{handleBeautify()}}>Beautify</button>
              <button className='btn btn-primary m-1' onClick={()=>{ handleMinify()}}>Minify</button>
            </div>
          </div>
          <div className='col-12 col-md-5 p-3'>
            <TextOutput/>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
