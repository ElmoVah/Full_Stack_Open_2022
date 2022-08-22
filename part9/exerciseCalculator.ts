interface Iresult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

const calculateExercises = (values: Array<number>, target: number): Iresult => {
  const periodLength = values.length
  const trainingDays = values.filter(value => value > 0).length
  const trainingHours = values.reduce((sum, value) => sum + value, 0)
  const success = periodLength * target <= trainingHours
  const raiting = (): number => {
    if (success) return 3
    if (trainingHours >= 0.5 * target * trainingDays) return 2
    return 1
  }

  const derscription = (): String => {
    switch (raiting()) {
      case (1):
        return 'are you really trying?'
      case (2):
        return 'not too bad but could be better'
      case (3):
        return 'nicely done, keep up the good work!'
      default:
        throw new Error('Something went wrong!')
    }
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: raiting(),
    ratingDescription: derscription(),
    target: target,
    average: trainingHours / periodLength
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))