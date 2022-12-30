import { getBreakpointValue } from "../../hooks/useScreenIsLargerThan";



describe("getBreakpointValue", () => {
  const input1 = "sm"
  const input2 = "md"
  const input3 = "lg"
  const input4 = "xl"
  const input5 = "2xl"

  const expect1 = 640
  const expect2 = 768
  const expect3 = 1024
  const expect4 = 1280
  const expect5 = 1536

  test("should return the correct parsed data", () => {
    expect(getBreakpointValue(input1)).toEqual(expect1);
    expect(getBreakpointValue(input2)).toEqual(expect2);
    expect(getBreakpointValue(input3)).toEqual(expect3);
    expect(getBreakpointValue(input4)).toEqual(expect4);
    expect(getBreakpointValue(input5)).toEqual(expect5);
  });
});
