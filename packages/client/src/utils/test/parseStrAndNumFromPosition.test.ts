import { parseStrAndNumFromPosition } from "../parseStrAndNumFromPosition";

describe("parseStrAndNumFromPosition", () => {
  const input1 = "A1";
  const input2 = "B11";

  const expect1 = ["A", 1];
  const expect2 = ["B", 11];

  test("should return the correct parsed data", () => {
    expect(parseStrAndNumFromPosition(input1)).toEqual(expect1);
    expect(parseStrAndNumFromPosition(input2)).toEqual(expect2);
  });
});
