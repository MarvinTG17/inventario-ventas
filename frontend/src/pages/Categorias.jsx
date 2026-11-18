
import { useState } from "react";
import { Link } from "react-router";

import CategoriaForm from "../components/categorias/CategoriaForm";
import useCategorias from "../hooks/useCategorias";
import * as service from "../services/categoriaService";

export default function Categorias() {
  const { categorias, cargando, error, cargarCategorias } = useCategorias();
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function guardar(datos) {
    setMensaje("");

    try {
      if (editando) {
        await service.actualizarCategoria(editando.id, datos);
      } else {
        await service.registrarCategoria(datos);
      }

      setMensaje("Categoría guardada correctamente");
      setEditando(null);
      setMostrarForm(false);

      await cargarCategorias();
    } catch (err) {
      setMensaje(
        err.response?.data?.message ||
        "Error al guardar categoría"
      );
    }
  }

  async function eliminar(categoria) {
    const accion = categoria.estado ? "desactivar" : "activar";
    if (!window.confirm(`¿${accion} esta categoría?`)) {
      return;
    }

    setMensaje("");

    try {
      await service.eliminarCategoria(categoria.id);
      await cargarCategorias();
      setMensaje(categoria.estado ? "Categoría desactivada" : "Categoría activada");
    } catch (err) {
      setMensaje(
        err.response?.data?.message ||
        "No se pudo eliminar la categoría"
      );
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Categorías</h3>
          <Link to="/productos">Volver a productos</Link>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditando(null);
            setMostrarForm(true);
          }}
        >
          + Nueva categoría
        </button>
      </div>

      {mensaje && (
        <div className="alert alert-info">{mensaje}</div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {mostrarForm && (
        <CategoriaForm
          categoria={editando}
          onGuardar={guardar}
          onCancelar={() => {
            setMostrarForm(false);
            setEditando(null);
          }}
        />
      )}

      <div className="card">
        <div className="card-body">
          {cargando ? (
            <p>Cargando categorías...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {categorias.map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.nombre}</td>
                      <td>{c.estado ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => {
                            setEditando(c);
                            setMostrarForm(true);
                          }}
                        >
                          Editar
                        </button>

                        <button
                          className={`btn btn-sm btn-outline-${c.estado ? 'danger' : 'primary'}`}
                          onClick={() => eliminar(c)}
                        >
                          {c.estado ? "Desactivar" : "Activar"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {categorias.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No hay categorías
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
