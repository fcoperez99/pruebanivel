
import './App.css';
import axios from 'axios'; 
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url = "https://jsonplaceholder.typicode.com/users"

class App extends Component {
state={
  data:[]
}

peticionGet=()=>{
  axios.get(url).then(response=>{
    console.log(response.data);
  })
}

  componentDiMount(){
    this.peticionGet();
  }

  render(){
  return (
    <div className="App">
      <br/>
      <button>Añadir</button>
      <br/>
      <table>
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
      </table>
    </div>
  );
}
}
export default App;
