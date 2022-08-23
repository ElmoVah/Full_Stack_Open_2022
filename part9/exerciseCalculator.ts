interface Iresult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

interface IinputValues {
  values: Array<number>,
  target: number
}

const parseArguments = (args: Array<String>): IinputValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const values = args.slice(3)
  console.log(values)
  const areNumbers = values.every(value => !isNaN(Number(value)))

  if (!isNaN(Number(args[2])) && areNumbers) {
    return {
      values: values.map(value => {
        return Number(value)
      }),
      target: Number(args[2])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
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

try{
  const { values, target } = parseArguments(process.argv)
  console.log(calculateExercises(values, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happend'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}