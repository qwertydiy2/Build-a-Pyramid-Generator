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

  test("each pyramid layer has the correct number of blocks", function () {
    // Generate pyramid with 5 levels, normal direction
    global.window.generatePyramid(5, "#ff0000", 20, "px", false);
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers = pyramidContainer.getElementsByClassName("pyramid-layer");

    // Assert that each layer has the correct number of blocks
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks = pyramidLayers[i].getElementsByClassName("pyramid-block");
      const expectedBlocks = i + 1; // For a normal pyramid, expected blocks equal the layer index + 1
      assert.equal(layerBlocks.length, expectedBlocks, `Layer ${i + 1} does not have the correct number of blocks`);
    }
  });

  // Additional tests...
  test("should generate a pyramid with correct parameters and block counts", function () {
    // Generate pyramid with 5 levels, normal direction
    window.generatePyramid(5, "#ff0000", 20, "px", false);
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers = pyramidContainer.getElementsByClassName("pyramid-layer");

    assert.equal(pyramidLayers.length, 5, "Pyramid does not have 5 layers");

    // Check each layer for the correct num ber of blocks
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks = pyramidLayers[i].getElementsByClassName("pyramid-block");
      const expectedBlocks = i + 1; // For a normal pyramid, expected blocks equal the layer index + 1
      assert.equal(layerBlocks.length, expectedBlocks, `Layer ${i + 1} does not have the correct number of blocks`);
      assert.isNotEmpty(layerBlocks, "First layer of pyramid should have blocks");
      for (let j = 0; j < layerBlocks.length; j++) {
        assert.equal(layerBlocks[j].style.width, "20px", "Block width does not match");
        assert.equal(layerBlocks[j].style.backgroundColor, "rgb(255, 0, 0)", "Block color does not match");
        // assert.equal(layerBlocks[j].style.height, "4", "Block height does not match");
      }
    }

    // Check the first layer's block color and size as an example
  });

  // Additional tests...
});
