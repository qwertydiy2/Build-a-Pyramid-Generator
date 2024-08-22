import {assert} from 'chai'

import {JSDOM} from 'jsdom';

import {PyramidBlockElement, PyramidLayerElement, PyramidFormElements} from "../js/interfaces"
import "jsdom/base";
// import "jsdom/base";

declare global {
  interface Window {
    validatePyramidParameters: (params: { height: number, size: number, sizeUnit: string }) => void;
    createPyramidBlock: (color: string, size: number, sizeUnit: string) => HTMLElement;
    calculateBlockCount: (height: number, isReversed: boolean, layer: number) => number;
    createPyramidLayer: (color: string, size: number, sizeUnit: string, blockCount: number) => HTMLElement;
    generatePyramid: (params: {
      height: number,
      color: string,
      size: number,
      sizeUnit: string,
      isReversed: boolean
    }) => void;
    getPyramidParameters: () => {
      height: number;
      color: string;
      size: number;
      sizeUnit: "%" | "px";
      isReversed: boolean
    };
  }
}

async function setupEnvironment() {
  const dom = await JSDOM.fromFile('index.html', {
    runScripts: 'dangerously',
    resources: 'usable'
  });
  global.window = dom.window as unknown as Window & typeof globalThis;
  global.document = dom.window.document;

  // Wait for scripts to load and execute
  await new Promise(resolve => {
    dom.window.onload = resolve;
  });
}

suite("validatePyramidParameters", () => {
  suiteSetup(async () => {
    // Setup environment before each test
    await setupEnvironment();
  });
  test("should throw error for non-positive height values", () => {
    assert.throws(
      () => window.validatePyramidParameters({height: 0, size: 20, sizeUnit: "px"}),
      "Height must be a positive number."
    );
    assert.throws(
      () => window.validatePyramidParameters({height: -1, size: 20, sizeUnit: "px"}),
      "Height must be a positive number."
    );
  });

  test("should throw error when pixel size exceeds viewport width", () => {
    const windowWidth = 500;
    global.window.innerWidth = windowWidth;
    assert.throws(
      () => window.validatePyramidParameters({height: 5, size: 600, sizeUnit: "px"}),
      "Size must not exceed the viewport width."
    );
  });

  test("should throw error when percentage size exceeds 100%", () => {
    global.window.innerWidth = 1000;
    assert.throws(
      () => window.validatePyramidParameters({height: 5, size: 101, sizeUnit: "%"}),
      "Size must not exceed 100% of the viewport width."
    );
  });
});

suite("createPyramidBlock", () => {
  suiteSetup(async () => {
    // Setup environment before each test
    await setupEnvironment();
  });
  test("should create a pyramid block with correct properties", () => {
    const block = window.createPyramidBlock("#ff0000", 20, "px");
    assert.equal(block.style.backgroundColor, "rgb(255, 0, 0)", "Block color does not match");
    assert.equal(block.style.width, "20px", "Block width does not match");
  });
});

suite("calculateBlockCount", () => {
  suiteSetup(async () => {
    // Setup environment before each test
    await setupEnvironment();
  });
  test("should calculate correct block count for normal pyramid", () => {
    assert.equal(window.calculateBlockCount(5, false, 0), 1);
    assert.equal(window.calculateBlockCount(5, false, 4), 5);
  });

  test("should calculate correct block count for reversed pyramid", () => {
    assert.equal(window.calculateBlockCount(5, true, 0), 5);
    assert.equal(window.calculateBlockCount(5, true, 4), 1);
  });
});

suite("createPyramidLayer", () => {
  suiteSetup(async () => {
    // Setup environment before each test
    await setupEnvironment();
  });
  test("should create a pyramid layer with correct number of blocks", () => {
    const layer = window.createPyramidLayer("#ff0000", 20, "px", 5);
    const blocks = layer.getElementsByClassName("pyramid-block") as unknown as PyramidBlockElement[];
    assert.equal(blocks.length, 5, "Layer does not have the correct number of blocks");
  });
});

