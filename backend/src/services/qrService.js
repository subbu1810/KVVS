const QRCode = require('qrcode');

/**
 * Generates a base64 Data URL for a QR Code representing the given text.
 * @param {string} text - The content to encode in the QR code (e.g. Booking ID or Pass ID)
 * @returns {Promise<string>} The base64 data URL string
 */
const generateQRCode = async (text) => {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      color: {
        dark: '#0f172a',  // slate-900 for high-contrast scanning
        light: '#ffffff'  // white background
      },
      width: 300,
      margin: 1
    });
    return dataUrl;
  } catch (error) {
    console.error('QR Code Generation Error:', error);
    throw new Error('Failed to generate pass QR code');
  }
};

module.exports = {
  generateQRCode
};
