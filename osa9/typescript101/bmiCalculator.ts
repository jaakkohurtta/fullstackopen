export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (((height/100)**2));

  if(bmi < 18.5) {
    return "underweight";
  } else if(bmi < 25) {
    return "normal weight";
  } else if(bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

interface ParseBmiArgsResult {
  height: number,
  weight: number
}

const parseBmiArgs = (args: Array<string>): ParseBmiArgsResult => {
  if(args.length > 4) {
    throw new Error("Too many arguments");
  }
  if(args.length < 4) {
    throw new Error("Not enough arguments");
  }

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error("Please provide valid numbers");
  }
};

// console.log(process.argv);

if(process.argv[1] !== "app.ts") {
  try {
    const { height, weight } = parseBmiArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } 
  catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Error,", error.message);
  }
}