suite("generatePyramid", () => {
  suiteSetup(async () => {
    // Setup environment before each test
    await setupEnvironment();
  });
  test("should generate pyramid with correct parameters & block counts", () => {
    window.generatePyramid({
      height: 5,
      color: '#ff0000',
      size: 20,
      sizeUnit: "px",
      isReversed: false,
    });
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers = pyramidContainer!.getElementsByClassName("pyramid-layer") as unknown as PyramidLayerElement[];

    assert.equal(pyramidLayers.length, 5, 'Pyramid does not have 5 layers');

    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks = pyramidLayers[i].getElementsByClassName("pyramid-block") as unknown as PyramidBlockElement[];
      assert.equal(layerBlocks.length, i + 1, `Layer ${i + 1} does not have the correct number of blocks`);
      for (const item of layerBlocks) {
        assert.equal(item.style.width, "20px", "Block width does not match");
        assert.equal(item.style.backgroundColor, "rgb(255, 0, 0)", "Block color does not match");
      }
    }
  });

  test("should generate pyramid with correct parameters & block counts for size in percentage", () => {
    window.generatePyramid({
      height: 5,
      color: '#00ff00',
      size: 10,
      sizeUnit: "%",
      isReversed: false,
    });
    const pyramidContainer = document.getElementById("pyramid-container");
    const pyramidLayers = pyramidContainer!.getElementsByClassName("pyramid-layer") as unknown as PyramidLayerElement[];
    const pyramidContainerTwo = document.getElementById('pyramid-container');
    const pyramidLayersTwo = pyramidContainerTwo!.getElementsByClassName('pyramid-layer') as unknown as PyramidLayerElement[];

    assert.equal(pyramidLayers.length, 5, "Pyramid does not have 5 layers");
    assert.equal(pyramidLayersTwo.length, 5, 'Pyramid does not have 5 layers');

    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks = pyramidLayers[i].getElementsByClassName("pyramid-block") as unknown as PyramidBlockElement[];
      assert.equal(layerBlocks.length, i + 1, `Layer ${i + 1} does not have the correct number of blocks`);
    }
    // Check each layer for the correct number of blocks
    for (let i = 0; i < pyramidLayersTwo.length; i++) {
      const layerBlocks = pyramidLayersTwo[i].getElementsByClassName('pyramid-block') as unknown as PyramidBlockElement[];
      // For a normal pyramid, expected blocks equal the layer index + 1
      const expectedBlocks = i + 1;
      assert.equal(
        layerBlocks.length,
        expectedBlocks,
        `Layer ${i + 1} does not have the correct number of blocks`
      );
      assert.isNotEmpty(
        layerBlocks,
        'First layer of pyramid should have blocks'
      );
      for (const item of layerBlocks) {
        assert.equal(item.style.width, "10%", "Block width does not match");
        assert.equal(item.style.backgroundColor, "rgb(0, 255, 0)", "Block color does not match");
      }
    }
  });

  test("should create correct number of blocks in each layer for reversed pyramid", () => {
    window.generatePyramid({
      height: 3,
      color: '#00ff00',
      size: 50,
      sizeUnit: "px",
      isReversed: true,
    });
    const pyramidLayers = document.getElementsByClassName("pyramid-layer") as unknown as PyramidLayerElement[];
    for (let i = 0; i < pyramidLayers.length; i++) {
      const layerBlocks = pyramidLayers[i].getElementsByClassName("pyramid-block") as unknown as PyramidBlockElement[];
      assert.equal(layerBlocks.length, 3 - i, `Layer ${i + 1} does not have the correct number of blocks`);
    }
  });

  test("should apply specified color to pyramid blocks", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffffff", "#000000", "#7cf485"];
    const expectedColors = ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(124, 244, 133)"];

    colors.forEach((color, index) => {
      window.generatePyramid({
        height: 3,
        color,
        size: 50,
        sizeUnit: "px",
        isReversed: false,
      });
      const pyramidBlocks = document.getElementsByClassName("pyramid-block") as unknown as PyramidBlockElement[];
      for (const item of pyramidBlocks) {
        assert.equal(item.style.backgroundColor, expectedColors[index], "Block color does not match");
      }
    });
  });
});

suite("getPyramidParameters", () => {
  suiteSetup(() => setupEnvironment());

  test('should return the correct pyramid parameters', () => {
    // Fill out the form fields
    const pyramidSize = 20;
    (document.getElementById('height') as PyramidFormElements["height"]).value = "5";
    (document.getElementById('colour') as PyramidFormElements["colour"]).value = '#ff0000';
    (document.querySelector(
      "input[name='pyramid-direction'][value='normal']"
    ) as PyramidFormElements["pyramidDirection"]).checked = true;
    (document.getElementById('size') as PyramidFormElements["size"]).value = String(pyramidSize);
    (document.querySelector("input[name='size-unit'][value='px']") as PyramidFormElements["sizeUnit"]).checked =
      true;
    const pyramidParameters = window.getPyramidParameters();
    assert.equal(pyramidParameters.height, 5, 'Incorrect pyramid height');
    assert.equal(pyramidParameters.color, '#ff0000', 'Incorrect pyramid color');
    assert.equal(pyramidParameters.size, pyramidSize, 'Incorrect pyramid size');
    assert.equal(
      pyramidParameters.sizeUnit,
      'px',
      'Incorrect pyramid size unit'
    )
  })
});

suite('document.getElementById.addEventListener', () => {
  suiteSetup(async () => setupEnvironment());

  test('When form submitted, then prevent form submission', () => {
    const form = document.getElementById('pyramid-form');

    const event = new window.Event('submit', {
      bubbles: true,
      cancelable: true
    });

    form!.dispatchEvent(event);

    assert.isTrue(event.defaultPrevented, 'Form submission was not prevented');
  });
});
