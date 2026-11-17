
export default function ModulePage({ titulo, descripcion }) {
    return (
      <div>
        <h3>{titulo}</h3>
  
        <p className="text-secondary">
          {descripcion}
        </p>
  
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <p className="mb-0">
              Módulo pendiente de implementación.
            </p>
          </div>
        </div>
      </div>
    );
  }
  