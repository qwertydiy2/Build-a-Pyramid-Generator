// Import necessary libraries and modules
const chai = require('chai');
const assert = chai.assert;
const Browser = require('zombie');

// Assuming app.js exports functions for unit testing
const { generatePyramid } = require('../js/app');

// Unit Tests for JavaScript Logic
describe("Unit Tests for Pyramid Logic", function () {
    describe("Input Validation", function() {
        it("should return false for negative height input", function() {
            const result = validateInput(-1);
            assert.isFalse(result, "Negative height should be invalid");
        });

        it("should return true for positive height input", function() {
            const result = validateInput(5);
            assert.isTrue(result, "Positive height should be valid");
        });
    });

    describe("Pyramid Generation Logic", function() {
        it("should generate a pyramid with the correct number of layers", function() {
            const pyramid = generatePyramid(3);
            assert.equal(pyramid.length, 3, "Pyramid should have 3 layers");
        });
    });

    describe("DOM Manipulation", function() {
        it("should clear the pyramid container", function() {
            // This test assumes the existence of a function to clear the pyramid container
            assert.isTrue(clearPyramidContainer(), "Pyramid container should be cleared");
        });
    });
});

// Browser Interaction Tests with Zombie.js
describe("Browser Interaction Tests", function () {
    const browser = new Browser();

    before(function(done) {
        browser.visit('http://localhost:3000', done); // Assuming the files are served on localhost:3000
    });

    it("should display an alert for invalid input", function(done) {
        browser
            .fill('heightInput', '-1') // Assuming there's an input field for height with id 'heightInput'
            .pressButton('GenerateButton', function() { // Assuming there's a button to generate the pyramid with id 'GenerateButton'
                browser.assert.text('alert', 'Height must be a positive number'); // Assuming an alert is shown for invalid input
                done();
            });
    });

    it("should generate a pyramid on form submission", function(done) {
        browser
            .fill('heightInput', '5')
            .pressButton('GenerateButton', function() {
                assert.equal(browser.queryAll('.pyramid-layer').length, 5, "Pyramid with 5 layers should be generated");
                done();
            });
    });
});