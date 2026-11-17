
import { Routes, Route } from "react-router";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route 
          path="/productos"
          element={
            <ModulePage
              titulo="Productos"
              descripcion="Administración de productos y categorías"
            />
          }
        />

        <Route
          path="/proveedores"
          element={
            <ModulePage
              titulo="Proveedores"
              descripcion="Administración de proveedores"
            />
          }
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
