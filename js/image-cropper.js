/**
 * Ancistrus Land - ImageProcessingService
 * Decoupled Client-Side Image Cropping, Zooming, and Optimization Engine.
 * 
 * Architecture:
 * - Pure logic separation: Performs canvas transformation, math, scaling, and compression.
 * - Framework agnostic: Can be driven by any UI or unit test runner.
 * - Zero external heavy dependencies: Uses high-performance native HTML5 Canvas API.
 */

export class ImageProcessingService {
    /**
     * Compute canvas draw dimensions to simulate 'cover' or 'contain' with zoom and pan
     * @param {number} imgWidth Original image width
     * @param {number} imgHeight Original image height
     * @param {number} targetWidth Output canvas width
     * @param {number} targetHeight Output canvas height
     * @param {number} zoom Multiplier >= 1.0
     * @param {number} offsetX Horizontal pan offset in px (-50 to +50 or user drag)
     * @param {number} offsetY Vertical pan offset in px
     * @returns {object} { drawX, drawY, drawWidth, drawHeight }
     */
    static calculateDrawGeometry(imgWidth, imgHeight, targetWidth, targetHeight, zoom = 1.0, offsetX = 0, offsetY = 0) {
        if (!imgWidth || !imgHeight || !targetWidth || !targetHeight) {
            throw new Error("Invalid dimensions provided to calculateDrawGeometry");
        }

        const effectiveZoom = Math.max(1.0, Number(zoom) || 1.0);
        const imageRatio = imgWidth / imgHeight;
        const targetRatio = targetWidth / targetHeight;

        let baseWidth, baseHeight;

        if (imageRatio > targetRatio) {
            // Image is wider than crop box - match height
            baseHeight = targetHeight;
            baseWidth = targetHeight * imageRatio;
        } else {
            // Image is taller or square - match width
            baseWidth = targetWidth;
            baseHeight = targetWidth / imageRatio;
        }

        const scaledWidth = baseWidth * effectiveZoom;
        const scaledHeight = baseHeight * effectiveZoom;

        // Center the image inside the crop window, then apply user offset
        const centerX = (targetWidth - scaledWidth) / 2;
        const centerY = (targetHeight - scaledHeight) / 2;

        const drawX = Math.round(centerX + (Number(offsetX) || 0));
        const drawY = Math.round(centerY + (Number(offsetY) || 0));

        return {
            drawX,
            drawY,
            drawWidth: Math.round(scaledWidth),
            drawHeight: Math.round(scaledHeight)
        };
    }

    /**
     * Crop, resize, and compress an Image/Canvas into an optimized Base64 string
     * @param {HTMLImageElement|CanvasImageSource} sourceImage
     * @param {object} options { targetWidth, targetHeight, zoom, offsetX, offsetY, quality, mimeType }
     * @returns {string} Base64 data URL (e.g. data:image/jpeg;base64,...)
     */
    static cropAndCompress(sourceImage, options = {}) {
        const {
            targetWidth = 800,
            targetHeight = 600,
            zoom = 1.0,
            offsetX = 0,
            offsetY = 0,
            quality = 0.85,
            mimeType = 'image/jpeg'
        } = options;

        const imgWidth = sourceImage.naturalWidth || sourceImage.width;
        const imgHeight = sourceImage.naturalHeight || sourceImage.height;

        if (!imgWidth || !imgHeight) {
            throw new Error("Source image has no valid dimensions.");
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not acquire 2D canvas context.");

        // Clean white background behind transparency
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Calculate exact framing
        const geo = this.calculateDrawGeometry(
            imgWidth,
            imgHeight,
            targetWidth,
            targetHeight,
            zoom,
            offsetX,
            offsetY
        );

        // High quality bicubic interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(sourceImage, geo.drawX, geo.drawY, geo.drawWidth, geo.drawHeight);

        return canvas.toDataURL(mimeType, quality);
    }

    /**
     * Upload cropped image to cloud storage via Store API
     * @param {string} fileName Target name for the file
     * @param {string} base64Data Cropped base64 string
     * @returns {Promise<{ success: boolean, url: string }>}
     */
    static async uploadToCloud(fileName, base64Data) {
        const res = await fetch('/api/store?action=upload-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: fileName,
                imageData: base64Data,
                bucket: 'catalog'
            })
        });

        const result = await res.json();
        if (!res.ok || !result.success) {
            throw new Error(result.error || "Failed to upload image to cloud.");
        }
        return result;
    }
}
