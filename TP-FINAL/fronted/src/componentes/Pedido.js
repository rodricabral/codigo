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

function Pedido() {
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




  const [pedidoForm, setPedidoForm] = useState({
    id: "",
    productoNombre: "",
    clienteNombre: "",
    FechaEntrega: "",
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

    console.log("id:  " + pedidoForm.id);
    console.log("nombre del Producto:  " + pedidoForm.productoNombre);
    console.log("nombre del Cliente:  " + pedidoForm.clienteNombre);
    console.log("Fecha de Entrega:  " + pedidoForm.FechaEntrega);

    if (pedidoForm.id) {
      axios
        .put("http://localhost:3002/pedido/" + pedidoForm.id, pedidoForm)
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
        .post("http://localhost:3002/pedido", pedidoForm)
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

    pedidoForm.id = uuidv4();

    setProveedorListDB([...proveedorListDB, pedidoForm]);
  };

  const handleEdit = (proveedor) => {
    setId(proveedor.id);
    setNombre(proveedor.nombre);
    setCuit(proveedor.cuit);

    setEditMode(true);
    setEditingIndex(proveedor);
  };

  const onInputChangeInput = (e) => {
    const { name, value } = e.target;

    setPedidoForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
    setPedidoForm({ ...proveedor });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (proveedor) => {
    setPedidoForm(proveedor);
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
      .delete("http://localhost:3002/proveedores/" + pedidoForm.id)
      .then((response) => {
        setDeleteProductDialog(false);
        getProveedores();
        setPedidoForm(emptyProduct);
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
      <h4 className="m-0">Lista de Pedidos</h4>
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
          <h2>Datos del Pedido</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="label input-group-text" id="basic-addon1">
                Nombre del Producto
              </span>
              <input
                className="form-control"
                aria-label="productoNombre"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="productoNombre"
                placeholder="Ingrese el nombre del Producto"
                value={pedidoForm.productoNombre}
                onChange={(e) => onInputChangeInput(e)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="label input-group-text" id="basic-addon1">
                Nombre del Cliente
              </span>
              <input
                className="form-control"
                aria-label="clienteNombre"
                aria-describedby="basic-addon1"
                required
                type="text"
                name="clienteNombre"
                placeholder="Ingrese el nombre del Cliente"
                value={pedidoForm.clienteNombre}
                onChange={(e) => onInputChangeInput(e)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="label input-group-text" id="basic-addon1">
                Fecha de Entrega
              </span>
              <input
                className="form-control"
                aria-label="FechaEntrega"
                aria-describedby="basic-addon1"
                required
                type="Date"
                name="FechaEntrega"
                placeholder="Ingrese el cuit del Proveedor"
                value={pedidoForm.FechaEntrega}
                onChange={(e) => onInputChangeInput(e)}
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
                <button className="btn btn-warning" type="submit">
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

export default Pedido;
