import { pgDateToReadable } from "../pgDateToReadable";

describe("pgDateToReadable", () => {
  const input1 = "2022-11-09 00:01:00.047994";
  const input2 = "2022-11-09 23:56:50.059851";

  const expect1 = "09/11/2022 00:01";
  const expect2 = "09/11/2022 23:56";

  test("should return the correct formatted date", () => {
    expect(pgDateToReadable(input1)).toEqual(expect1);
    expect(pgDateToReadable(input2)).toEqual(expect2);
  });
});
