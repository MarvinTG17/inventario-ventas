
import { useEffect, useState } from "react";

export default function CategoriaForm({
  categoria,
  onGuardar,
  onCancelar
}) {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("1");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setNombre(categoria?.nombre || "");
    setEstado(categoria?.estado === false ? "0" : "1");
  }, [categoria]);

  async function enviar(evento) {
    evento.preventDefault();
    setGuardando(true);

    try {
      await onGuardar({
        nombre,
        estado: estado === "1" ? 1 : 0
      });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="card card-body mb-3">
      <h5>
        {categoria ? "Editar categoría" : "Nueva categoría"}
      </h5>

      <label className="form-label">Nombre</label>

      <input
        className="form-control"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        maxLength={100}
        required
      />

      <select className="form-control" value={estado} onChange={e => setEstado(e.target.value)}>
        <option value="1">Activo</option>
        <option value="0">Inactivo</option>
      </select>

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
