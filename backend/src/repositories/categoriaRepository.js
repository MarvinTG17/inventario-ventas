import pool from "../config/database.js";

export async function listar() {
    const resultado = await pool.query(
        "SELECT * FROM categorias /*WHERE estado = TRUE*/ ORDER BY nombre"
    );
    return resultado.rows;
}

export async function obtenerPorId(id) {
    const resultado = await pool.query(
        "SELECT * FROM categorias WHERE id = $1 /*AND estado = TRUE*/", [id]
    );
    return resultado.rows[0];
}

export async function crear(nombre) {
    const resultado = await pool.query(
        "INSERT INTO categorias (nombre) VALUES ($1) RETURNING *", [nombre]
    );
    return resultado.rows[0];
}
  
export async function actualizar(id, nombre, estado) {
    const resultado = await pool.query(
        "UPDATE categorias SET nombre = $1, estado = $2 WHERE id = $3 RETURNING *", [nombre, estado, id]
    );
    return resultado.rows[0];
}
  
export async function eliminar(id) {
    const resultado = await pool.query(
        "UPDATE categorias SET estado = NOT estado WHERE id = $1 RETURNING id, estado",[id]
    );
    return resultado.rows[0];
}