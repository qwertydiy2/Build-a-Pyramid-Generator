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

suite("generatePyramid", function () {
  suiteSetup(async function () {
    // Setup environment before each test
    await setupEnvironment();
  });

  test("should have correct number of blocks in each layer", function () {
    // Generate pyramid with 5 levels, normal direction
    global.window.generatePyramid({height:5, color:"#ff0000", size:20, sizeUnit:"px", isReversed:false});
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
  test("should generate a pyramid with correct parameters and block counts", function () {
    // Generate pyramid with 5 levels, normal direction
    window.generatePyramid(5, "#ff0000", 20, "px", false);
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers =
      pyramidContainer.getElementsByClassName("pyramid-layer");

    assert.equal(pyramidLayers.length, 5, "Pyramid does not have 5 layers");

    // Check each layer for the correct number of blocks
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

    // Edge case: Generate pyramid with 5 levels, normal direction, size in percentage
    window.generatePyramid({height: 5, color: "#00ff00", size: 10, sizeUnit: "%", isReversed: false});
    pyramidContainer = document.getElementById("pyramid-container");
    pyramidLayers = pyramidContainer.getElementsByClassName("pyramid-layer");

    assert.equal(pyramidLayers.length, 5, "Pyramid does not have 5 layers");

    // Check each layer for the correct number of blocks
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
        assert.equal(layerBlocks[j].style.width, "10%", "Block width does not match");
        assert.equal(layerBlocks[j].style.backgroundColor, "rgb(0, 255, 0)", "Block color does not match");
      }
    }
  });

  test("should throw error for non-positive height values", function () {
    assert.throws(() => window.generatePyramid({height:0, color:"#ff0000", size:20, sizeUnit:"px", isReversed:false}), "Height must be a positive number.");
    assert.throws(() => window.generatePyramid({height:-1, color:"#ff0000", size:20, sizeUnit:"px", isReversed:false}), "Height must be a positive number.");
  });

  test("should throw error when pixel size exceeds viewport width", function () {
    global.window.innerWidth = 500;
    assert.throws(() => window.generatePyramid({height:5, color:"#ff0000", size:600, sizeUnit:"px", isReversed:false}), "Size must not exceed the viewport width.");
    assert.throws(() => window.generatePyramid({height:1, color:"#ff0000", size:600, sizeUnit:"px", isReversed:false}), "Size must not exceed the viewport width.");
    assert.throws(() => window.generatePyramid({height:5, color:"#ff0000", size:130, sizeUnit:"px", isReversed:false}), "Size must not exceed the viewport width.");
  });

  test("should create pyramid layers equal to height", function () {
    global.window.generatePyramid({height:3, color:"#00ff050", size:50, sizeUnit:"px", isReversed:false});
    const pyramidLayers = document.getElementsByClassName("pyramid-layer");
    assert.equal(pyramidLayers.length, 3, "Pyramid does not have 3 layers");
    for( let i = 0; i < pyramidLayers.length; i++) {
      const currentPyramidLayer = pyramidLayers[i].getElementsByClassName("pyramid-block");
      assert.equal(currentPyramidLayer.length, i + 1, `Pyramid does not have ${i + 1} layers`);
      for( let j = 0; j < currentPyramidLayer.length; j++) {
        console.log(currentPyramidLayer[j].style.width);
        assert.equal(currentPyramidLayer[j].style.width, "50px", "Block width does not match");
      }
    }

  });

  test("should create correct number of blocks in each layer for non-reversed pyramid", function () {
    global.window.generatePyramid({height:3, color:"#00ff00", size:50, sizeUnit:"px", isReversed:false});
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

  test("should create correct number of blocks in each layer for reversed pyramid", function () {
    global.window.generatePyramid({height:3, color:"#00ff00", size:50, sizeUnit:"px", isReversed:true});
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

  test("should not exceed viewport width when size unit is percentage", function () {
    global.window.innerWidth = 1000;

    // Case: size exactly 100%
    assert.throws(() => global.window.generatePyramid({height:5, color:"#0000ff", size:100, sizeUnit:"%", isReversed:false}),"Size must not exceed 100% of the viewport width" , "Pyramid blocks should not be created when size exceeds 100%");

    // Case: size slightly less than 100%
    assert.throws(() => global.window.generatePyramid({height:5, color:"#0000ff", size:29, sizeUnit:"%", isReversed:false}),"Size must not exceed 100% of the viewport width", "Pyramid blocks should not be created when size exceeds 100%");

    // Case: size slightly more than 100%
    assert.throws(() => global.window.generatePyramid({height:5, color:"#0000ff", size:101, sizeUnit:"%", isReversed:false}), "Size must not exceed 100% of the viewport width", "Pyramid blocks should not be created when size exceeds 100%");
  });
  test("should apply specified color to pyramid blocks", function () {
    global.window.generatePyramid({height:3, color:"#ff0000", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks.length; i++) {
      assert.equal(
        pyramidBlocks[i].style.backgroundColor,
        "rgb(255, 0, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid({height:3, color:"#00ff00", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks2 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks2.length; i++) {
      assert.equal(
        pyramidBlocks2[i].style.backgroundColor,
        "rgb(0, 255, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid({height:3, color:"#0000ff", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks3 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks3.length; i++) {
      assert.equal(
        pyramidBlocks3[i].style.backgroundColor,
        "rgb(0, 0, 255)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid({height:3, color:"#ffffff", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks4 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks4.length; i++) {
      assert.equal(
        pyramidBlocks4[i].style.backgroundColor,
        "rgb(255, 255, 255)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid({height:3, color:"#000000", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks5 = document.getElementsByClassName("pyramid-block");
    for (let i = 0; i < pyramidBlocks5.length; i++) {
      assert.equal(
        pyramidBlocks5[i].style.backgroundColor,
        "rgb(0, 0, 0)",
        "Block color does not match",
      );
    }

    global.window.generatePyramid({height:3, color:"#7cf485", size:50, sizeUnit:"px", isReversed:false});
    const pyramidBlocks6 = document.getElementsByClassName("pyramid-block")
    for (let i = 0; i < pyramidBlocks6.length; i++) {
      assert.equal(
        pyramidBlocks6[i].style.backgroundColor,
        "rgb(124, 244, 133)",
        "Block color does not match",
      );
    }
  });
});

suite("getPyramidParameters", function () {
  suiteSetup(async function () {
    await setupEnvironment();
  });

  test("should return the correct pyramid parameters", function () {
    // Fill out the form fields
    document.getElementById("height").value = 5;
    document.getElementById("colour").value = "#ff0000";
    document.querySelector("input[name='pyramid-direction'][value='normal']").checked = true;
    document.getElementById("size").value = 20;
    document.querySelector("input[name='size-unit'][value='px']").checked = true;

    const pyramidParameters = window.getPyramidParameters();
    assert.equal(pyramidParameters.height, 5, "Incorrect pyramid height");
    assert.equal(pyramidParameters.color, "#ff0000", "Incorrect pyramid color");
    assert.equal(pyramidParameters.size, 20, "Incorrect pyramid size");
    assert.equal(pyramidParameters.sizeUnit, "px", "Incorrect pyramid size unit");
  });
});

suite("document.getElementById.addEventListener", function () {
  suiteSetup(async function () {
    await setupEnvironment();
  });

  test("When form submitted, then prevent form submission", function () {
    const form = document.getElementById("pyramid-form");

    const event = new window.Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form.dispatchEvent(event);

    assert.isTrue(event.defaultPrevented, "Form submission was not prevented");

  });
});
