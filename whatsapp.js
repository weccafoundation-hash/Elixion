export const WHATSAPP_NUMBER = "2349034168823";

export function buildWaLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Attach to window for inline onclick handlers
window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
window.buildWaLink = buildWaLink;
