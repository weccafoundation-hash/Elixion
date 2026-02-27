const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/USER/Desktop/elixion-prime/contact.html';
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Hero text
content = content.replace(
    /Tell us what you need—our[\s\S]*?team will respond with the right next steps\./g,
    'Contact Elixion Prime International Limited — Professional Cleaning, Fumigation, Procurement & Manufacturing Solutions in Lagos.'
);


// 2. Map iframe
const oldMap = `<!-- Map Placeholder -->
                <div
                    style="width: 100%; height: 350px; background-color: #E0E0E0; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px dashed #BDBDBD; margin-bottom: 3rem;">
                    <div style="text-align: center; color: #757575;">
                        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🗺️</span>
                        <span style="font-weight: 600; font-size: 1.2rem;">Map Placeholder</span><br>
                        <span>(Embed Google Maps iframe here)</span>
                    </div>
                </div>`;

const newMap = `<!-- Map Embed -->
                <div style="width: 100%; height: 350px; background-color: #E0E0E0; border-radius: 8px; overflow: hidden; margin-bottom: 3rem; box-shadow: var(--shadow-sm);">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.118991304538!2d3.4566710499999995!3d6.4544778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf452da34cdd3%3A0x6bd77a6411dd7ac3!2sLekki%20Phase%20I%2C%20Lekki%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1708892400000!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style="border:0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>`;

content = content.replace(oldMap, newMap);


// 3. 4-column cards
const oldGridStart = `<div class="contact-grid">`;
const oldGridEnd = `</div>
        </div>
    </section>`;

const newGrid = `<div class="contact-grid">
                <!-- Card 1: Phone -->
                <div class="contact-card">
                    <div class="contact-icon">📞</div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--color-navy);">Phone / WhatsApp</h3>
                    <p style="color: var(--color-text-light);">We are available during business hours.</p>
                    <a href="tel:+2349034168823" style="color: var(--color-green); font-weight: 600; margin-top: 1rem; display: block;">+234 903 416 8823</a>
                    <a href="https://wa.me/2349034168823" target="_blank" rel="noopener" style="display:inline-block; margin-top:0.5rem; font-size:0.9rem; color: #25D366; font-weight: bold;">Chat on WhatsApp ></a>
                </div>
                <!-- Card 2: Email -->
                <div class="contact-card">
                    <div class="contact-icon">✉️</div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--color-navy);">Email</h3>
                    <p style="color: var(--color-text-light);">We aim to reply within 24 hours.</p>
                    <a href="mailto:info@elixionprimeinternational.com"
                        style="color: var(--color-green); font-weight: 600; margin-top: 1rem; display: inline-block;">info@elixionprimeinternational.com</a>
                </div>
                <!-- Card 3: Address -->
                <div class="contact-card">
                    <div class="contact-icon">📍</div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--color-navy);">Address</h3>
                    <p style="color: var(--color-text-light);">Visit our official headquarters.</p>
                    <span style="color: var(--color-green); font-weight: 600; margin-top: 1rem; display: inline-block;">
                        Lekki Epe Expressway,<br>
                        Lekki Phase 1,<br>
                        Lagos, Nigeria
                    </span>
                </div>
                <!-- Card 4: Service Coverage -->
                <div class="contact-card">
                    <div class="contact-icon">🌍</div>
                    <h3 style="margin-bottom: 0.5rem; color: var(--color-navy);">Service Coverage</h3>
                    <p style="color: var(--color-text-light);">Supporting clients across the nation.</p>
                    <span style="color: var(--color-green); font-weight: 600; margin-top: 1rem; display: inline-block;">
                        Serving Lagos and nationwide projects upon request.
                    </span>
                </div>
            </div>
        </div>
    </section>`;

// Target the block safely using regex to overcome formatting weirdness
content = content.replace(/<div class="contact-grid">[\s\S]*?<\/div>[\s]*?<\/div>[\s]*?<\/section>/, newGrid);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Contact update successful");
