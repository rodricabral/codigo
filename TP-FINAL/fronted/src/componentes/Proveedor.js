import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../componentes/estilos.css";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { v4 as uuidv4 } from "uuid";


import { Toast } from "primereact/toast";

function Proveedor() {
  let emptyProduct = {
    id: null,
    nombre: "",
    cuit: null,
  };

  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);

  const [proveedorForm, setProveedorForm] = useState({
    id: "",
    nombreProveedor: "",
    cuit: "",
  });
  const [selectedProveedoresTable, setSelectedProveedoresTable] = useState([]);
  const [proveedorListDB, setProveedorListDB] = useState([]);

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {

    try {
      const res = await axios.get("http://localhost:3002/proveedor");
      console.log("Proveedores obtenidos:", res.data);
      setProveedorListDB(res.data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("el id es:  " + proveedorForm.id);
    console.log("el nombre es:  " + proveedorForm.nombreProveedor);
    console.log("el cuit es:  " + proveedorForm.cuit);


    if (!proveedorForm.nombreProveedor.trim()) {
      // Mostrar un mensaje de error al usuario
      alert('Por favor, ingresa un nombre para el proveedor.');
      return;
  }



    if (proveedorForm.id) {
      axios
        .put("http://localhost:3002/proveedor/" + proveedorForm.id, proveedorForm)
        .then((response) => {
          console.log("Respuesta PUT:", response); // Imprime la respuesta completa
          setProductDialog(false);
          //getProveedores();
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el proveedor:", error.response || error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error al actualizar el proveedor",
            life: 3000,
          });
        });
    } else {
      axios
        .post("http://localhost:3002/proveedor", proveedorForm)
        .then((response) => {
          console.log("Respuesta POST:", response); // Imprime la respuesta completa
          setProductDialog(false);
          //getProveedores();
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al crear el proveedor:", error.response || error);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error al crear el proveedor",
            life: 3000,
          });
        });
    }

    proveedorForm.id = uuidv4();

    setProveedorListDB([...proveedorListDB, proveedorForm]);
  };

  const handleEdit = (proveedor) => {
    setId(proveedor.id);
    setNombre(proveedor.nombre);
    setCuit(proveedor.cuit);

    setEditMode(true);
    setEditingIndex(proveedor);
  };

  const onInputChangeInputNombre = (e) => {
    const { name, value } = e.target;

    setProveedorForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onInputNumberChangeCuit = (e, name) => {
    const val = e.target.value;
    let _proveedor = { ...proveedorForm };

    _proveedor[`${name}`] = val;

    setProveedorForm(_proveedor);
  };

  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setCuit("");

    setEditMode(false);
  };

  const updateProveedor = () => {
    axios
      .put(`http://localhost:3001/api/proveedor/modificar-proveedor/${id}`, {
        id: id,
        nombre: nombre,
        cuit: cuit,
      })
      .then(() => {
        limpiarCampos();
      });
    alert("Datos guardados desde el boton de actualizar exitosamente!");
  };

  const editProduct = (proveedor) => {
    setProveedorForm({ ...proveedor });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (proveedor) => {
    setProveedorForm(proveedor);
    setDeleteProductDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };
  //LISTADO DE Proveedores
  /*  const [proveedorList, setProveedorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/proveedor/el-proveedor"
      );
      const data = await response.json();
      setProveedorList(data);
    };
    fetchData();
  }, []); */

  const eliminarProveedor = (id) => {
    axios
      .delete("http://localhost:3002/proveedores/" + proveedorForm.id)
      .then((response) => {
        setDeleteProductDialog(false);
        getProveedores();
        setProveedorForm(emptyProduct);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Deleted",
          life: 3000,
        });
      });
    setDeleteProductDialog(false);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Lista de Proveedores</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
    </div>
  );

  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          <h2>Datos de los Proveedores</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="label input-group-text" id="basic-addon1">
                Nombre
              </span>
              <input
                className="form-control"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="nombreProveedor"
                placeholder="Ingrese el nombre del Proveedor"
                value={proveedorForm.nombreProveedor}
                onChange={(e) => onInputChangeInputNombre(e)}
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
                type="number"
                name="cuit"
                placeholder="Ingrese el cuit del Proveedor"
                value={proveedorForm.cuit}
                onChange={(e) => onInputNumberChangeCuit(e, "cuit")}
              />
            </div>
            <div className="card-footer text-body-secondary">
              {editMode ? (
                <div>
                  <button
                    className="btn btn-warning m-2"
                    onClick={updateProveedor}
                  >
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
        <DataTable
          ref={dt}
          value={proveedorListDB}
          selection={selectedProveedoresTable}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="id"
            header="ID"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="nombre"
            header="Nombre"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="cuit"
            header="Cuit"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>

          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <div>
      <Toast ref={toast} />
      {/* Tu contenido aquí */}
    </div>
    </div>
  );
}

export default Proveedor;
