#!/bin/sh
#echo "Esperando a la base de datos..."
#while ! nc -z db 5432; do
#  sleep 1
#done
#echo "Base de datos disponible!"

#npm start

#!/bin/sh

echo "⏳ Esperando a que PostgreSQL esté disponible en $PGHOST:$PGPORT... ($PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$POSTGRES_DB)"
until nc -z "$PGHOST" "$PGPORT"; do
  sleep 1
done

echo "✅ PostgreSQL disponible. Creando tablas..."

# Ejecutar las sentencias SQL
psql "postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$POSTGRES_DB" <<EOF
CREATE TABLE IF NOT EXISTS articulo (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2),
  fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS linea_pedido (
  id SERIAL PRIMARY KEY,
  articulo_id INTEGER NOT NULL,
  pedido_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  FOREIGN KEY (articulo_id) REFERENCES articulo(id) ON DELETE CASCADE
);
EOF

echo "✅ Tablas creadas. Iniciando servidor..."

# Iniciar tu app
npm run start