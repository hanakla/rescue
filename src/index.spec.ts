import { rescue } from "./index";

describe("index", () => {
  it("should handle primitive result with success", () => {
    const [result, error] = rescue(() => "hi");

    expect(result).toBe("hi");
    expect(error).toBe(null);
  });

  it("should handle primitive result with exception", () => {
    const [result, error] = rescue((): string => {
      throw new Error("Error");
    });

    expect(result).toBe(null);
    expect(error).toMatchObject({ message: "Error" });
  });

  it("should handle Promise result with resolve", async () => {
    const [result, error] = await rescue(async () => "hi");

    expect(result).toBe("hi");
    expect(error).toBe(null);
  });

  it("should handle Promise result with reject ", async () => {
    const [result, error] = await rescue(async () => {
      throw new Error("Error");
    });

    expect(result).toBe(null);
    expect(error).toMatchObject({ message: "Error" });
  });

  it("isSuccess", () => {
    const result = rescue(() => "ok");

    if (rescue.isSuccess(result)) {
      result.result as string;
    }

    if (result.error) {
      result.error as Error;
    }

    expect(rescue.isSuccess(result)).toBe(true);
    expect(rescue.isFailure(result)).toBe(false);
  });

  it("isFailure", () => {
    const result = rescue((): string => {
      throw new Error("error");
    });

    if (rescue.isFailure(result)) {
      result.result as null;
    }

    expect(rescue.isSuccess(result)).toBe(false);
    expect(rescue.isFailure(result)).toBe(true);
  });

  describe("Sub type of Error", () => {
    it("Should handle expected Error", () => {
      class ExpectedErrror extends Error {}

      const [result, error] = rescue(
        (): string => {
          throw new ExpectedErrror("custom");
        },
        { expects: [ExpectedErrror] }
      );

      expect(result).toBe(null);
      expect(error).toBeInstanceOf(ExpectedErrror);
      expect(error).toMatchObject({ message: "custom" });
    });

    it("Should throw unexpected Error", () => {
      class ExpectedError extends Error {}
      class UnexpectedError extends Error {}

      expect(() => {
        rescue(
          () => {
            throw new Error("unexpected");
          },
          { expects: [ExpectedError] }
        );
      }).toThrow("unexpected");

      expect(() => {
        rescue(
          () => {
            throw new UnexpectedError("unexpected");
          },
          { expects: [ExpectedError] }
        );
      }).toThrow("unexpected");
    });
  });
});
