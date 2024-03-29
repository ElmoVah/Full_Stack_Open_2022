import express from 'express';
import diagnoseRouter from './routes/diagnosis';
import patientRouter from './routes/patients';

const app = express();
import cors from 'cors';

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use('/api/diagnosis', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});