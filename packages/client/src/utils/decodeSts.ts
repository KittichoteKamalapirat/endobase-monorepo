export const dec2bin = (dec: number) => {
  return (dec >>> 0).toString(2);
};

export interface StsInfo {
  doorIsClosed: boolean;
  // door2IsClosed: boolean,
  pressureIsLow: boolean;
  // dehumidifierIsOn: boolean,
  // doorIsUnlocked: boolean,
  // door2IsUnlocked: boolean,
  dryingInProgress: boolean;
  airValveIsOn: boolean;
}
export const decodeSts = (input: number): StsInfo => {
  const binary = dec2bin(input);
  const binaryStr = binary.toString();
  console.log("binary", binary);
  console.log("binaryStr", binaryStr);
  const result = {
    doorIsClosed: binaryStr[7] === "1", // bit 0
    // door2IsClosed: binaryStr[6] === "1", // bit 1
    pressureIsLow: binaryStr[5] === "1", // bit 2
    // dehumidifierIsOn: binaryStr[4] === "1", // bit 3
    // doorIsUnlocked: binaryStr[3] === "1", // bit 4
    // door2IsUnlocked: binaryStr[2] === "1", // bit 5
    dryingInProgress: binaryStr[1] === "1", // bit 6
    airValveIsOn: binaryStr[0] === "1", // bit 7
  };

  console.log("result", result);
  return result;
};
