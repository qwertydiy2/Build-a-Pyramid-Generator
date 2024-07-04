const chai = require("chai");
const assert = chai.assert;
const { generatePyramid } = require("../js/app");

suite("Extended Pyramid Generation Tests", function () {
  suite("Pyramid Generation with Multiple Parameters", function () {
    test("should generate a pyramid with specified height, color, size, sizeUnit, and orientation", function () {
      // Example parameters for the test
      const height = 4;
      const color = "red";
      const size = 20;
      const sizeUnit = "px";
      const isReversed = false;

      // Call the generatePyramid function with the specified parameters
      const pyramid = generatePyramid(
        height,
        color,
        size,
        sizeUnit,
        isReversed,
      );

      // Assertions and checks to validate the pyramid generation
      assert.typeOf(pyramid, "array", "Pyramid should be an array");
      assert.equal(
        pyramid.length,
        height,
        "Pyramid should have the specified height",
      );
      if (pyramid.length > 0) {
        assert.equal(
          pyramid[0].color,
          color,
          "First layer of the pyramid should have the specified color",
        );
        assert.equal(
          pyramid[0].size + sizeUnit,
          "20px",
          "First layer of the pyramid should have the specified size and unit",
        );
        assert.equal(
          pyramid[0].isReversed,
          isReversed,
          "Pyramid should have the specified orientation",
        );
      }
    });
  });
});
