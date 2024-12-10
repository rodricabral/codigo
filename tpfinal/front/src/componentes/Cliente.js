import React, { useState, useEffect } from "react";
import axios from "axios";
import "../componentes/estilos.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function Cliente() {

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");

  const [clienteList, setClienteList] = useState([]);

  const [visible, setVisible] = useState(false);

  // Traer lista de clientes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/cliente/usuarios");
        setClienteList(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchData();
  }, []);

  // Añadir cliente con formulario
  const handleAddCliente = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/api/cliente/guardar", { nombre, cuit });
      alert("Cliente guardado con éxito");
      actualizarLista();
      limpiarCampos();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
  };

  // Editar cliente en pop up
  const handleEditCliente = async () => {
    try {
      await axios.put(`http://localhost:3002/api/cliente/modificar-cliente/${id}`, {
        id,
        nombre,
        cuit
      });
      alert("Cliente actualizado con éxito");
      actualizarLista();
      setVisible(false);
      limpiarCampos();
    } catch (error) {
      console.error("Error al actualizar el cliente", error);
    }
  };

  // Eliminar cliente
  const handleEliminarCliente = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/cliente/eliminar/${id}`);
      alert("Cliente eliminado con éxito");
      setClienteList(clienteList.filter((cliente) => cliente.id !== id));
      setVisible(false);
      limpiarCampos();
    } catch (error) {
      console.error("Error al eliminar el cliente", error);
    }
  };

  // Actualizar
  const actualizarLista = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/cliente/usuarios");
      setClienteList(response.data);
    } catch (error) {
      console.error("Error al actualizar la lista de clientes:", error);
    }
  };

  const handleEdit = (cliente) => {
    setId(cliente.id);
    setNombre(cliente.nombre);
    setCuit(cliente.cuit);
    setVisible(true);
  };

  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setCuit("");
  };

  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          <h2>Datos de los Clientes</h2>
        </div>
        <div className="card-body">
          {/* Formulario para agregar clientes */}
          <form onSubmit={handleAddCliente}>
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre</span>
              <input type="text" className="form-control" value={nombre}
                onChange={(e) => setNombre(e.target.value)} placeholder='Ingrese el nombre del Cliente'
                required
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Cuit</span>
              <input type="text" className="form-control" value={cuit}
                onChange={(e) => setCuit(e.target.value)} placeholder='Ingrese el cuit del Cliente'
                required
              />
            </div>
            <button className="btn btn-success" type="submit">
              Agregar Cliente
            </button>
          </form>
        </div>
      </div>

      <div className="card">
        <h2 className="text-center">Lista de Clientes</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cuit</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clienteList.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.cuit}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Button label="Ver" icon="pi pi-pencil" onClick={() => handleEdit(cliente)} className="p-button-warning" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop up para editar o eliminar cliente */}
      <Dialog className="dialog" header="Editar Cliente" visible={visible} style={{ width: "50vw" }} onHide={() => setVisible(false)}>
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text" className="form-control" value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cuit</span>
            <input
              type="text" className="form-control" value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button label="Actualizar" icon="pi pi-check" onClick={handleEditCliente} className="p-button-success" />
            <Button label="Eliminar" icon="pi pi-trash" onClick={handleEliminarCliente} className="p-button-danger" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default Cliente;
