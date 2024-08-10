// import {generatePyramid} from
document
  .getElementById("pyramid-form")
  .addEventListener("submit", event => {
    // Prevent the form from being submitted
    event.preventDefault();
  });

/**
 * Retrieves pyramid parameters from the user input.
 * @returns {Object}
 * Object with height, color, size, sizeUnit, and isReversed.
 */
function getPyramidParameters() { // jshint ignore:line
  const height = parseInt(document.getElementById("height").value, 10);
  const color = document.getElementById("colour").value;
  const size = parseInt(document.getElementById("size").value, 10);
  const sizeUnit = document.querySelector(
    'input[name="size-unit"]:checked',
  ).value;
  const isReversed =
    document.querySelector(
      'input[name="pyramid-direction"]:checked'
    ).value === "reversed";

  return {height, color, size, sizeUnit, isReversed};
}


function validatePyramidParameters({height, size, sizeUnit}) {
  if (isNaN(height) || height <= 0) {
    throw new Error("Height must be a positive number.");
  }

  const maxSize = sizeUnit === "px" ? window.innerWidth : 100;
  const maxSizeErrorMessage = sizeUnit === "px" ? "Size must not exceed the viewport width." : "Size must not exceed 100% of the viewport width.";

  if (size * height > maxSize) {
    throw new Error(maxSizeErrorMessage);
  }
}

function createPyramidBlock(color, size, sizeUnit) {
  const pyramidBlock = document.createElement("span");
  pyramidBlock.className = "pyramid-block";
  pyramidBlock.style.backgroundColor = color;
  pyramidBlock.style.width = sizeUnit === "px" ? `${size}px` : `${size}%`;
  pyramidBlock.style.height = size;
  return pyramidBlock;
}

function createPyramidLayer(
  height,
  color,
  size,
  sizeUnit,
  isReversed,
  layerIndex
) {
  const pyramidLayer = document.createElement("div");
  pyramidLayer.className = "pyramid-layer";
  const blockCount = isReversed ? height - layerIndex : layerIndex + 1;

  for (let j = 0; j < blockCount; j++) {
    const pyramidBlock = createPyramidBlock(color, size, sizeUnit);
    pyramidLayer.appendChild(pyramidBlock);
  }

  return pyramidLayer;
}

function generatePyramid({height, color, size, sizeUnit, isReversed}) {
  validatePyramidParameters({height, size, sizeUnit});

  const pyramidContainerRemove = document.getElementById("pyramid-container");
  const body = document.querySelector("body");
  body.removeChild(pyramidContainerRemove);
  const pyramidContainer = document.createElement("div");
  pyramidContainer.setAttribute('id', 'pyramid-container');

  for (let i = 0; i < height; i++) {
    const pyramidLayer = createPyramidLayer(
      height,
      color,
      size,
      sizeUnit,
      isReversed,
      i);
    pyramidContainer.appendChild(pyramidLayer);
  }

  body.appendChild(pyramidContainer);
}

