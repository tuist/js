import test, { describe } from "node:test";
import assert from "node:assert";
import { execCLI } from "./cli.js";

describe("execCLI", async () => {
  test("successfully runs the CLI", async (t) => {
    // Given/when
    const { stdout } = await execCLI(["version"], { stdout: "pipe" });

    // Then
    assert.match(stdout, /\d+\.\d+\.\d+/);
  });
});
