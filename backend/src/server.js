import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.get('/api/health', (req, res) => {
  res.json({
    ok: 'true',
    message: 'Api funcionando correctamente'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});