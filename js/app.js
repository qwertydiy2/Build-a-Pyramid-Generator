document
  .getElementById("pyramid-form")
  .addEventListener("submit", function (event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Generate the pyramid
    generatePyramid();
  });

function getPyramidParameters() {
  const height = parseInt(document.getElementById("height").value, 10);
  const color = document.getElementById("colour").value;
  const size = parseInt(document.getElementById("size").value, 10);
  const sizeUnit = document.querySelector(
    'input[name="size-unit"]:checked',
  ).value;
  const isReversed =
    document.querySelector('input[name="pyramid-direction"]:checked').value ===
    "reversed";

  return { height, color, size, sizeUnit, isReversed };
}

function generatePyramid(height, color, size, sizeUnit, isReversed) {
  if (isNaN(height) || height <= 0) {
    throw new Error("Height must be a positive number.");
  }

  if (sizeUnit === "px" && size > window.innerWidth) {
    throw new Error("Size must not exceed the viewport width.");
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

      if (sizeUnit === "px") {
        pyramidBlock.style.width = size + "px";
      } else {
        pyramidBlock.style.width = size + "%";
      }
      pyramidBlock.style.height = size;
      pyramidLayer.appendChild(pyramidBlock);
    }

    pyramidContainer.appendChild(pyramidLayer);
  }
}

document
  .getElementById("pyramid-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const height = parseInt(document.getElementById("height").value, 10);
    const color = document.getElementById("colour").value;
    const size = parseInt(document.getElementById("size").value, 10);
    const sizeUnit = document.querySelector(
      'input[name="size-unit"]:checked',
    ).value;
    const isReversed =
      document.querySelector('input[name="pyramid-direction"]:checked')
        .value === "reversed";

    try {
      generatePyramid(height, color, size, sizeUnit, isReversed);
    } catch (error) {
      alert(error.message);
    }
  });
