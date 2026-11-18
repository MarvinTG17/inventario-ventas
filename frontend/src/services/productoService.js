
import api from "./api";

export async function obtenerProductos(busqueda = "") {
  const respuesta = await api.get("/productos", {
    params: { search: busqueda }
  });

  return respuesta.data.data;
}

export async function obtenerProducto(id) {
  const respuesta = await api.get(`/productos/${id}`);
  return respuesta.data.data;
}

export async function registrarProducto(datos) {
  const respuesta = await api.post("/productos", datos);
  return respuesta.data.data;
}

export async function actualizarProducto(id, datos) {
  const respuesta = await api.put(`/productos/${id}`, datos);
  return respuesta.data.data;
}

export async function desactivarProducto(id) {
  await api.delete(`/productos/${id}`);
}
