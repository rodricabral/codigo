
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../componentes/estilos.css"; // Si tienes estilos personalizados

function Proveedor() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [proveedorList, setProveedorList] = useState([]); // Lista de proveedores

  // Función para cargar la lista de proveedores
  const fetchProveedorList = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/proveedor/el-proveedor");
      const data = await response.json();
      setProveedorList(data); // Actualiza la lista de proveedores
    } catch (error) {
      console.error("Error al cargar los proveedores", error);
    }
  };

  // Cargar la lista de proveedores cuando el componente se monta
  useEffect(() => {
    fetchProveedorList();
  }, []);

  // Función para manejar la validación y envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación adicional antes de enviar los datos
    if (!nombre || !cuit) {
      alert("Por favor, complete ambos campos: nombre y cuit.");
      return; // Salir si hay campos vacíos
    }

    // Crear el objeto de datos para enviar
    const formData = { nombre, cuit };

    if (editMode) {
      // Actualizar en el modo de edición
      const updatedList = proveedorList.map((item, index) =>
        index === editingIndex ? { ...item, nombre, cuit } : item
      );
      setProveedorList(updatedList);
      setEditMode(false);
      setEditingIndex(null);
    } else {
      // Enviar los datos al servidor
      try {
        await axios.post("http://localhost:3002/api/proveedor/guardar", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("Proveedor guardado con éxito");
        fetchProveedorList(); // Recargar la lista de proveedores
      } catch (error) {
        console.error("Error al guardar el proveedor", error);
        alert("Hubo un error al guardar el proveedor");
      }
    }

    limpiarCampos();
  };

  // Función para editar un proveedor
  const handleEdit = (proveedor) => {
    setId(proveedor.id); // Asegúrate de que el id sea el correcto
    setNombre(proveedor.nombre);
    setCuit(proveedor.cuit);
    setEditMode(true); // Habilitar el modo de edición
    setEditingIndex(proveedor.id); // Establecer el índice del proveedor a editar
  };

  // Función para limpiar los campos
  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setCuit("");
    setEditMode(false);
  };

  // Función para actualizar un proveedor
  const updateProveedor = async () => {
    try {
      await axios.put(`http://localhost:3002/api/proveedor/modificar-proveedor/${id}`, {
        id: id,
        nombre: nombre,
        cuit: cuit,
      });
      alert("Datos actualizados con éxito");
      fetchProveedorList(); // Recargar la lista después de la actualización
      limpiarCampos();
    } catch (error) {
      console.error("Error al actualizar el proveedor", error);
    }
  };

  // Función para eliminar un proveedor
  const eliminarProveedor = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/proveedor/eliminar/${id}`);
      setProveedorList(proveedorList.filter((proveedor) => proveedor.id !== id));
      fetchProveedorList(); // Recargar la lista después de eliminar
      alert("Proveedor eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el proveedor", error);
      alert("Hubo un error al eliminar el proveedor");
    }
  };

  return (
    <div>
      <div className="card bg-dark border-dark mb-3">
        <div className="card-header">
          <h2 className="text-center bg-dark p-2 text-warning">Datos de los Proveedores</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <label className="input-group-text bg-dark p-2 text-white bg-opacity-75" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="form-control"
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Ingrese el nombre del Proveedor"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <label className="input-group-text bg-dark p-2 text-white bg-opacity-75" htmlFor="cuit">
                Cuit
              </label>
              <input
                className="form-control"
                id="cuit"
                type="text"
                name="cuit"
                placeholder="Ingrese el cuit del Proveedor"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                required
              />
            </div>
            <div className="card-footer text-body-secondary">
              {editMode ? (
                <div>
                  <button className="btn btn-dark m-2" onClick={updateProveedor}>
                    Actualizar
                  </button>
                  <button className="btn btn-danger m-2" onClick={limpiarCampos}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning float-end" type="submit">
                  <b>Agregar</b>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card text-bg-dark mb-5">
        <h2 className="text-center text-warning">Lista de Proveedores</h2>
        <table className="table table-striped" style={{ minWidth: "50rem" }}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cuit</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedorList.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.cuit}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button
                      type="button"
                      className="btn btn-warning m-2"
                      onClick={() => handleEdit(proveedor)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark m-2"
                      onClick={() => eliminarProveedor(proveedor.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Proveedor;
