// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Video popup functionality
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playVideo');
    const videoPopup = document.getElementById('videoPopup');
    const closePopup = document.getElementById('closePopup');
    const popupVideo = document.getElementById('popupVideo');
    
    if (playButton && videoPopup && closePopup && popupVideo) {
        // Open popup when play button is clicked
        playButton.addEventListener('click', () => {
            videoPopup.classList.add('active');
            // Play the video when popup opens
            popupVideo.play().catch(error => {
                console.log('Video play failed:', error);
            });
        });
        
        // Close popup when close button is clicked
        closePopup.addEventListener('click', () => {
            videoPopup.classList.remove('active');
            popupVideo.pause();
            popupVideo.currentTime = 0;
        });
        
        // Close popup when clicking outside the video
        videoPopup.addEventListener('click', (e) => {
            if (e.target === videoPopup) {
                videoPopup.classList.remove('active');
                popupVideo.pause();
                popupVideo.currentTime = 0;
            }
        });
        
        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoPopup.classList.contains('active')) {
                videoPopup.classList.remove('active');
                popupVideo.pause();
                popupVideo.currentTime = 0;
            }
        });
    }
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .step, .stat-item, .benefit, .contact-info, .contact-form, .app-content, .app-image');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    let count = 0;
    const increment = target / 100;
    
    const updateCount = () => {
        if (count < target) {
            count += increment;
            element.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            element.innerText = target;
        }
    };
    
    updateCount();
};

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            // Stop observing after animation
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    // Trigger animations for elements already in view
    const elements = document.querySelectorAll('[class*="animate-"]');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Element is in view
            element.style.animationDelay = '0s';
        }
    });
});