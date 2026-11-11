import useEstadoAPI from "../hooks/useEstadoAPI";

function EstadoAPI() {
  const { mensaje, error } = useEstadoAPI();

  return (
    <>
      <h2>Estado de conexión</h2>
      <p style={{ color: error ? "red" : "green" }}>
        {mensaje}
      </p>
    </>
  );
}

export default EstadoAPI;