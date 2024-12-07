import React, { useState, useEffect } from "react";
import axios from "axios";

function Catalogo(){
    const [products, setProduct] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:3000/api/producto/el-producto').then(response => {
            setProduct(response.data);
            console.log(response.data);
        })
    }, [])

    return(
        <div>
            <div>
                <h2 className="text-center">Listado de Productos</h2>
                <ul>
                    {products.map(product => 
                    <li key={product.id}>
                        <h2>{product.id}</h2>
                        <h2>{product.nombre}</h2>
                        <h2>{product.nombreComercial}</h2>
                        <h2>{product.seleccion}</h2>
                        <h2>{product.precioVenta}</h2>
                        <h2>{product.proveedor}</h2>
                        <h2>{product.precioCompra}</h2>
                    <img src={`http://localhost:3000/uploads/${product.fotoProducto}`} alt={product.id} />
                    </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Catalogo;

/*
{products.map(product =>
<div key={product.id} className="card" style="width: 18rem;">
  <img src={`http://localhost:3000/uploads/${product.fotoProducto}`} alt={product.id} />
  <div className="card-body">
    <h5 class="card-title">Card title</h5>
    <h2>{product.nombre}</h2>
                        <h2 class="card-title">{product.nombreComercial}</h2>
                        <h2 class="card-title">{product.seleccion}</h2>
                        <h2 class="card-title">{product.precioVenta}</h2>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
)}
*/