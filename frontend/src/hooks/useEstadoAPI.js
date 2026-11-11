import { useState, useEffect } from "react";
import api from "../services/api";


export default function useEstadoAPI() {
  const [mensaje, setMensaje] = useState("Conectando...");
  const [error, setError] = useState(false);

  useEffect( () => {
    api.get("/health")
    .then( (response) => {
      setMensaje(response.data.message);
    })
    .catch( () => {
      setMensaje("No se pudo conectar con el backend");
      setError(true);
    })
  
  }, []);

  return { mensaje, error };

}