import * as service from "../services/categoriaService.js";

export async function listar(req, res) {
    const datos = await service.listarCategorias();

    res.json({
        ok: true, 
        data: datos 
    });
}

export async function obtenerPorId(req, res) {
    const dato = await service.obtenerCategoriaPorId(req.params.id);

    res.json({
        ok: true, 
        data: dato 
    });
}

export async function crear(req, res) {
    const dato = await service.registrarCategoria(req.body);

    res.status(201).json({
        ok: true,
        message: "Categoría registrada",
        data: dato,
    });
}

export async function actualizar(req, res) {
    const dato = await service.editarCategoria(req.params.id, req.body);

    res.json({
        ok: true,
        message: "Categoría actualizada",
        data: dato,
    });
}

export async function eliminar(req, res) {
    const dato = await service.eliminarCategoria(req.params.id);

    res.json({
        ok: true,
        message: dato.estado ? "Categoría activada" : "Categoría desactivada",
        data: dato
    });
}
