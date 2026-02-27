const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USER/Desktop/elixion-prime';
const files = ['index.html', 'about.html', 'services.html', 'industries.html', 'manufacturing.html', 'projects.html', 'contact.html'];

const newFooter = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Elixion Prime International Limited</h4>
                    <p>Professional cleaning, fumigation, procurement, manufacturing, energy, and construction solutions across Lagos and Nigeria.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="manufacturing.html">Manufacturing</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact Info</h4>
                    <ul>
                        <li>&#128222; <a href="tel:+2349034168823">+234 903 416 8823</a></li>
                        <li>&#9993; <a href="mailto:info@elixionprimeinternational.com">info@elixionprimeinternational.com</a></li>
                        <li>&#128205; Lekki Epe Expressway, Lekki Phase 1, Lagos, Nigeria</li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Follow Us</h4>
                    <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                        <a href="https://wa.me/2349034168823" target="_blank" rel="noopener" aria-label="WhatsApp" style="font-size: 1.5rem;">📱</a>
                        <a href="#" aria-label="LinkedIn" style="font-size: 1.5rem;">💼</a>
                        <a href="#" aria-label="Facebook" style="font-size: 1.5rem;">🌐</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Elixion Prime International Limited. All rights reserved.</p>
            </div>
        </div>
    </footer>`;

// Regex configuration
const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/gi;

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Swap footer block
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooter.trim());
    } else {
        console.warn(`Footer not found in ${file}`);
    }

    // 2. Global WhatsApp href replacements
    content = content.replace(/23490341688233/g, '2349034168823');
    content = content.replace(/\+234 903 416 88233/g, '+234 903 416 8823');

    // Replace old placeholder tel values
    content = content.replace(/href="tel:(?!.*?2349034168823).*?"/g, 'href="tel:+2349034168823"');

    // Replace old placeholder mailto values
    content = content.replace(/href="mailto:(?!.*?info@elixionprimeinternational\.com).*?"/g, 'href="mailto:info@elixionprimeinternational.com"');

    // Check header links
    if (content.includes('wa.link') || content.includes('api.whatsapp.com')) {
        content = content.replace(/https:\/\/(wa\.link|api\.whatsapp\.com)[^"]+/ig, 'https://wa.me/2349034168823');
    }

    // Fix canonical meta strictly to www.
    content = content.replace(/<link rel="canonical" href="https:\/\/elixionprimeinternational\.com(.*?)"/gi, '<link rel="canonical" href="https://www.elixionprimeinternational.com$1"');
    // Also update OG properties
    content = content.replace(/content="https:\/\/elixionprimeinternational\.com(.*?)"/g, (match, p1) => {
        if (p1.includes('.png') || p1.includes('.jpg') || p1.includes('.ico')) {
            return match; // Ignore images, keep exact
        }
        return `content="https://www.elixionprimeinternational.com${p1}"`;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated footer and links in ${file}`);
});
