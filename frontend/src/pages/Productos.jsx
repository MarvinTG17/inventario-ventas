
import { useState } from "react";
import { Link } from "react-router";

import ProductoForm from "../components/productos/ProductoForm";
import useProductos from "../hooks/useProductos";
import useCategorias from "../hooks/useCategorias";

import * as service from "../services/productoService";

export default function Productos() {
  const {
    productos,
    cargando,
    error,
    cargarProductos
  } = useProductos();

  const { categorias } = useCategorias();

  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function guardar(datos) {
    setMensaje("");

    try {
      if (editando) {
        await service.actualizarProducto(editando.id, datos);
      } else {
        await service.registrarProducto(datos);
      }

      await cargarProductos(busqueda);

      setMensaje("Producto guardado correctamente");
      setEditando(null);
      setMostrarForm(false);
    } catch (err) {
      setMensaje(
        err.response?.data?.message ||
        "Error al guardar producto"
      );
    }
  }

  async function desactivar(producto) {
    const accion = producto.estado ? "desactivar" : "activar";
    if (!window.confirm(`¿${accion} este producto?`)) {
      return;
    }

    setMensaje("");

    try {
      await service.desactivarProducto(producto.id);
      await cargarProductos(busqueda);
      setMensaje(producto.estado ? "Producto desactivado" : "Producto activado");
    } catch (err) {
      setMensaje(
        err.response?.data?.message ||
        "Error al desactivar producto"
      );
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Productos</h3>

        <div className="d-flex gap-2">
          <Link
            to="/productos/categorias"
            className="btn btn-outline-secondary"
          >
            Categorías
          </Link>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditando(null);
              setMostrarForm(true);
            }}
          >
            + Nuevo producto
          </button>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-info">{mensaje}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {mostrarForm && (
        <ProductoForm
          producto={editando}
          categorias={categorias}
          onGuardar={guardar}
          onCancelar={() => {
            setMostrarForm(false);
            setEditando(null);
          }}
        />
      )}

      <div className="card">
        <div className="card-body">
          <form
            className="d-flex gap-2 mb-3"
            onSubmit={e => {
              e.preventDefault();
              cargarProductos(busqueda);
            }}
          >
            <input
              className="form-control"
              placeholder="Buscar producto"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />

            <button className="btn btn-primary">
              Buscar
            </button>
          </form>

          {cargando ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map(p => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>
                        S/ {Number(p.precio_venta).toFixed(2)}
                      </td>
                      <td>{p.stock_actual}</td>
                      <td>{p.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => {
                            setEditando(p);
                            setMostrarForm(true);
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className={`btn btn-sm btn-outline-${p.estado ? 'danger' : 'primary'}`}
                          onClick={() => desactivar(p)}
                        >
                          {p.estado ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No hay productos
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
