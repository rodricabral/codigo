import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../componentes/estilos.css";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

function Pedido(){

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


//       const [proveedorForm, setProveedorForm] = useState(emptyProduct);
//   const [selectedProveedoresTable, setSelectedProveedoresTable] = useState([]);
//   const [proveedorListDB, setProveedorListDB] = useState([]);


      const [proveedorForm, setProveedorForm] = useState(emptyProduct);
      const [selectedProveedoresTable, setSelectedProveedoresTable] = useState([]);
      const [proveedorListDB, setProveedorListDB] = useState([]);


      const [FechaEntrega, setFechaEntrega] = useState("");
      
    
      const [id, setId] = useState("");
      const [nombre, setNombre] = useState("");
      const [cuit, setCuit] = useState("");
    
      const [editMode, setEditMode] = useState(false);
      const [editingIndex, setEditingIndex] = useState(null);
    
    
      useEffect(() => {
        getProveedores();
      }, []);
    
      const getProveedores = async () => {
        axios.get("http://localhost:3002/proveedor").then((res) => {
          setProveedorListDB(res.data);
        });
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        setProveedorListDB([...proveedorListDB, proveedorForm]);
    
        if (proveedorForm.id) {
          axios
            .put("http://localhost:3002/productos/" + proveedorForm.id, proveedorForm)
            .then((response) => {
              setProductDialog(false);
              getProveedores();
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Update",
                life: 3000,
              });
            });
        } else {
          axios
            .post("http://localhost:3002/productos", proveedorForm)
            .then((response) => {
              setProductDialog(false);
              getProveedores();
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Created",
                life: 3000,
              });
            });
        }
        /* limpiarCampos(); */
      };
    
      const handleEdit = (proveedor) => {
        setId(proveedor.id);
        setNombre(proveedor.nombre);
        setCuit(proveedor.cuit);
    
        setEditMode(true);
        setEditingIndex(proveedor);
      };
    
      const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _proveedor = { ...proveedorForm };
    
        _proveedor[`${name}`] = val;
    
        setProveedorForm(_proveedor);
      };
    
      const onInputNumberChangeCuit = (e, name) => {
        const val = e.target.value;
        let _proveedor = { ...proveedorForm };
    
        _proveedor[`${name}`] = val;
    
        setProveedorForm(_proveedor);
      };

      const onInputChangeFechaEntrega = (e) => {
        const nuevaFecha = e.target.value;

        setFechaEntrega(prevFechaEntrega => ({
            ...prevFechaEntrega,
            FechaEntrega: nuevaFecha
        }));
      }
    
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
              <h2>Pedidos</h2>
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
                    type="text"
                    name="Pedido"
                    placeholder="Ingrese el nombre del Pedido"
                    value={proveedorForm.nombre}
                    onChange={(e) => onInputChange(e, "nombre")}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="label input-group-text" id="basic-addon1">
                    Cliente
                  </span>
                  <input
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    required
                    type="text"
                    name="Cliente"
                    placeholder="Ingrese el nombre del Cliente"
                    value={proveedorForm.cuit}
                    onChange={(e) => onInputNumberChangeCuit(e, "cuit")}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="label input-group-text" id="basic-addon1">
                    Fecha de Entrega
                  </span>
                  <input
                    className="form-control"
                    aria-label="Fecha de Entrega"
                    aria-describedby="basic-addon1"
                    required
                    type="date"
                    name="fechaEntrega"
                    placeholder="Ingrese la fecha de entrega"
                    value={proveedorForm.fechaEntrega}
                    onChange={(e) => onInputChangeFechaEntrega(e)}
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
                      Realizar Pedido
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
        </div>
      );
    }

export default Pedido;
