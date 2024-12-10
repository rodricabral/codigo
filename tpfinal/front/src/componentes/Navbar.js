import { Link } from "react-router-dom";
import  '../componentes/estilos.css';


function Navbar() {
  return (
    <div>
      <nav className="d-flex justify-content-center align-item-center ">
        <Link className="navbar Link me-3" to="/producto">
          Producto
        </Link>
        <Link className="navbar Link me-3" to="/proveedor">
          Proveedor
        </Link>
        <Link className="navbar Link me-3" to="/cliente">
          Cliente
        </Link>
        <Link className="navbar Link me-3" to="/catalogo">
          Catalogo
        </Link>
        <Link className="navbar Link me-3" to="/pedido">
          Pedido
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;