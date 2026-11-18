
import * as service from "../services/productoService.js";

export async function listar(req, res) {
  const datos = await service.listarProductos(req.query.search);

  res.json({ ok: true, data: datos });
}

export async function obtener(req, res) {
  const dato = await service.obtenerProducto(req.params.id);

  res.json({ ok: true, data: dato });
}

export async function crear(req, res) {
  const dato = await service.registrarProducto(req.body);

  res.status(201).json({
    ok: true,
    message: "Producto registrado",
    data: dato
  });
}

export async function actualizar(req, res) {
  const dato = await service.editarProducto(
    req.params.id,
    req.body
  );

  res.json({
    ok: true,
    message: "Producto actualizado",
    data: dato
  });
}

export async function eliminar(req, res) {
  const producto = await service.desactivarProducto(req.params.id);

  res.json({
    ok: true,
    message: producto.estado ? "Producto activado" : "Producto desactivado",
    data: producto
  });
}
