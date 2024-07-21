import { assert } from "chai";
import { JSDOM } from "jsdom";

async function setupEnvironment() {
  const dom = await JSDOM.fromFile("index.html", {
    runScripts: "dangerously",
    resources: "usable",
  });
  global.window = dom.window;
  global.document = dom.window.document;
  // Wait for scripts to load and execute
  await new Promise((resolve) => {
    dom.window.onload = resolve;
  });
}

suite("Pyramid Generation Tests", function () {
  suiteSetup(async function () {
    // Setup environment before each test
    await setupEnvironment();
  });

  test("should generate a pyramid with 5 levels", function () {
    // Generate pyramid with 5 levels
    global.window.generatePyramid(5);
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLevels =
      pyramidContainer.getElementsByClassName("pyramid-layer");
    // Assert that the pyramid has exactly 5 levels
    assert.equal(pyramidLevels.length, 5, "Pyramid does not have 5 levels");
  });

  // Additional tests...
});