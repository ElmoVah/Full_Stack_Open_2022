import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing"
    });
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  const areNumbers = (values: Array<number>): boolean => {
    return values.every(value => !isNaN(Number(value)));
  };

  if (isNaN(Number(target)) || !areNumbers) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  res.json(calculateExercises(daily_exercises as [], Number(target)));


});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});