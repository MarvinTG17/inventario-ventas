
import api from "./api";

export async function obtenerCategorias() {
  const respuesta = await api.get("/categorias");
  return respuesta.data.data;
}

export async function obtenerCategoria(id) {
  const respuesta = await api.get(`/categorias/${id}`);
  return respuesta.data.data;
}

export async function registrarCategoria(datos) {
  const respuesta = await api.post("/categorias", datos);
  return respuesta.data.data;
}

export async function actualizarCategoria(id, datos) {
  const respuesta = await api.put(`/categorias/${id}`, datos);
  return respuesta.data.data;
}

export async function eliminarCategoria(id) {
  await api.delete(`/categorias/${id}`);
}
