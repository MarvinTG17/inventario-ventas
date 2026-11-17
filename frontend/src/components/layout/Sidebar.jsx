
import { NavLink } from "react-router";

const menuItems = [
  { nombre: "Dashboard", ruta: "/" },
  { nombre: "Productos", ruta: "/productos" },
  { nombre: "Proveedores", ruta: "/proveedores" },
  { nombre: "Compras", ruta: "/compras" },
  { nombre: "Ventas", ruta: "/ventas" },
  { nombre: "Inventario", ruta: "/inventario" },
  { nombre: "Usuarios", ruta: "/usuarios" },
  { nombre: "Reportes", ruta: "/reportes" }
];

export default function Sidebar({ abierto, cerrarMenu }) {
  return (
    <>
      {abierto && (
        <div
          className="sidebar-overlay"
          onClick={cerrarMenu}
        />
      )}

      <aside className={`sidebar ${abierto ? "open" : ""}`}>
        <div className="sidebar-brand">
          <h5>📦 Inventario</h5>
          <small>Sistema de Ventas</small>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.ruta}
              to={item.ruta}
              end={item.ruta === "/"}
              onClick={cerrarMenu}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {item.nombre}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
