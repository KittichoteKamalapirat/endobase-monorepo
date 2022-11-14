import snakeToCamelCase from "../snakeToCamelCase";

describe("snakeToCamelCase", () => {
  test("should convert a snake_case string to camelCase", () => {
    expect(snakeToCamelCase("snake_case")).toBe("snakeCase");
  });

  test("camelCase should remain camelCase", () => {
    expect(snakeToCamelCase("camelCase")).toBe("camelCase");
  });

  test("should return an empty string if passed an empty string", () => {
    expect(snakeToCamelCase("")).toBe("");
  });
});
