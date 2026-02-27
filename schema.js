// Local Business and Organization Schema
const schemaData = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "Elixion Prime International Limited",
    "url": "https://www.elixionprimeinternational.com",
    "logo": "https://www.elixionprimeinternational.com/logo.png",
    "image": "https://www.elixionprimeinternational.com/logo.png",
    "description": "Professional cleaning, fumigation, procurement, manufacturing, energy, and construction solutions across Lagos and Nigeria.",
    "telephone": "+2349034168823",
    "email": "info@elixionprimeinternational.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lekki Epe Expressway, Lekki Phase 1",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
    },
    "areaServed": "Nigeria",
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "17:00"
        }
    ],
    "sameAs": [
        "https://www.facebook.com/elixionprime",
        "https://www.instagram.com/elixionprime",
        "https://www.linkedin.com/company/elixion-prime"
    ]
};

// Inject into head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
