import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Proveedor from "./componentes/Proveedor";
import Producto from "./componentes/Producto";
import Pedido from "./componentes/Pedido";
import Cliente from "./componentes/Cliente";
import Catalogo from "./componentes/Catalogo";
import { Auth } from "./componentes/Auth";



function App() {
  return (
    <div className="miApp">
      <div className="container">
        <h2 className="d-flex justify-content-center align-item-center pt-3">
          Welcome to my page{" "}
        </h2>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth></Auth>}></Route>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <Navbar />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/producto"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Producto></Producto>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/proveedor"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Proveedor></Proveedor>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cliente"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Cliente></Cliente>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/catalogo"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Catalogo></Catalogo>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/pedido"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Pedido></Pedido>
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("firebaseToken");

    if (!token) {
      navigate(redirectPath);
    }
  }, []);

  return children;
};

export default App;
