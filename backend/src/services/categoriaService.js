import * as repo from "../repositories/categoriaRepository.js";

function validarId(id) {
    const numero = Number(id);
  
    if (!Number.isSafeInteger(numero) || numero <= 0) {
        const error = new Error("ID de categoría inválido");
        error.status = 400;
        throw error;
    }
    return numero;
}
  
function validarNombre(nombre) {
    if ( typeof nombre !== "string" || !nombre.trim() || nombre.trim().length > 100) {
        const error = new Error( "El nombre debe tener entre 1 y 100 caracteres");
        error.status = 400;
        throw error;
    }
    return nombre.trim();
}

function validarEstado(estado) {
    if (estado === true || estado === 1) return true;
    if (estado === false || estado === 0) return false;

    const error = new Error("El estado debe ser true, false, 1 o 0");
    error.status = 400;
    throw error;
}

export async function listarCategorias() {
    return repo.listar();
}

export async function obtenerCategoriaPorId(id){
    const categoria = await repo.obtenerPorId(id);
    if (!categoria){
        const error = new Error("Categoria no encontrada");
        error.status = 404;
        throw error;
    }
    return categoria;
}

export async function registrarCategoria(datos) {
    const nombre = validarNombre(datos?.nombre);
    return repo.crear(nombre);
}

export async function editarCategoria(id, datos) {
    const categoria = await repo.actualizar(
        validarId(id),
        validarNombre(datos?.nombre),
        validarEstado(datos?.estado)
    );

    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }

    return categoria;
}
  
export async function eliminarCategoria(id) {
    const categoria = await repo.eliminar(validarId(id));

    if (!categoria) {
        const error = new Error("Categoría no encontrada");
        error.status = 404;
        throw error;
    }

    return categoria;
}