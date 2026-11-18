
import { useCallback, useEffect, useState } from "react";
import * as service from "../services/productoService";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = useCallback(async (busqueda = "") => {
    setCargando(true);
    setError("");

    try {
      const datos = await service.obtenerProductos(busqueda);
      setProductos(datos);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Error al cargar productos"
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return {
    productos,
    cargando,
    error,
    cargarProductos
  };
}
