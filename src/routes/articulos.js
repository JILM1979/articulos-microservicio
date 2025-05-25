import express from 'express';
import db from '../db.js';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    console.log('Invocado get /');
    const result = await db.query('SELECT * FROM articulo ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Invocado post /');
    const { nombre, descripcion, precio } = req.body;
    const result = await db.query(
      'INSERT INTO articulo (nombre, descripcion, precio, fecha_modificacion) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nombre, descripcion, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear artículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/lineas-pedido', async (req, res) => {
  try {
    console.log('Invocado get /lineas-pedido');
    const result = await db.query('SELECT * FROM linea_pedido ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

router.post('/lineas-pedido', async (req, res) => {
  const lineas = req.body;
  console.log('Invocado post /lineas-pedido');
  if (!Array.isArray(lineas) || lineas.length === 0) {
    return res.status(400).json({ error: 'El cuerpo debe ser un array de líneas de pedido.' });
  }

  try {
    const queryText = `
      INSERT INTO linea_pedido (articulo_id, pedido_id, cantidad)
      VALUES ($1, $2, $3)
    `;

    // Ejecutar cada inserción en una transacción
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      for (const linea of lineas) {
        const { articulo_id, pedido_id, cantidad } = linea;

        if (!articulo_id || !pedido_id || !cantidad || cantidad <= 0) {
          throw new Error('Datos inválidos en una o más líneas de pedido');
        }

        await client.query(queryText, [articulo_id, pedido_id, cantidad]);
      }

      await client.query('COMMIT');
      res.status(201).json({ message: 'Líneas de pedido insertadas correctamente' });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Error al insertar líneas de pedido:', err);
      res.status(500).json({ error: 'Error al insertar líneas de pedido' });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error de conexión con la base de datos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
