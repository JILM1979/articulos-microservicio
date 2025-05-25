import express from 'express';
import cors from 'cors';
import articulosRoutes from './routes/articulos.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/articulos', articulosRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Microservicio escuchando en http://localhost:${PORT}`);
});
