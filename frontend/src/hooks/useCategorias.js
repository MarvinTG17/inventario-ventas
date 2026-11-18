
import { useCallback, useEffect, useState } from "react";
import * as service from "../services/categoriaService";

export default function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarCategorias = useCallback(async () => {
    setCargando(true);
    setError("");

    try {
      const datos = await service.obtenerCategorias();
      setCategorias(datos);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Error al cargar categorías"
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarCategorias();
  }, [cargarCategorias]);

  return {
    categorias,
    cargando,
    error,
    cargarCategorias
  };
}
