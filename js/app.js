function generatePyramid() {
  const height = document.getElementById('height').value;
  let pyramid = '';
  for (let i = 0; i < height; i++) {
    pyramid += ' '.repeat(height - i - 1) + '#'.repeat(2 * i + 1) + '\n';
  }
  document.getElementById('pyramidDisplay').innerText = pyramid;
}
