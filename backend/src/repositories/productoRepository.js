import pool from "../config/database.js";

export async function listar(busqueda = "") {
    const resultado = await pool.query(
        `SELECT p.id, p.nombre, p.categoria_id, c.nombre AS categoria, p.precio_venta, p.stock_actual, p.stock_minimo, p.estado
            FROM productos p
            INNER JOIN categorias c
            ON c.id = p.categoria_id
        WHERE /*p.estado = TRUE
        AND*/ p.nombre ILIKE $1
        ORDER BY p.id DESC`, [`%${busqueda}%`],
    );

    return resultado.rows;
}

export async function obtenerPorId(id) {
    const resultado = await pool.query(
        "SELECT * FROM productos WHERE id = $1 /*AND estado = TRUE*/", [id],
    );

    return resultado.rows[0];
}

export async function crear(datos) {
    const resultado = await pool.query(
        "INSERT INTO productos (nombre, categoria_id, precio_venta, stock_minimo) VALUES ($1, $2, $3, $4) RETURNING *",
        [datos.nombre, datos.categoria_id, datos.precio_venta, datos.stock_minimo],
    );

    return resultado.rows[0];
}

export async function actualizar(id, datos) {
    const resultado = await pool.query(
        `UPDATE productos 
            SET nombre = $1,
            categoria_id = $2,
            precio_venta = $3,
            stock_minimo = $4
        WHERE id = $5 /*AND estado = TRUE*/
        RETURNING *`,
        [
            datos.nombre,
            datos.categoria_id,
            datos.precio_venta,
            datos.stock_minimo,
            id,
        ],
    );

    return resultado.rows[0];
}

export async function desactivar(id) {
    const resultado = await pool.query(
        `UPDATE productos SET estado = NOT estado WHERE id = $1 RETURNING id, estado`, [id],
    );

    return resultado.rows[0];
}
