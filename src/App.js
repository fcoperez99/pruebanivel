import React, { Component } from 'react';
import './App.css';
import axios from "axios";

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="https://jsonplaceholder.typicode.com/users";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    name: '',
    username: '',
    email: '',
    phone: '',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.name;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.name, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(url+this.state.form.name).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarPersona=(persona)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      name: persona.name,
      username: persona.nombre,
      email: persona.email,
      phone: persona.phone
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br />
  <button onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Añadir</button>
  <br />
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(persona=>{
          return(
            <tr>
          <td>{persona.name}</td>
          <td>{persona.username}</td>
          <td>{persona.email}</td>
          <td>{persona.phone}</td>
          <td>
                <button onClick={()=>{this.seleccionarPersona(persona); this.modalInsertar()}}>Editar</button>
                {"   "}
                <button onClick={()=>{this.seleccionarPersona(persona); this.setState({modalEliminar: true})}}>Borrar</button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                  <span onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <label htmlFor="NOMBRE">NOMBRE</label>
                    <input type="text" name="name" id="name" readOnly onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="nombre">USERNAME</label>
                    <input type="text" name="username" id="username" onChange={this.handleChange} value={form?form.username: ''}/>
                    <br />
                    <label htmlFor="nombre">EMAIL</label>
                    <input type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
                    <br />
                    <label htmlFor="nombre">PHONE</label>
                    <input type="text" name="phone" id="phone" onChange={this.handleChange} value={form?form.phone:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button onClick={()=>this.peticionDelete()}>Sí</button>
              <button onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>

  );
}
}
export default App;