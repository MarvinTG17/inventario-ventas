
const indicadores = [
    { titulo: "Ventas del día", valor: "S/ 0.00" },
    { titulo: "Productos", valor: "4" },
    { titulo: "Stock bajo", valor: "4" },
    { titulo: "Compras del mes", valor: "S/ 0.00" }
  ];
  
  export default function Dashboard() {
    return (
      <div>
        <h3 className="mb-1">Panel principal</h3>
  
        <p className="text-secondary mb-4">
          Resumen general del sistema
        </p>
  
        <div className="row g-3">
          {indicadores.map((item) => (
            <div
              className="col-12 col-sm-6 col-xl-3"
              key={item.titulo}
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <p className="text-secondary mb-2">
                    {item.titulo}
                  </p>
  
                  <h3 className="mb-0">{item.valor}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5>Resumen de ventas</h5>
  
            <p className="text-secondary mb-0">
              El gráfico se implementará en la etapa
              de Dashboard y Reportes.
            </p>
          </div>
        </div>
      </div>
    );
  }
  