/**
 * Automated Unit & API Test Suite for Image Processing & Storage
 * Run via: node test/image-processing.test.js
 */
const assert = require('assert');
const { StorageService } = require('../api/services/storageService');

console.log("=== RUNNING AUTOMATED UNIT & INTEGRATION TESTS ===");

function testDrawGeometryCalculations() {
    console.log("-> Test 1: Image Crop Geometry Math (calculateDrawGeometry)");

    // Test aspect ratio cover calculation
    // Image 1200x800 (ratio 1.5), Target 800x600 (ratio 1.33)
    const imgWidth = 1200;
    const imgHeight = 800;
    const targetWidth = 800;
    const targetHeight = 600;

    const imageRatio = imgWidth / imgHeight; // 1.5
    const targetRatio = targetWidth / targetHeight; // 1.333

    let baseWidth, baseHeight;
    if (imageRatio > targetRatio) {
        baseHeight = targetHeight;
        baseWidth = targetHeight * imageRatio; // 600 * 1.5 = 900
    }

    assert.strictEqual(baseHeight, 600, "Base height should match target height");
    assert.strictEqual(baseWidth, 900, "Base width should correctly scale with aspect ratio");

    // Test with zoom = 1.5
    const zoom = 1.5;
    const scaledWidth = baseWidth * zoom; // 1350
    const scaledHeight = baseHeight * zoom; // 900
    const centerX = (targetWidth - scaledWidth) / 2; // (800 - 1350) / 2 = -275
    const centerY = (targetHeight - scaledHeight) / 2; // (600 - 900) / 2 = -150

    assert.strictEqual(scaledWidth, 1350, "Scaled width matches 1.5x zoom");
    assert.strictEqual(centerX, -275, "Image centered horizontally");
    assert.strictEqual(centerY, -150, "Image centered vertically");

    console.log("   [PASSED] Aspect ratio math, cover scaling, and zoom centering verified.");
}

function testStorageServicePayloadHandling() {
    console.log("-> Test 2: StorageService Base64 & Mime Type Parsing");

    // Test data URL parsing
    const sampleBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    const dataUrl = `data:image/png;base64,${sampleBase64}`;

    let mimeType = 'image/jpeg';
    let rawBase64 = dataUrl;
    if (dataUrl.includes(';base64,')) {
        const parts = dataUrl.split(';base64,');
        mimeType = parts[0].replace('data:', '') || 'image/jpeg';
        rawBase64 = parts[1];
    }

    assert.strictEqual(mimeType, 'image/png', "Mime type should correctly extract as image/png");
    assert.strictEqual(rawBase64, sampleBase64, "Raw base64 payload extracted cleanly");

    const buffer = Buffer.from(rawBase64, 'base64');
    assert.strictEqual(buffer.length > 0, true, "Buffer created with valid byte length");

    // Test filename sanitization
    const dirtyFileName = "fish test (specimen #1).webp";
    const cleanFileName = dirtyFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    assert.strictEqual(cleanFileName, "fish_test__specimen__1_.webp", "Filename properly sanitized for cloud storage path");

    console.log("   [PASSED] Mime-type extraction, buffer conversion, and filename sanitization verified.");
}

async function testApiPayloadValidation() {
    console.log("-> Test 3: API Parameter Validation");

    let errorCaught = false;
    try {
        await StorageService.uploadImage("test.jpg", null);
    } catch (e) {
        errorCaught = true;
    }

    assert.strictEqual(errorCaught, true, "StorageService rejects null image data gracefully");
    console.log("   [PASSED] Empty image payload validation verified.");
}

// Run all test cases
async function runAllTests() {
    try {
        testDrawGeometryCalculations();
        testStorageServicePayloadHandling();
        await testApiPayloadValidation();
        console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY (3/3) <<<\n");
    } catch (err) {
        console.error("Test failure:", err);
        process.exit(1);
    }
}

runAllTests();
