
import * as repo from "../repositories/productoRepository.js";

function crearError(mensaje, status = 400) {
  const error = new Error(mensaje);
  error.status = status;
  throw error;
}

function validarId(id) {
  const numero = Number(id);

  if (!Number.isSafeInteger(numero) || numero <= 0) {
    crearError("ID inválido");
  }

  return numero;
}

function validarDatos(datos) {
  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    crearError("Los datos del producto son obligatorios");
  }

  if ( typeof datos.nombre !== "string" || !datos.nombre.trim() || datos.nombre.trim().length > 150) {
    crearError("Nombre de producto inválido");
  }

  const categoriaId = validarId(datos.categoria_id);

  const precioTexto = String(datos.precio_venta ?? "");
  const precio = Number(precioTexto);

  if ( !/^\d+(\.\d{1,2})?$/.test(precioTexto) || !Number.isFinite(precio) || precio > 9999999999.99) {
    crearError("Precio inválido. Máximo 2 decimales");
  }

  const minimo = Number(datos.stock_minimo);

  if ( datos.stock_minimo === "" ||  datos.stock_minimo == null || !Number.isSafeInteger(minimo) || minimo < 0 ) {
    crearError("Stock mínimo inválido");
  }

  return {
    nombre: datos.nombre.trim(),
    categoria_id: categoriaId,
    precio_venta: precioTexto,
    stock_minimo: minimo
  };
}

export async function listarProductos(busqueda = "") {
  if (typeof busqueda !== "string") {
    crearError("La búsqueda debe ser texto");
  }

  return repo.listar(busqueda.trim());
}

export async function obtenerProducto(id) {
  const producto = await repo.obtenerPorId(validarId(id));

  if (!producto) {
    crearError("Producto no encontrado", 404);
  }

  return producto;
}

export async function registrarProducto(datos) {
  return repo.crear(validarDatos(datos));
}

export async function editarProducto(id, datos) {
  const producto = await repo.actualizar(
    validarId(id),
    validarDatos(datos)
  );

  if (!producto) {
    crearError("Producto no encontrado", 404);
  }

  return producto;
}

export async function desactivarProducto(id) {
  const producto = await repo.desactivar(validarId(id));

  if (!producto) {
    crearError("Producto no encontrado", 404);
  }

  return producto;
}
