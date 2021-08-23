interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDesciption: string,
  target: number,
  average: number
}

const exerciseCalculator = (exersices: number[], target: number): Result => {
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
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));