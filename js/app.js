function generatePyramid() {
  const height = document.getElementById('height').value;
  if (height <= 0) {
    alert('Height must be a positive number.');
    return;
  }
  const pyramidContainer = document.getElementById('pyramid-container');

  // Clear the pyramid container
  pyramidContainer.innerHTML = '';

  for (let i = 1; i <= height; i++) {
    // Create a new pyramid layer
    const pyramidLayer = document.createElement('div');
    pyramidLayer.className = 'pyramid-layer';

    // Create pyramid blocks
    for (let j = 0; j < i; j++) {
      const pyramidBlock = document.createElement('span');
      pyramidBlock.className = 'pyramid-block';
      pyramidLayer.appendChild(pyramidBlock);
    }

    // Append the pyramid layer to the pyramid container
    pyramidContainer.appendChild(pyramidLayer);
  }
}
