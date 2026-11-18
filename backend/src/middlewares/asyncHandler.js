
export default function asyncHandler(funcion) {
    return (req, res, next) => {
      Promise.resolve(funcion(req, res, next)).catch(next);
    };
  }
  