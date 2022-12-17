import { decodeSts } from "../decodeSts";

describe("decodeSts", () => {
  const input1 = 255;
  const input2 = 0;
  //   const input2 = 20

  const expect1 = {
    door1IsClosed: true,
    door2IsClosed: true,
    pressureIsLow: true,
    dehumidifierIsOn: true,
    door1IsUnlocked: true,
    door2IsUnlocked: true,
    dryingInProgress: true,
    airValveIsOn: true,
  };

  const expect2 = {
    door1IsClosed: false,
    door2IsClosed: false,
    pressureIsLow: false,
    dehumidifierIsOn: false,
    door1IsUnlocked: false,
    door2IsUnlocked: false,
    dryingInProgress: false,
    airValveIsOn: false,
  };

  test("should return the correct info", () => {
    expect(decodeSts(input1)).toEqual(expect1);
    expect(decodeSts(input2)).toEqual(expect2);
    // expect(decodeSts(input2)).toEqual(expect2);
  });
});
