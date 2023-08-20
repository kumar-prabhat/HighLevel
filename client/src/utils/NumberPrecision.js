const numberPrecision = (number) => {
  let numArr = `${number}`.split(".");
  let decimals;
  if (numArr[1]?.length > 4) {
    decimals = numArr[1].slice(0, 4);
  } else {
    decimals = numArr[1];
  }
  numArr[1] = decimals;
  return Number(numArr.join("."));
};

export { numberPrecision };
