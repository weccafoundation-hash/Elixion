import { buildWaLink } from './whatsapp.js';

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.error-text').forEach(el => el.remove());
            form.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
                el.style.borderColor = 'var(--color-border)';
            });

            // Helper to show error
            const showError = (field, message) => {
                isValid = false;
                field.classList.add('error');
                field.style.borderColor = 'red';

                // create inline error message
                const errorEl = document.createElement('div');
                errorEl.className = 'error-text';
                errorEl.style.color = 'red';
                errorEl.style.fontSize = '0.85rem';
                errorEl.style.marginTop = '0.25rem';
                errorEl.innerText = message;

                // insert after field
                if (field.parentElement.classList.contains('checkbox-label')) {
                    field.parentElement.parentElement.appendChild(errorEl);
                } else {
                    field.parentElement.appendChild(errorEl);
                }
            };

            // 1. Standard Required Text/Select Fields Validation
            const requiredFields = form.querySelectorAll('input[required]:not([type="checkbox"]), select[required], textarea[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showError(field, 'This field is required.');
                }
            });

            // 2. Required Checkboxes Validation
            const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][required]');
            requiredCheckboxes.forEach(cb => {
                if (!cb.checked) {
                    showError(cb, 'You must check this box to proceed.');
                }
            });

            // 3. Conditional validation: Email OR Phone
            const emailField = form.querySelector('input[type="email"].conditional-contact');
            const phoneField = form.querySelector('input[type="tel"].conditional-contact');

            if (emailField && phoneField) {
                if (!emailField.value.trim() && !phoneField.value.trim()) {
                    showError(emailField, 'Please provide either an email or phone number.');
                    showError(phoneField, 'Please provide either an email or phone number.');
                }
            }

            // 4. Checkbox Group Validation (Products of interest)
            const checkboxGroups = form.querySelectorAll('[data-required-group]');
            checkboxGroups.forEach(group => {
                const checkboxes = group.querySelectorAll('input[type="checkbox"]');
                if (checkboxes.length > 0) {
                    const isChecked = Array.from(checkboxes).some(cb => cb.checked);

                    const existingErrorMsg = group.parentElement.querySelector('.error-message');

                    if (!isChecked) {
                        isValid = false;
                        if (existingErrorMsg) existingErrorMsg.classList.add('active');
                        group.style.color = 'red';
                    } else {
                        if (existingErrorMsg) existingErrorMsg.classList.remove('active');
                        group.style.color = 'inherit';
                    }
                }
            });

            if (isValid) {
                let waMessage = "";

                // Quote Form (contact.html)
                if (form.id === 'quoteForm') {
                    const fullName = form.querySelector('#fullName')?.value || '';
                    const company = form.querySelector('#company')?.value || '';
                    const email = form.querySelector('#email')?.value || '';
                    const phone = form.querySelector('#phone')?.value || '';
                    const serviceSel = form.querySelector('#serviceType');
                    const serviceType = serviceSel?.options[serviceSel.selectedIndex]?.text || '';
                    const location = form.querySelector('#location')?.value || '';
                    const budgetSel = form.querySelector('#budget');
                    const budget = (budgetSel && budgetSel.selectedIndex > 0) ? budgetSel.options[budgetSel.selectedIndex].text : 'Not specified';
                    const prefDate = form.querySelector('#date')?.value || 'Not specified';
                    const message = form.querySelector('#message')?.value || '';

                    waMessage = `*Elixion Prime — Quote Request*\n` +
                        `Name: ${fullName}\n` +
                        `Company: ${company || 'N/A'}\n` +
                        `Email: ${email || 'N/A'}\n` +
                        `Phone/WhatsApp: ${phone || 'N/A'}\n` +
                        `Service Needed: ${serviceType}\n` +
                        `Location: ${location}\n` +
                        `Budget Range: ${budget}\n` +
                        `Preferred Date: ${prefDate}\n` +
                        `Message: ${message}`;
                }
                // Service Form (services.html)
                else if (form.id === 'serviceForm') {
                    const fullName = form.querySelector('#fullName')?.value || '';
                    const email = form.querySelector('#email')?.value || '';
                    const phone = form.querySelector('#phone')?.value || '';
                    const serviceSel = form.querySelector('#serviceType');
                    const serviceType = serviceSel?.options[serviceSel.selectedIndex]?.text || '';
                    const location = form.querySelector('#location')?.value || '';
                    const prefDate = form.querySelector('#prefDate')?.value || 'Not specified';
                    const message = form.querySelector('#message')?.value || '';

                    waMessage = `*Elixion Prime — Service Request*\n` +
                        `Name: ${fullName}\n` +
                        `Email: ${email || 'N/A'}\n` +
                        `Phone/WhatsApp: ${phone || 'N/A'}\n` +
                        `Service Type: ${serviceType}\n` +
                        `Location: ${location}\n` +
                        `Preferred Date: ${prefDate}\n` +
                        `Message: ${message}`;
                }
                // Manufacturing Form (manufacturing.html)
                else if (form.id === 'mfgForm') {
                    const fullName = form.querySelector('#mfgName')?.value || '';
                    const company = form.querySelector('#mfgCompany')?.value || '';
                    const email = form.querySelector('#mfgEmail')?.value || '';
                    const phone = form.querySelector('#mfgPhone')?.value || '';

                    const interestSel = form.querySelector('#mfgInterest');
                    const interestType = interestSel?.options[interestSel.selectedIndex]?.text || '';

                    const checkboxes = form.querySelectorAll('input[name="product"]:checked');
                    const products = Array.from(checkboxes).map(cb => {
                        return cb.parentElement.innerText.trim();
                    }).join(', ') || 'None selected';

                    const qty = form.querySelector('#mfgQty')?.value || 'Not specified';
                    const location = form.querySelector('#mfgLocation')?.value || '';
                    const message = form.querySelector('#mfgMessage')?.value || '';

                    waMessage = `*Elixion Prime — Manufacturing / Wholesale Enquiry*\n` +
                        `Name: ${fullName}\n` +
                        `Company Name: ${company}\n` +
                        `Email: ${email || 'N/A'}\n` +
                        `Phone/WhatsApp: ${phone || 'N/A'}\n` +
                        `Interest Type: ${interestType}\n` +
                        `Product(s): ${products}\n` +
                        `Estimated Monthly Quantity: ${qty}\n` +
                        `Delivery Location: ${location}\n` +
                        `Message: ${message}`;
                }

                if (waMessage) {
                    const targetBtn = form.querySelector('button[type="submit"]');
                    const originalText = targetBtn.innerText;
                    targetBtn.innerText = 'Redirecting to WhatsApp...';
                    targetBtn.disabled = true;

                    // Small timeout to allow UI to update to "Redirecting..."
                    setTimeout(() => {
                        window.open(buildWaLink(waMessage), '_blank');

                        // Form is NOT reset intentionally, so users can keep info unless requested otherwise.
                        targetBtn.innerText = originalText;
                        targetBtn.disabled = false;
                    }, 500);
                }
            }
        });
    });
});
