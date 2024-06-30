function generatePyramid() {
  const height = document.getElementById('height').value;
  if (height <= 0) {
    alert('Height must be a positive number.');
    return;
  }

  // Retrieve the selected color
  const color = document.getElementById('color').value;

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
      // Apply the selected color to the pyramid block
      pyramidBlock.style.backgroundColor = color;
      pyramidLayer.appendChild(pyramidBlock);
    }

    // Append the pyramid layer to the pyramid container
    pyramidContainer.appendChild(pyramidLayer);
  }
}
