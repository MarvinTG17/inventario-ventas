
import { useLocation } from "react-router";

const titulos = {
  "/": "Dashboard",
  "/productos": "Productos",
  "/proveedores": "Proveedores",
  "/compras": "Compras",
  "/ventas": "Ventas",
  "/inventario": "Inventario",
  "/usuarios": "Usuarios",
  "/reportes": "Reportes"
};

export default function Header({ abrirMenu }) {
  const location = useLocation();

  const titulo = titulos[location.pathname] || "Página";

  return (
    <header className="app-header">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary d-lg-none"
          onClick={abrirMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <h4 className="mb-0">{titulo}</h4>
      </div>

      <div className="text-secondary">
        Usuario demo
      </div>
    </header>
  );
}
