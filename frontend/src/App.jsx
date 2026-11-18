
import { Routes, Route } from "react-router";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route 
          path="/" 
          element={<Dashboard />} />

        <Route 
          path="/productos" 
          element={<Productos />} />

        <Route
          path="/productos/categorias"
          element={<Categorias />}
        />

        <Route
          path="/compras"
          element={
            <ModulePage
              titulo="Compras"
              descripcion="Registro y consulta de compras"
            />
          }
        />

        <Route
          path="/ventas"
          element={
            <ModulePage
              titulo="Ventas"
              descripcion="Registro y consulta de ventas"
            />
          }
        />

        <Route
          path="/inventario"
          element={
            <ModulePage
              titulo="Inventario"
              descripcion="Consulta de stock y movimientos"
            />
          }
        />

        <Route
          path="/usuarios"
          element={
            <ModulePage
              titulo="Usuarios"
              descripcion="Administración de usuarios y roles"
            />
          }
        />

        <Route
          path="/reportes"
          element={
            <ModulePage
              titulo="Reportes"
              descripcion="Reportes de compras, ventas y productos"
            />
          }        />

        <Route
          path="*"
          element={
            <ModulePage
              titulo="Página no encontrada"
              descripcion="La ruta solicitada no existe"
            />
          }
        />
      </Route>
    </Routes>
  );
}
