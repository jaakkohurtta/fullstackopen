const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (((height/100)**2));

  if(bmi < 18.5) {
    return `underweight, bmi: ${bmi}`;
  } else if(bmi < 25) {
    return `normal weight, bmi: ${bmi}`;
  } else if(bmi < 30) {
    return `overweight, bmi: ${bmi}`;
  } else {
    return `obese, bmi: ${bmi}`;
  }
}

console.log(calculateBmi(180, 74));