import { useEffect } from "react";
import "./App.css";
import { Login } from "./components/Login";
import Salones from "./components/Salones";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={
            <ProtectedRoute>
            <Salones />
          </ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ProtectedRoute = ({redirectPath = "/", children})=>{
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('firebaseToken')
    if(!token){
      navigate(redirectPath)
    }
  }, [])
  
  return children;
}

export default App;
