import React, {useState, useEffect} from "react";
import axios from 'axios';
import  '../componentes/estilos.css';


function Cliente(){
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");

    const [editMode, setEditMode] = useState(false);
      const [editingIndex, setEditingIndex] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("nombre", nombre);
    formData.append("cuit", cuit);
    if (editMode) {
       const updatedList = clienteList.map((item, index) => 
          index === editingIndex ? formData : item
        );
        setClienteList(updatedList);
        setEditMode(false);
        setEditingIndex(null);
      } 
      else{
        try {
          await axios.post("http://localhost:3000/api/cliente/guardar", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          alert("Cliente guardado con éxito");
        } catch (error) {
          console.error("Error al guardar el cliente", error);
        }
   }
   limpiarCampos();
  };


  const handleEdit = (cliente) => {
    setId(cliente.id);
    setNombre(cliente.nombre);
    setCuit(cliente.cuit);
    
    setEditMode(true);
    setEditingIndex(cliente);
    
  };

  const limpiarCampos=()=>{
    
        setId('');
        setNombre('');
        setCuit('');
        
    setEditMode(false);
  }

  const updateCliente = () => {
    axios.put(`http://localhost:3000/api/cliente/modificar-cliente/${id}`, {
      id: id,
      nombre: nombre,
      cuit:cuit,
      })
      .then(() => {
        limpiarCampos();
      });
      alert("Datos guardados desde el boton de actualizar exitosamente!");
  };
  

  //LISTADO DE Clientes
  const [clienteList, setClienteList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3000/api/cliente/usuarios"
      );
      const data = await response.json();
      setClienteList(data);
    };
    fetchData();
  }, []);

  const eliminarCliente = (id) => {
    axios
      .delete(`http://localhost:3000/api/cliente/eliminar/${id}`)
      .then(() => {
        setClienteList(
            clienteList.filter((cliente) => cliente.id !== id)
        );
      });
    };
    

    return(
        <div>
            <div className="card text-center">
        <div className="card-header">
          <h2>Datos de los Clientes</h2>
        </div>
        <div className="card-body">
        
        <form onSubmit={handleSubmit}>  
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Nombre
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='nombre'
              placeholder='Ingrese el nombre del Cliente'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Cuit
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='cuit'
              placeholder='Ingrese el cuit del Cliente'
              value={cuit}
              onChange={(e) => setCuit(e.target.value)}
            />
          </div>
          <div className="card-footer text-body-secondary">
                {editMode ? (
                  <div>
                    <button className="btn btn-warning m-2" onClick={updateCliente}>
                      Actualizar
                    </button>
                    <button className="btn btn-info m-2" onClick={limpiarCampos}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-success" type="submit">
                    Agregar
                  </button>
                )}
                </div>
        </form>
        </div>
      </div>

      <div className="card">
        <h2 className="text-center">Lista de Clientes</h2>
        <table
          className="table table-striped "
          tableStyle={{ minWidth: "50rem" }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cuit</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clienteList.map((cliente, key) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.cuit}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-info"
                          onClick={() => handleEdit(cliente)}>
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => eliminarCliente(cliente.id)}
                          >
                            Delete
                          </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

        
    </div>
    )
}

export default Cliente;

/*
<div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
                Id
              </span>
            <input
            className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
              type='text'
              name='id'
              placeholder='Id de product'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          */