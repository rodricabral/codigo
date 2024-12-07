import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import  '../componentes/estilos.css';
import { Toast } from "primereact/toast";

function Producto(){

  let emptyProduct = {
    id: null,
    nombre: "",
    nombreComercial: "",
    seleccion:"",
    precioVenta: 0,
    proveedor:"",
    precioCompra: 0,
    fotoProducto:"" 
  };

  const toast = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [products, setProducts] = useState(null);

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [seleccion, setSeleccion] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [fotoProducto, setFotoProducto] = useState(null); // Estado para la imagen
  const [proveedores, setProveedores] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


    useEffect(() => {
      getProductos()
    }, []);

    const getProductos = async () => {
      axios.get('http://localhost:3002/productos').then((res) => {
        setProducts(res.data);
      });
    }

    const handleImageChange = (e) => {
      setFotoProducto(e.target.files[0]); // Guardar el archivo de imagen en el estado
    };

    const openNew = () => {
      setProduct(emptyProduct);
      setSubmitted(false);
      setProductDialog(true);
    };


  const handleSubmit = async (e) => {

    if (product.id) {
      axios
        .put("http://localhost:3002/productos/" + product.id, product)
        .then((response) => {
          setProductDialog(false);
          getProductos();
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Update",
            life: 3000,
          });
        });
    } else {
      axios.post("http://localhost:3002/productos", product).then((response) => {
        setProductDialog(false);
        getProductos();
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


  const handleEdit = (product) => {
    /* setId(producto.id);
    setNombre(producto.nombre);
    setNombreComercial(producto.nombreComercial);
    setSeleccion(producto.seleccion);
    setPrecioVenta(producto.precioVenta);
    setProveedor(producto.proveedor);
    setPrecioCompra(producto.precioCompra);
    setFotoProducto(producto.fotoProducto);
    setEditMode(true);
    setEditingIndex(producto); */
    setProduct({ ...product });
    setProductDialog(true);
  };

  const limpiarCampos=()=>{
    
        setId('');
        setNombre('');
        setNombreComercial('');
        setSeleccion('');
        setPrecioVenta('');
        setProveedor('');
        setPrecioCompra('');
        setFotoProducto('');
    setEditMode(false);
  }

  const updateProducto = () => {
    axios.put(`http://localhost:3002/productos/${id}`, {
      id: id,
      nombre: nombre,
      nombreComercial:nombreComercial,
      seleccion: seleccion,
      precioVenta:precioVenta,
      proveedor: proveedor,
      precioCompra: precioCompra,
      fotoProducto: fotoProducto,
      })
      .then(() => {
        limpiarCampos();
      });
      alert("Datos guardados desde el boton de actualizar exitosamente!");
  };
  

  //LISTADO DE CLIENTES
  const [productoInfoList, setProductoInfoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3002/productos"
      );
      const data = await response.json();
      setProductoInfoList(data);
    };
    fetchData();
  }, []);

  const eliminarProductoInfo = (id) => {
    axios
      .delete(`http://localhost:3002/productos/${id}`)
      .then(() => {
        setProductoInfoList(
          productoInfoList.filter((producto) => producto.id !== id)
        );
      });
    };
    

    return(
        <div>
            <div className="card text-center">
        <div className="card-header">
          <h2>Datos de los productos</h2>
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
              placeholder='Ingrese nombre de producto'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Nombre Comercial
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='nombreComercial'
              placeholder='Ingrese nombre comercial de producto'
              value={nombreComercial}
              onChange={(e) => setNombreComercial(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                <select 
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          required
          name='seleccion' value={seleccion} onChange={(e) => setSeleccion(e.target.value)}>
          <option value=''>Seleccione...</option>
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            
          </select>Talle</span></div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Precio Venta
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='precioVenta'
              placeholder='Ingrese precio de venta del producto'
              value={precioVenta}
              onChange={(e) => setPrecioVenta(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
             <span className="label input-group-text" id="basic-addon1">
               <select 
                     className="form-control"
                     aria-label="Username"
                     aria-describedby="basic-addon1"
                     required
                     name='proveedor' value={proveedor} 
                     onChange={(e) => setProveedor(e.target.value)}>
        <option value="">Seleccione...</option>
        {proveedores.map((prov) => (
          <option key={prov.id} value={prov.id}>{prov.id} - {prov.nombre}- {prov.cuit}</option>
        ))}
      </select>
      Proveedor</span>
      </div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Precio Compra
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='text'
              name='precioCompra'
              placeholder='Ingrese precio de compra del producto'
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
          <span className="label input-group-text" id="basic-addon1">
                Imagen
              </span>
            <input
            className="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            required
              type='file'
              name="fotoProducto"
                onChange={handleImageChange}
            />
          </div>
          <div className="card-footer text-body-secondary">
                {editMode ? (
                  <div>
                    <button className="btn btn-warning m-2" onClick={updateProducto}>
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
        <h2 className="text-center">Lista de Productos</h2>
        <table
          className="table table-striped "
          tableStyle={{ minWidth: "50rem" }}
        >
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">NombreComercial</th>
              <th scope="col">Talle</th>
              <th scope="col">PrecioVenta</th>
              <th scope="col">Proveedor</th>
              <th scope="col">PrecioCompra</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productoInfoList.map((producto, key) => {
              return (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.nombreComercial}</td>
                  <td>{producto.seleccion}</td>
                  <td>{producto.precioVenta}</td>
                  <td>{producto.proveedor}</td>
                  <td>{producto.precioCompra}</td>
                  <td>{`image producto ${producto.id}`}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn btn-info"
                          onClick={() => handleEdit(producto)}>
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => eliminarProductoInfo(producto.id)}
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

export default Producto;

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