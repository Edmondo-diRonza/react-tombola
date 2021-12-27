export const chooseCartella = (number) => {
  if (
    (number >= 1 && number <= 5) ||
    (number >= 11 && number <= 15) ||
    (number >= 21 && number <= 25)
  )
    return 0;
  else if (
    (number >= 6 && number <= 10) ||
    (number >= 16 && number <= 20) ||
    (number >= 26 && number <= 30)
  )
    return 1;
  else if (
    (number >= 31 && number <= 35) ||
    (number >= 41 && number <= 45) ||
    (number >= 51 && number <= 55)
  )
    return 2;
  else if (
    (number >= 36 && number <= 40) ||
    (number >= 46 && number <= 50) ||
    (number >= 56 && number <= 60)
  )
    return 3;
  else if (
    (number >= 61 && number <= 65) ||
    (number >= 71 && number <= 75) ||
    (number >= 81 && number <= 85)
  )
    return 4;
  else return 5;
};

export const chooseRowCartella = (number) => {
  if (
    (number >= 1 && number <= 10) ||
    (number >= 31 && number <= 40) ||
    (number >= 61 && number <= 70)
  )
    return "r0";
  else if (
    (number >= 11 && number <= 20) ||
    (number >= 41 && number <= 50) ||
    (number >= 71 && number <= 80)
  )
    return "r1";
  else return "r2";
};
