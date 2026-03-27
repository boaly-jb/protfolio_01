// Custom Cursor Movement
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    // Add slight delay by using requestAnimationFrame if needed, 
    // but CSS transition: transform 0.1s handles the "lag" feel
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Update Icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.marginTop = '0';
        nav.style.width = '100%';
        nav.style.borderRadius = '0';
    } else {
        if (window.innerWidth > 991) {
            nav.style.marginTop = '15px';
            nav.style.width = '90%';
            nav.style.borderRadius = '15px';
        }
    }
});

/**
 * Intersection Observer for Staggered Scroll Reveal
 */
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const serviceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Apply staggered delay based on element index
            // Entry.target is the .reveal-card div
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 200); // 0.2s stagger
            
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Initialize Observer on all service cards
document.querySelectorAll('.reveal-card').forEach(card => {
    serviceObserver.observe(card);
});

// Cursor Expansion Logic
const serviceCards = document.querySelectorAll('.glass-service-card');
const customCursor = document.getElementById('custom-cursor'); // Assumes ID from previous turn

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        customCursor.style.borderColor = 'var(--primary-yellow)';
        customCursor.style.backgroundColor = 'rgba(255, 193, 7, 0.1)';
    });
    card.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        customCursor.style.borderColor = 'var(--primary-yellow)';
        customCursor.style.backgroundColor = 'transparent';
    });
});

// Scroll Reveal Observer
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0s';
            entry.target.style.transitionDelay = delay;
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-fade').forEach(el => {
    observer.observe(el);
});



/**
 * Experience Timeline Animations
 */
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate the line growing
            const line = document.querySelector('.timeline-line');
            line.style.height = '100%';

            // Animate items with a slight stagger
            const items = document.querySelectorAll('.reveal-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active');
                }, index * 250);
            });

            // Stop observing once triggered
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Target the wrapper to trigger the whole sequence
const timelineWrapper = document.querySelector('.timeline-wrapper');
if (timelineWrapper) {
    experienceObserver.observe(timelineWrapper);
}


