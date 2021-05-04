interface Values {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (days: Array<number>, target: number): Values => {
  const periodLength = days.length;
  const trainingDays = days.reduce((sum, day) => {
    if (day > 0) sum += 1;
    return sum;
  }, 0);
  const hours = days.reduce((sum, current) => sum + current, 0);
  const average = hours / periodLength;
  let success = false;
  let rating = 1;
  let ratingDescription = 'try better next time';
  if (average > target) {
    success = true;
    rating = 3;
    ratingDescription = 'good job';
  } else if (average > target * (4/5) ) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  return ({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  });
};

const parseArray = (args: Array<string>) => {
  const values = args.slice(2);
  if (values.length < 2) throw new Error('Not enough arguments');
  values.forEach(value => {
    if (isNaN(Number(value))) throw new Error('Arguments must be numbers');
  });
  const target = Number(values[0]);
  const days = values.slice(1).map(day => Number(day));
  return { target, days };
};

try {
  const { target, days } = parseArray(process.argv);
  console.log(calculateExercises(days, target));
} catch (error) {
  console.log('Something went wrong, message:', (error as Error).message);
}