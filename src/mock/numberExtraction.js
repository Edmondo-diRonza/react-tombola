export const numberExtraction = (numbers, min = 1, max = numbers) => {
  let extractedNumber = 0;
  const numberPool = [];
  let iterations = 0;

  while (numberPool.length < numbers) {
    extractedNumber = Math.floor(Math.random() * (max - min + 1) + min);

    !numberPool.includes(extractedNumber)
      ? numberPool.push(extractedNumber)
      : iterations++;
  }
  return { numbers: numberPool, iterations };
};
