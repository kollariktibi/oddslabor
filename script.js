// Mobile Menu Functions
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const btn = document.querySelector('.mobile-menu-btn');

    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    btn.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const btn = document.querySelector('.mobile-menu-btn');

    menu.classList.remove('active');
    overlay.classList.remove('active');
    btn.classList.remove('active');
    document.body.style.overflow = '';
}

// Close mobile menu on window resize (if screen becomes larger than tablet/iPad Pro)
window.addEventListener('resize', function() {
    if (window.innerWidth > 1199) {
        closeMobileMenu();
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                closeMobileMenu();
                // Smooth scroll to target
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Payment method selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
        this.classList.add('active');
    });
});

// Subscribe button handler
function handleSubscribe() {
    const email = document.querySelector('input[type="email"]').value;
    const name = document.querySelector('input[placeholder="Teljes név"]').value;

    if (!email || !name) {
        alert('Kérlek töltsd ki az összes mezőt!');
        return;
    }

    // Itt integrálhatod a tényleges fizetési szolgáltatót (Stripe, PayPal, stb.)
    alert('Köszönjük az érdeklődést! Hamarosan felvesszük veled a kapcsolatot az előfizetés véglegesítéséhez.');
}

// FAQ toggle functionality
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== this) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        this.classList.toggle('active');
    });
});

// Modal/Lightbox functionality
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('contactForm').reset();
    document.getElementById('form-status').className = 'form-status';
    document.getElementById('form-status').style.display = 'none';
}

// Close contact modal when clicking outside
document.getElementById('contactModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeContactModal();
    }
});

// EmailJS Initialization
const EMAILJS_PUBLIC_KEY = 'y3VO2f0EBl0eGQyZH';
const EMAILJS_SERVICE_ID = 'service_e2ctz9i';
const EMAILJS_TEMPLATE_ID = 'template_gztj0rz';

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// Contact Form Submit Handler
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        showFormStatus('Kérlek konfiguráld az EmailJS beállításokat a script.js fájlban!', 'error');
        return;
    }

    const submitButton = this.querySelector('.contact-submit-button');
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoading = submitButton.querySelector('.submit-loading');
    const formStatus = document.getElementById('form-status');

    // Show loading state
    submitButton.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    formStatus.style.display = 'none';

    // Send email using EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(function() {
            showFormStatus('✅ Üzeneted sikeresen elküldve! Hamarosan válaszolunk.', 'success');

            // Reset form after successful submission
            setTimeout(() => {
                closeContactModal();
            }, 3000);
        }, function() {
            showFormStatus('❌ Hiba történt az üzenet küldése során. Próbáld újra később vagy írj nekünk közvetlenül: info@oddslabor.com', 'error');
        })
        .finally(function() {
            // Reset button state
            submitButton.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        });
});

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
}

// ÁSZF Modal Functions
function openAszfModal() {
    const modal = document.getElementById('aszfModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAszfModal() {
    const modal = document.getElementById('aszfModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Adatvédelem Modal Functions
function openAdatvedelemModal() {
    const modal = document.getElementById('adatvedelemModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAdatvedelemModal() {
    const modal = document.getElementById('adatvedelemModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close legal modals when clicking outside
document.getElementById('aszfModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeAszfModal();
    }
});

document.getElementById('adatvedelemModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeAdatvedelemModal();
    }
});

// Update ESC key handler to close all modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeContactModal();
        closeAszfModal();
        closeAdatvedelemModal();
    }
});

// Social Proof Notification Bubble
const hungarianNames = [
    'Péter',
    'Gábor',
    'Tamás',
    'Balázs',
    'Dávid',
    'Ádám',
    'Márk',
    'Zoltán',
    'László',
    'András',
    'Krisztián',
    'Attila',
    'Richárd',
    'Bence',
    'Norbert',
    'Csaba',
    'Róbert',
    'Levente',
    'Máté',
    'Viktor'
];

let socialProofTimeout;

function showSocialProof() {
    // Check if already shown to this user (localStorage)
    if (localStorage.getItem('socialProofShown')) return;

    const bubble = document.getElementById('socialProofBubble');
    const nameElement = bubble.querySelector('.bubble-name');

    // Pick random name
    const randomName = hungarianNames[Math.floor(Math.random() * hungarianNames.length)];
    nameElement.textContent = randomName;

    // Show bubble
    bubble.classList.add('show');

    // Mark as shown in localStorage (persists across sessions)
    localStorage.setItem('socialProofShown', 'true');

    // Auto-hide after 8 seconds
    setTimeout(() => {
        closeSocialProof();
    }, 8000);
}

function closeSocialProof() {
    const bubble = document.getElementById('socialProofBubble');
    bubble.classList.remove('show');
}

// Show social proof after 25 seconds on page (only if not shown before)
setTimeout(() => {
    showSocialProof();
}, 25000);

// Bookmaker Popup functionality
const bookmakers = [
    {
        name: '22bet',
        image: '22bet.jpg',
        link: 'https://moy.auraodin.com/redirect.aspx?pid=163057&bid=1495&lpid=115',
        bonus: '100% sportfogadás bónusz 48500 Ft-ig'
    }
    // További fogadóirodák később hozzáadhatók
];

let currentBookmakerLink = '';

function showBookmakerPopup() {
    const popup = document.getElementById('bookmakerPopup');
    const popupLink = document.getElementById('bookmakerPopupLink');
    const popupImage = document.getElementById('bookmakerPopupImage');
    const popupName = document.getElementById('bookmakerPopupName');
    const popupBonus = document.getElementById('bookmakerPopupBonus');

    // Pick random bookmaker
    const randomBookmaker = bookmakers[Math.floor(Math.random() * bookmakers.length)];

    // Store link for click handler
    currentBookmakerLink = randomBookmaker.link;

    // Set popup content
    popupLink.href = randomBookmaker.link;
    popupImage.src = randomBookmaker.image;
    popupImage.alt = randomBookmaker.name;
    popupName.textContent = randomBookmaker.name;
    popupBonus.textContent = randomBookmaker.bonus;

    // Add click handler to popup content
    popupLink.onclick = function(e) {
        e.preventDefault();
        window.open(currentBookmakerLink, '_blank');
    };

    // Show popup
    popup.classList.add('show');
}

function closeBookmakerPopup() {
    const popup = document.getElementById('bookmakerPopup');
    popup.classList.remove('show');
}

// Show bookmaker popup after 10 seconds on page (only if not shown before)
setTimeout(() => {
    showBookmakerPopup();
}, 10000);
