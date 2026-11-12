
-- CATEGORÍAS
INSERT INTO categorias (nombre)
VALUES
    ('Computadoras'),
    ('Periféricos'),
    ('Accesorios');

-- PRODUCTOS
INSERT INTO productos (
    nombre,
    categoria_id,
    precio_venta,
    stock_minimo
)
VALUES
    ('Laptop Lenovo', 1, 2500.00, 3),
    ('Mouse Logitech', 2, 80.00, 5),
    ('Teclado mecánico', 2, 180.00, 5),
    ('Cable HDMI', 3, 35.00, 10);

-- PROVEEDORES
-- Los RUC siguientes son ficticios para pruebas.
INSERT INTO proveedores (
    razon_social,
    ruc,
    telefono,
    correo
)
VALUES
    (
        'Distribuidora Demo A',
        '10000000001',
        '999111222',
        'proveedor.a@example.com'
    ),
    (
        'Distribuidora Demo B',
        '10000000002',
        '999333444',
        'proveedor.b@example.com'
    );
