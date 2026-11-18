
import { useEffect, useState } from "react";

const formularioInicial = {
  nombre: "",
  categoria_id: "",
  precio_venta: "",
  stock_minimo: 5
};

export default function ProductoForm({
  producto,
  categorias,
  onGuardar,
  onCancelar
}) {
  const [datos, setDatos] = useState(formularioInicial);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setDatos(
      producto
        ? {
            nombre: producto.nombre,
            categoria_id: producto.categoria_id,
            precio_venta: producto.precio_venta,
            stock_minimo: producto.stock_minimo
          }
        : formularioInicial
    );
  }, [producto]);

  function cambiar(evento) {
    const { name, value } = evento.target;

    setDatos(anterior => ({
      ...anterior,
      [name]: value
    }));
  }

  async function enviar(evento) {
    evento.preventDefault();
    setGuardando(true);

    try {
      await onGuardar(datos);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="card card-body mb-4">
      <h5>{producto ? "Editar producto" : "Nuevo producto"}</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            className="form-control"
            value={datos.nombre}
            onChange={cambiar}
            maxLength={150}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            name="categoria_id"
            className="form-select"
            value={datos.categoria_id}
            onChange={cambiar}
            required
          >
            <option value="">Seleccione</option>

            {categorias.map(c => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio de venta</label>
          <input
            type="number"
            name="precio_venta"
            className="form-control"
            min="0"
            step="0.01"
            value={datos.precio_venta}
            onChange={cambiar}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stock mínimo</label>
          <input
            type="number"
            name="stock_minimo"
            className="form-control"
            min="0"
            step="1"
            value={datos.stock_minimo}
            onChange={cambiar}
            required
          />
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-primary" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
