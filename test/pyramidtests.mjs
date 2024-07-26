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
    const pyramidLayers =
      pyramidContainer.getElementsByClassName("pyramid-layer");

    // Assert that each layer has the correct number of blocks
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks =
        pyramidLayers[i].getElementsByClassName("pyramid-block");
      const expectedBlocks = i + 1; // For a normal pyramid, expected blocks equal the layer index + 1
      assert.equal(
        layerBlocks.length,
        expectedBlocks,
        `Layer ${i + 1} does not have the correct number of blocks`,
      );
    }
  });

  // Additional tests...
  test("should generate a pyramid with correct parameters and block counts", function () {
    // Generate pyramid with 5 levels, normal direction
    window.generatePyramid(5, "#ff0000", 20, "px", false);
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers =
      pyramidContainer.getElementsByClassName("pyramid-layer");

    assert.equal(pyramidLayers.length, 5, "Pyramid does not have 5 layers");

    // Check each layer for the correct num ber of blocks
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks =
        pyramidLayers[i].getElementsByClassName("pyramid-block");
      const expectedBlocks = i + 1; // For a normal pyramid, expected blocks equal the layer index + 1
      assert.equal(
        layerBlocks.length,
        expectedBlocks,
        `Layer ${i + 1} does not have the correct number of blocks`,
      );
      assert.isNotEmpty(
        layerBlocks,
        "First layer of pyramid should have blocks",
      );
      for (let j = 0; j < layerBlocks.length; j++) {
        assert.equal(
          layerBlocks[j].style.width,
          "20px",
          "Block width does not match",
        );
        assert.equal(
          layerBlocks[j].style.backgroundColor,
          "rgb(255, 0, 0)",
          "Block color does not match",
        );
        // assert.equal(layerBlocks[j].style.height, "4", "Block height does not match");
      }
    }

    // Check the first layer's block color and size as an example
  });

  test("throws error for non-positive height values", function () {
    assert.throws(
      () => window.generatePyramid(0, "#ff0000", 20, "px", false),
      "Height must be a positive number.",
    );
    assert.throws(
      () => window.generatePyramid(-1, "#ff0000", 20, "px", false),
      "Height must be a positive number.",
    );
  });

  test("throws error when pixel size exceeds viewport width", function () {
    global.window.innerWidth = 500;
    assert.throws(
      () => window.generatePyramid(5, "#ff0000", 600, "px", false),
      "Size must not exceed the viewport width.",
    );
    assert.throws(
      () => window.generatePyramid(1, "#ff0000", 600, "px", false),
      "Size must not exceed the viewport width.",
    );
    assert.throws(
      () => window.generatePyramid(5, "#ff0000", 130, "px", false),
      "Size must not exceed the viewport width.",
    );
  });

  test("creates pyramid layers equal to height", function () {
    global.window.generatePyramid(3, "#00ff00", 50, "px", false);
    const pyramidLayers = document.getElementsByClassName("pyramid-layer");
    assert.equal(pyramidLayers.length, 3, "Pyramid does not have 3 layers");
    for (let i = 0; i < pyramidLayers.length; i++) {
      const currentPyramidLayer =
        pyramidLayers[i].getElementsByClassName("pyramid-block");
      assert.equal(
        currentPyramidLayer.length,
        i + 1,
        "Pyramid does not have {i + 1} layers",
      );
      for (let j = 0; j < currentPyramidLayer.length; j++) {
        assert.equal(
          currentPyramidLayer[j].style.width,
          "50px",
          "Pyramid does not have 3 layers",
        );
      }
    }
  });

  test("creates correct number of blocks in each layer for non-reversed pyramid", function () {
    global.window.generatePyramid(3, "#00ff00", 50, "px", false);
    const pyramidLayers = document.getElementsByClassName("pyramid-layer");
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks =
        pyramidLayers[i].getElementsByClassName("pyramid-block");
      assert.equal(
        layerBlocks.length,
        i + 1,
        `Layer ${i + 1} does not have the correct number of blocks`,
      );
    }
  });

  test("creates correct number of blocks in each layer for reversed pyramid", function () {
    global.window.generatePyramid(3, "#00ff00", 50, "px", true);
    const pyramidLayers = document.getElementsByClassName("pyramid-layer");
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks =
        pyramidLayers[i].getElementsByClassName("pyramid-block");
      assert.equal(
        layerBlocks.length,
        3 - i,
        `Layer ${i + 1} does not have the correct number of blocks`,
      );
    }
  });

  test("does not exceed viewport width when size unit is percentage", function () {
    global.window.innerWidth = 1000;
    global.window.generatePyramid(5, "#0000ff", 101, "%", false);
    const pyramidBlocks = document.getElementsByClassName("pyramid-block");
    assert.equal(
      pyramidBlocks.length,
      0,
      "Pyramid blocks should not be created when size exceeds 100%",
    );
  });

  test("applies specified color to pyramid blocks", function () {
    global.window.generatePyramid(3, "#ff0000", 50, "px", false);
    const pyramidBlocks = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks.length; i++) {
      assert.equal(
        pyramidBlocks[i].style.backgroundColor,
        "rgb(255, 0, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid(3, "#00ff00", 50, "px", false);
    const pyramidBlocks2 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks2.length; i++) {
      assert.equal(
        pyramidBlocks2[i].style.backgroundColor,
        "rgb(0, 255, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid(3, "#0000ff", 50, "px", false);
    const pyramidBlocks3 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks3.length; i++) {
      assert.equal(
        pyramidBlocks3[i].style.backgroundColor,
        "rgb(0, 0, 255)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid(3, "#ffffff", 50, "px", false);
    const pyramidBlocks4 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks4.length; i++) {
      assert.equal(
        pyramidBlocks4[i].style.backgroundColor,
        "rgb(255, 255, 255)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid(3, "#000000", 50, "px", false);
    const pyramidBlocks5 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks5.length; i++) {
      assert.equal(
        pyramidBlocks5[i].style.backgroundColor,
        "rgb(0, 0, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid(3, "#7cf485", 50, "px", false);
    const pyramidBlocks6 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks6.length; i++) {
      assert.equal(
        pyramidBlocks6[i].style.backgroundColor,
        "rgb(124, 244, 133)",
        "Block color does not match",
      );
    }
  });
});
