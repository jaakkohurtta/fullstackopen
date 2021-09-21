interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDesciption: string,
  target: number,
  average: number
}

export const exerciseCalculator = (target: number, exersices: number[]): Result => {
  const average = exersices.reduce((sum, e) => sum + e) / exersices.length;
  let rating: number,
      ratingDesciption: string;
  
  if(average / target < 0.75) {
    rating = 1;
    ratingDesciption = "Good work, but you need to pick up the pace if you want to hit your targets!";
  } else if(average / target < 1.25) {
    rating = 2;
    ratingDesciption = "Good, honest work!";
  } else {
    rating = 3;
    ratingDesciption = "Good work! You exceeded your target by a mile!";
  }

  return {
    periodLength: exersices.length,
    trainingDays: exersices.filter(e => e !== 0).length,
    success: target <= average,
    rating,
    ratingDesciption,
    target,
    average
  };
};

interface ParseExercisesArgsResult {
  target: number,
  exercises: number[]
}

const parseExerciseArgs = (args: Array<string>): ParseExercisesArgsResult => {
  if(args.length < 4) {
    throw new Error("Too few arguments, provide at least 2");
  }

  args.forEach((arg, index) => {
    if(index > 1 && isNaN(Number(args[index]))) {
      throw new Error(`Invalid argument "${arg}". Use numbers only`);
    }
  });

  return {
    target: Number(args[2]),
    exercises: args.slice(3).map(a => Number(a))
  };
};

// console.log(process.argv)

if(process.argv[1] !== "app.ts") {
  try {
    const { target, exercises } = parseExerciseArgs(process.argv);
    console.log(exerciseCalculator(target, exercises));
  }
  catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Error,", error.message);
  }
}