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
    "reversed" === document.querySelector('input[name="pyramid-direction"]:checked').value;

  return {height, color, size, sizeUnit, isReversed};
}


/**
 * Generates a pyramid structure based on the provided parameters.
 * @param {Object}
 * Object with height, color, size, sizeUnit, and isReversed.
 * @throws {Error}
 * If height isn't positive or if size*sizeUnit exceeds viewport width.
 */
function generatePyramid({height, color, size, sizeUnit, isReversed}) { // jshint ignore:line
  if (isNaN(height) || 0 >= height) {
    throw new Error("Height must be a positive number.");
  }

  if ("px" === sizeUnit && size * height > window.innerWidth) {
    throw new Error("Size must not exceed the viewport width.");
  } else if ("%" === sizeUnit && 100 < size * height) {
    throw new Error("Size must not exceed 100% of the viewport width.");
  }

  const pyramidContainer = document.getElementById("pyramid-container");
  pyramidContainer.innerHTML = "";

  for (let i = 1; i <= height; i++) {
    const pyramidLayer = document.createElement("div");
    pyramidLayer.className = "pyramid-layer";

    for (let j = 0; j < (isReversed ? height - i + 1 : i); j++) {
      const pyramidBlock = document.createElement("span");
      pyramidBlock.className = "pyramid-block";
      pyramidBlock.style.backgroundColor = color;

      if ("px" === sizeUnit) {
        pyramidBlock.style.width = `${size}px`;
      } else {
        pyramidBlock.style.width = `${size}%`;
      }
      pyramidBlock.style.height = size;
      pyramidLayer.appendChild(pyramidBlock);
    }

    pyramidContainer.appendChild(pyramidLayer);
  }
}

