import { Routes, Route } from "react-router-dom";

//importa todas as páginas
import Home from "../features/Home";
import Cadastro from "../features/auth/Cadastro.jsx";
import Login from "../features/auth/Login.jsx"; 
import Perfil from "../features/auth/Perfil.jsx";
import PaginaPublica from "../features/public/PaginaPublica.jsx";
import Dashboard from "../features/public/Dashboard/Dashboard.jsx";
import Agendamento from "../features/public/Agendamento.jsx";
import SobreNoix from "../features/public/sobre_nos.jsx";

 function AppRoutes() {

  //só faz o routes, sem segredo
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/a/:username" element={<PaginaPublica />} />
      <Route path="/sobrenos" element={<SobreNoix />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/agenda/:username" element={<Agendamento />} />
      

    </Routes>
  );
}
export default AppRoutes;