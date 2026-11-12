
-- 1. CATEGORÍAS
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- 2. PRODUCTOS
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    categoria_id INT NOT NULL,
    precio_venta NUMERIC(12,2) NOT NULL CHECK (precio_venta >= 0),
    stock_actual INT NOT NULL DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo INT NOT NULL DEFAULT 5 CHECK (stock_minimo >= 0),
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- 3. PROVEEDORES
CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    ruc VARCHAR(11) NOT NULL UNIQUE CHECK (ruc ~ '^[0-9]{11}$'),
    telefono VARCHAR(20),
    correo VARCHAR(150)
);

-- 4. USUARIOS
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    rol VARCHAR(20) NOT NULL
        CHECK (rol IN ('ADMIN', 'VENDEDOR')),
    estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. COMPRAS
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    proveedor_id INT NOT NULL REFERENCES proveedores(id),
    usuario_id INT REFERENCES usuarios(id),
    fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total NUMERIC(12,2) NOT NULL CHECK (total >= 0)
);

-- 6. DETALLE DE COMPRAS
CREATE TABLE compra_detalles (
    id SERIAL PRIMARY KEY,
    compra_id INT NOT NULL REFERENCES compras(id),
    producto_id INT NOT NULL REFERENCES productos(id),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    costo_unitario NUMERIC(12,2) NOT NULL CHECK (costo_unitario >= 0),
    subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0)
);

-- 7. VENTAS
CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total NUMERIC(12,2) NOT NULL CHECK (total >= 0)
);

-- 8. DETALLE DE VENTAS
CREATE TABLE venta_detalles (
    id SERIAL PRIMARY KEY,
    venta_id INT NOT NULL REFERENCES ventas(id),
    producto_id INT NOT NULL REFERENCES productos(id),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12,2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0)
);

-- 9. MOVIMIENTOS DE INVENTARIO
CREATE TABLE movimientos_inventario (
    id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL REFERENCES productos(id),
    tipo VARCHAR(10) NOT NULL
        CHECK (tipo IN ('ENTRADA', 'SALIDA')),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    compra_detalle_id INT REFERENCES compra_detalles(id),
    venta_detalle_id INT REFERENCES venta_detalles(id),

    CONSTRAINT chk_movimiento_origen CHECK (
        (
            tipo = 'ENTRADA'
            AND compra_detalle_id IS NOT NULL
            AND venta_detalle_id IS NULL
        )
        OR
        (
            tipo = 'SALIDA'
            AND venta_detalle_id IS NOT NULL
            AND compra_detalle_id IS NULL
        )
    ),

    CONSTRAINT uq_movimiento_compra UNIQUE (compra_detalle_id),
    CONSTRAINT uq_movimiento_venta UNIQUE (venta_detalle_id)
);

-- ÍNDICES PARA BÚSQUEDAS Y RELACIONES
CREATE INDEX idx_productos_categoria
    ON productos(categoria_id);

CREATE INDEX idx_compras_proveedor
    ON compras(proveedor_id);

CREATE INDEX idx_compra_detalles_compra
    ON compra_detalles(compra_id);

CREATE INDEX idx_venta_detalles_venta
    ON venta_detalles(venta_id);

CREATE INDEX idx_movimientos_producto_fecha
    ON movimientos_inventario(producto_id, fecha);
