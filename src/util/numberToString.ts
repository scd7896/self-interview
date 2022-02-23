export function numberToDigitString(number: number, digits: number) {
  const digitString = number.toString();
  const dummyZeroString = digits > digitString.length ? new Array(digits - digitString.length).fill(0).join("") : "";

  return `${dummyZeroString}${digitString}`;
}
