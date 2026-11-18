
export default function errorHandler(err, req, res, next) {
    console.error(err);
  
    let status = err.status || 500;
    let mensaje = err.status ? err.message : "Error interno del servidor";
  
    if (err.code === "23505") {
      status = 409;
      mensaje = "Ya existe un registro con esos datos";
    }
  
    if (err.code === "23503") {
      status = 409;
      mensaje = "La operación no es válida por una relación existente o inexistente";
    }
  
    if (["23502", "23514", "22P02", "22003"].includes(err.code)) {
      status = 400;
      mensaje = "Los datos enviados no son válidos";
    }
  
    res.status(status).json({
      ok: false,
      message: mensaje
    });
  }
  