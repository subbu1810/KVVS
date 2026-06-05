const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a high-tech downloadable PDF event pass for the attendee.
 * @param {Object} data - Contains user, product, event, booking_id, pass_id, and qr_data_url
 * @returns {Promise<string>} The relative public filepath of the generated PDF
 */
const generatePassPDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const { user, product, event, booking_id, pass_id, qr_code_url } = data;

      // Ensure directory exists
      const passesDir = path.join(__dirname, '../../public/passes');
      if (!fs.existsSync(passesDir)) {
        fs.mkdirSync(passesDir, { recursive: true });
      }

      const fileName = `pass_${pass_id}.pdf`;
      const filePath = path.join(passesDir, fileName);
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // --- Futuristic Cyber Background & Borders ---
      // Background (Dark theme slate-950)
      doc.rect(0, 0, 595.28, 841.89).fill('#020617');

      // Decorative Cyberpunk Glowing Outer Frame
      doc.rect(30, 30, 535.28, 781.89)
         .lineWidth(2)
         .stroke('#00f2fe'); // Neon Cyan

      // Double structural inner lines
      doc.rect(35, 35, 525.28, 771.89)
         .lineWidth(0.5)
         .stroke('#3b82f6'); // Electric Blue

      // Top corner brackets (High-tech visual accents)
      doc.moveTo(30, 70).lineTo(30, 30).lineTo(70, 30).lineWidth(4).stroke('#00f2fe');
      doc.moveTo(565.28, 70).lineTo(565.28, 30).lineTo(525.28, 30).lineWidth(4).stroke('#00f2fe');
      doc.moveTo(30, 771.89).lineTo(30, 811.89).lineTo(70, 811.89).lineWidth(4).stroke('#00f2fe');
      doc.moveTo(565.28, 771.89).lineTo(565.28, 811.89).lineTo(525.28, 811.89).lineWidth(4).stroke('#00f2fe');

      // --- Header Branding ---
      doc.fillColor('#00f2fe')
         .fontSize(26)
         .text('QUANTUM GENERATOR', 50, 60, { align: 'center', characterSpacing: 2 });
      
      doc.fillColor('#94a3b8')
         .fontSize(10)
         .text('ZERO-FUEL MAGNETIC POWER LAUNCH EVENT', 50, 92, { align: 'center', characterSpacing: 1 });

      // Horizontal separator line
      doc.moveTo(50, 110).lineTo(545.28, 110).lineWidth(1).stroke('#334155');

      // --- Launch Entry Pass Banner ---
      doc.rect(50, 130, 495.28, 35).fill('#1e1b4b'); // Deep indigo banner
      doc.fillColor('#a78bfa') // Light violet
         .fontSize(14)
         .text('OFFICIAL VIP BOARDING PASS', 50, 142, { align: 'center', characterSpacing: 1.5 });

      // --- Ticket Information Block ---
      // Left Column: User details & Reservation
      doc.fillColor('#00f2fe').fontSize(11).text('ATTENDEE PROFILE', 60, 195);
      doc.moveTo(60, 210).lineTo(280, 210).lineWidth(1).stroke('#1e293b');

      doc.fillColor('#e2e8f0').fontSize(12).text(`Name: ${user.name}`, 60, 225);
      doc.fillColor('#94a3b8').fontSize(10).text(`Email: ${user.email}`, 60, 245);
      doc.text(`Mobile: ${user.mobile}`, 60, 260);
      doc.text(`Address: ${user.address}`, 60, 275);

      // Right Column: Product Selected Details
      doc.fillColor('#00f2fe').fontSize(11).text('RESERVED PRODUCT', 315, 195);
      doc.moveTo(315, 210).lineTo(535, 210).lineWidth(1).stroke('#1e293b');

      doc.fillColor('#e2e8f0').fontSize(12).text(`${product.name} Model`, 315, 225);
      doc.fillColor('#94a3b8').fontSize(10).text(`KW Capacity: ${product.kw_capacity} KW`, 315, 245);
      doc.text(`Launch Booking Fee: Rs. ${parseFloat(product.price).toLocaleString()}`, 315, 260);
      doc.text('Power Generation: 100% Fuel-Free Magnetic', 315, 275);

      // --- Launch Event Logistics Block ---
      doc.rect(50, 315, 495.28, 90).fill('#0f172a'); // Slate card
      doc.rect(50, 315, 495.28, 90).lineWidth(1).stroke('#3b82f6');

      doc.fillColor('#60a5fa').fontSize(11).text('LAUNCH EVENT DETAILS', 70, 328);
      doc.fillColor('#ffffff').fontSize(13).text(event.title, 70, 348);
      
      const eventDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      doc.fillColor('#94a3b8').fontSize(10).text(`Date & Time: ${eventDate}`, 70, 368);
      doc.text(`Venue: ${event.venue}`, 70, 383);

      // --- Booking Metadata & ID Cards ---
      doc.fillColor('#00f2fe').fontSize(11).text('PASS VERIFICATION DETAILS', 60, 435);
      doc.moveTo(60, 450).lineTo(535, 450).lineWidth(1).stroke('#1e293b');

      doc.fillColor('#e2e8f0').fontSize(11).text(`Booking ID: ${booking_id}`, 60, 470);
      doc.text(`Pass ID: ${pass_id}`, 60, 490);
      doc.fillColor('#e2e8f0').text('Security Level: Level-1 Clearance', 60, 510);
      doc.fillColor('#94a3b8').fontSize(9).text('Scan QR code at the event gate to check in. Passes are non-transferable.', 60, 540, { width: 220 });

      // --- QR Code Placement ---
      // Convert QR Code Data URL (Base64 PNG) into Buffer
      const base64Data = qr_code_url.replace(/^data:image\/png;base64,/, '');
      const qrBuffer = Buffer.from(base64Data, 'base64');
      
      // Draw white container for QR (ensures easy scanning)
      doc.rect(340, 465, 175, 175).fill('#ffffff');
      doc.image(qrBuffer, 352, 477, { width: 150 });

      // --- Security Warning Footer ---
      doc.moveTo(50, 680).lineTo(545.28, 680).lineWidth(1).stroke('#334155');
      
      doc.fillColor('#f87171') // soft red
         .fontSize(9)
         .text('CRITICAL WARNING: Tampering with this ticket or duplicating it triggers immediate security system blacklisting. High-intensity magnetic generators will be active in testing cells at the event venue. Adhere to all terminal rules.', 50, 700, {
           align: 'center',
           width: 495
         });

      doc.fillColor('#475569')
         .fontSize(8)
         .text('Quantum Generator Industries © 3026. Powered by Magnetism.', 50, 755, { align: 'center' });

      // End document
      doc.end();

      writeStream.on('finish', () => {
        resolve(`/passes/${fileName}`);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generatePassPDF
};
