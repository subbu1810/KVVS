const fs = require('fs');
const path = require('path');

const filesToEdit = [
    'frontend/src/pages/Contact.jsx',
    'frontend/src/pages/Home.jsx',
    'frontend/src/pages/Register.jsx',
    'frontend/src/pages/Products.jsx',
    'frontend/src/pages/EventDetails.jsx',
    'frontend/src/pages/Booking.jsx',
    'frontend/src/components/Footer.jsx'
];

filesToEdit.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Handle specific domains and casing
    content = content.replace(/vortexgenerator\.com/gi, 'kvvsaielectronic.com');
    content = content.replace(/VORTEX PAY/g, 'K V V SAI ELECTRONIC PAY');
    
    // Replace all other Vortex occurrences
    content = content.replace(/Vortex/g, 'K V V Sai electronic');
    
    fs.writeFileSync(fullPath, content);
});
console.log("Replaced successfully in frontend files!");
