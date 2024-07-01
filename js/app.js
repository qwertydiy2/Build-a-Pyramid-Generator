document.getElementById('pyramid-form').addEventListener('submit', function(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Generate the pyramid
  generatePyramid();
});

function generatePyramid() {
  let height = document.getElementById('height').value;
  height = parseInt(height, 10);
  if (isNaN(height) || height <= 0) {
    alert('Height must be a positive number.');
    return;
  }

  // Retrieve the selected color and size
  const color = document.getElementById('colour').value;
  let size = parseInt(document.getElementById('size').value, 10);
  const sizeUnit = document.querySelector('input[name="size-unit"]:checked').value;

  // Check if the size exceeds the viewport width when the size unit is pixels
  if (sizeUnit === 'px' && size > window.innerWidth) {
    alert('Size must not exceed the viewport width.');
    return;
  }

  // Check which radio button is selected
  const isReversed = document.querySelector('input[name="pyramid-direction"]:checked').value === 'reversed';

  const pyramidContainer = document.getElementById('pyramid-container');

  // Clear the pyramid container
  pyramidContainer.innerHTML = '';

  for (let i = 1; i <= height; i++) {
    // Create a new pyramid layer
    const pyramidLayer = document.createElement('div');
    pyramidLayer.className = 'pyramid-layer';

    // Create pyramid blocks
    for (let j = 0; j < (isReversed ? height - i + 1 : i); j++) {
      const pyramidBlock = document.createElement('span');
      pyramidBlock.className = 'pyramid-block';
      // Apply the selected color and size to the pyramid block
      pyramidBlock.style.backgroundColor = color;
      // Calculate the size of each block based on the total number of blocks in the current layer
      if (sizeUnit === 'px') {
        pyramidBlock.style.width = size+"px";
      } else {
        pyramidBlock.style.width = size+"%"
      }
      pyramidBlock.style.height = size;
      pyramidLayer.appendChild(pyramidBlock);
    }

    // Append the pyramid layer to the pyramid container
    pyramidContainer.appendChild(pyramidLayer);
  }
}
