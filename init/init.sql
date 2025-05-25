CREATE TABLE IF NOT EXISTS articulo (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2),
  fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nueva tabla linea_pedido
CREATE TABLE IF NOT EXISTS linea_pedido (
  id SERIAL PRIMARY KEY,
  articulo_id INTEGER NOT NULL,
  pedido_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  FOREIGN KEY (articulo_id) REFERENCES articulo(id) ON DELETE CASCADE
);