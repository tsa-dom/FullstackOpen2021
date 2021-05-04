import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface Body {
  daily_exercises: Array<number>
  target: number
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (!weight || !height) throw new Error('malformatted parameters');
    const bmi = calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmi
    });
  } catch (error) {
    res.send({
      error: (error as Error).message
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as Body;
  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
  } else if (daily_exercises.some(isNaN) || isNaN(target)) {
    res.send({ error: "malformatted paramaters"});
  } else {
    const array: Array<number> = daily_exercises.map(e => Number(e));
    res.send(calculateExercises(array, Number(target)));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});