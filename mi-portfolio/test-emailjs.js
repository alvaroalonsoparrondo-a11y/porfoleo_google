// Test script to verify EmailJS configuration
const emailjs = require('@emailjs/browser');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

console.log('🔍 Verificant configuració EmailJS...\n');
console.log('✓ Public Key:', publicKey ? '✓ Configurat' : '✗ No configurat');
console.log('✓ Service ID:', serviceId ? '✓ Configurat' : '✗ No configurat');
console.log('✓ Template ID:', templateId ? '✓ Configurat' : '✗ No configurat');
console.log('✓ Contact Email:', contactEmail || 'No configurat\n');

if (!publicKey || !serviceId || !templateId) {
  console.error('\n❌ Error: Falten credencials d\'EmailJS');
  process.exit(1);
}

console.log('\n✅ Totes les credencials estan configurades correctament!');
console.log('\n📧 El formulari està llest per enviar emails a:', contactEmail);
console.log('\n💡 Ara pots executar: npm run dev');
console.log('   I visitar: http://localhost:3000/es/contact');
