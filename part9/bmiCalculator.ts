interface IcalculatorValues {
  height: number,
  mass: number
}

const parseBmiArguments = (args: Array<String>): IcalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    
    if(Number(args[2]) <= 0) {
      throw new Error('Value of height must be above 0')
    }

    if(Number(args[3]) <= 0) {
      throw new Error('Value of mass must be above 0')
    }

    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, mass: number) : String => {
  const bmi = mass / ((height / 100) ** 2)
  switch(true){
    case (bmi < 16):
      return 'Underweight (Severe thinness)'
    case (bmi < 17):
      return 'Underweight (Moderate thinness)'
    case (bmi < 18.5):
      return 'Underweight (Mild thinness)'
    case (bmi < 25):
      return 'Normal range'
    case (bmi < 30):
      return 'Overweight (Pre-obese)'
    case (bmi < 35):
      return 'Obese (Class I)'
    case (bmi < 40):
      return 'Obese (Class II)'
    case (bmi >= 40):
      return 'Obese (Class III)'
    default:
      throw new Error('Something went wrong!')
  }
}

try{
  const { height, mass } = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, mass))
} catch (error: unknown) {
  let errorMessage = 'Something bad happend'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

