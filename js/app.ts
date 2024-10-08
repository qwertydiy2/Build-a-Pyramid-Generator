const pyramidForm = document.getElementById('pyramid-form');
pyramidForm!.addEventListener('submit', event => {
  // Prevent the form from being submitted
  event.preventDefault();
});

import { PyramidBlockElement, PyramidLayerElement } from './interfaces';

/**
 * Retrieves pyramid parameters from the user input.
 * @returns {Object}
 * Object with height, color, size, sizeUnit, and isReversed.
 */
function getPyramidParameters(): { height: number; color: string; size: number; sizeUnit: "%"|"px"; isReversed: boolean } {
  // jshint ignore:line
  const height = Number((<HTMLInputElement>document.getElementById('height'))!.value);
  const color = (<HTMLInputElement>document.getElementById('colour'))!.value;
  const size = Number((<HTMLInputElement>document.getElementById('size'))!.value);
  const sizeUnit = (<HTMLInputElement>document.querySelector(
    'input[name="size-unit"]:checked'
  ))!.value as "%" | "px";
  const isReversed =
    (<HTMLInputElement>document.querySelector('input[name="pyramid-direction"]:checked'))!.value ===
    'reversed';

  return {height, color, size, sizeUnit, isReversed}
}


/**
 * Validates the parameters for generating a pyramid.
 *
 * @param {Object} params - The parameters for generating a pyramid.
 * @param {number} params.height - The height of the pyramid.
 * @param {number} params.size - The size of each pyramid block.
 * @param { "%" | "px" } params.sizeUnit - The unit of measurement for the size.
 * @throws {Error} If the height is not a positive number.
 * @throws {Error} If the calculated size exceeds the maximum size based on the size unit.
 */
function validatePyramidParameters({height, size, sizeUnit}: { height: number; size: number; sizeUnit: "%" | "px" }): void|Error {
  if (isNaN(height) || height <= 0) {
    throw new Error('Height must be a positive number.')
  }

  const maxSize = sizeUnit === 'px' ? window.innerWidth : 100;
  const maxSizeErrorMessage =
    sizeUnit === 'px'
      ? 'Size must not exceed the viewport width.'
      : 'Size must not exceed 100% of the viewport width.';

  if (size * height > maxSize) {
    throw new Error(maxSizeErrorMessage)
  }
}

/**
 * Creates a pyramid block element.
 *
 * @param {string} color - The background color of the pyramid block.
 * @param {number} size - The size of the pyramid block.
 * @param { "%" | "px" } sizeUnit - The unit for the size ("px" or "%").
 * @returns {HTMLSpanElement} The created pyramid block element.
 */
function createPyramidBlock(color: string, size: number, sizeUnit: string): PyramidBlockElement {
  const pyramidBlock = document.createElement("span");
  pyramidBlock.className = "pyramid-block";
  pyramidBlock.style.backgroundColor = color;
  pyramidBlock.style.width = sizeUnit === "px" ? `${size}px` : `${size}%`;
  pyramidBlock.style.height = String(size);
  return <PyramidBlockElement>pyramidBlock;
}

/**
 * Calculates the number of blocks in a layer of a pyramid.
 *
 * @param {number} height - The height of the pyramid.
 * @param {boolean} isReversed - Indicates whether the pyramid is reversed or not.
 * @param {number} layerIndex - The index of the layer in the pyramid.
 * @returns {number} The number of blocks in the specified layer.
 */
function calculateBlockCount(height: number, isReversed: boolean, layerIndex: number): number {
  return isReversed ? height - layerIndex : layerIndex + 1;
}

/**
 * Creates a pyramid layer with the specified color, size, size unit, and number of blocks.
 *
 * @param {string} color - The color of the pyramid layer.
 * @param {number} size - The size of each pyramid block.
 * @param { "%" | "px" } sizeUnit - The unit of measurement for the size (e.g., "px", "rem").
 * @param {number} blocks - The number of blocks in the pyramid layer.
 * @returns {HTMLDivElement} The created pyramid layer element.
 */
function createPyramidLayer(
  color: string,
  size: number,
  sizeUnit: "%" | "px",
  blocks: number,
): PyramidLayerElement {
  const pyramidLayer = document.createElement("div");
  pyramidLayer.className = "pyramid-layer";

  for (let j = 0; j < blocks; j++) {
    const pyramidBlock = createPyramidBlock(color, size, sizeUnit);
    pyramidLayer.appendChild(pyramidBlock)
  }

  return <PyramidLayerElement>pyramidLayer
}

/**
 * Generates a pyramid based on the provided parameters.
 *
 * @param {Object} options - The options for generating the pyramid.
 * @param {number} options.height - The height of the pyramid.
 * @param {string} options.color - The color of the pyramid blocks.
 * @param {number} options.size - The size of each pyramid block.
 * @param {string} options.sizeUnit - The unit of measurement for the size of the pyramid blocks.
 * @param {boolean} options.isReversed - Indicates whether the pyramid should be reversed.
 */
function generatePyramid({height, color, size, sizeUnit, isReversed}: {
  height: number;
  color: string;
  size: number;
  sizeUnit: "%" | "px";
  isReversed: boolean;
}): void {
  validatePyramidParameters({height, size, sizeUnit});

  const pyramidContainerRemove = document.getElementById('pyramid-container')!;
  const body = document.querySelector('body')!;
  body.removeChild(pyramidContainerRemove);
  const pyramidContainer = document.createElement('div');
  pyramidContainer.setAttribute('id', 'pyramid-container');

  for (let i = 0; i < height; i++) {
    const blockCount = calculateBlockCount(height, isReversed, i);
    const pyramidLayer = createPyramidLayer(color, size, sizeUnit, blockCount);
    pyramidContainer.appendChild(pyramidLayer);
  }

  body!.appendChild(pyramidContainer);
}

