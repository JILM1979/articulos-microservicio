import express from 'express';
import cors from 'cors';
import articulosRoutes from './routes/articulos.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/articulos', articulosRoutes);

//const PORT = 80;
const PORT = process.env.PORT || 3000;
console.log('PUERTO QUE USARÁ EXPRESS:', PORT);
app.listen(PORT, () => {
  console.log(`Microservicio escuchando en :${PORT}`);
});
