// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation scroll effect.
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position for styling only
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Keep nav always visible at the top
    nav.style.transform = 'translateY(0)';
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats counter
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Counter animation for stats
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const target = parseFloat(numberElement.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            numberElement.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
    };
    
    updateCounter();
}

// Parallax effect for floating cards
window.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.05;
        const x = (mouseX - 0.5) * 50 * speed;
        const y = (mouseY - 0.5) * 50 * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth reveal on scroll
const revealElements = document.querySelectorAll('.hero-content, .section-header, .showcase-content, .cta-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
    revealObserver.observe(element);
});

// Button ripple effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload optimization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mobile Menu Toggle - Global function
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    window.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    });

    // Initialize animations on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Add loaded class to body to trigger animations
        document.body.classList.add('loaded');
        
        // Set initial active state for home link
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                targetElement.scrollIntoView();
            }
        }
    });

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy operations
const throttledScroll = throttle(() => {
    // Additional scroll operations can go here
}, 100);

window.addEventListener('scroll', throttledScroll);

// Image scroll animations with parallax and reveal effects
const imageObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('image-visible');
        }
    });
}, imageObserverOptions);

// Observe all showcase images
document.querySelectorAll('.showcase-visual img').forEach(img => {
    imageObserver.observe(img);
});

// Parallax scroll effect for images
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.showcase-visual img').forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        if (scrollPercent >= 0 && scrollPercent <= 1) {
            // Subtle parallax movement
            const translateY = (scrollPercent - 0.5) * 30;
            const scale = 0.95 + (scrollPercent * 0.1);
            
            img.style.transform = `translateY(${translateY}px) scale(${Math.min(scale, 1.05)})`;
        }
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Staggered fade-in for feature cards with scale
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.95)';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cardObserver.observe(card);
});

// Showcase content slide-in animations
document.querySelectorAll('.showcase-content').forEach((content, index) => {
    // Skip the first showcase (Productivity section)
    if (index === 0) {
        // Set to visible immediately without animation
        const textElement = content.querySelector('.showcase-text');
        const visualElement = content.querySelector('.showcase-visual');
        
        if (textElement) {
            textElement.style.opacity = '1';
            textElement.style.transform = 'none';
        }
        
        if (visualElement) {
            visualElement.style.opacity = '1';
            visualElement.style.transform = 'none';
        }
        return;
    }
    
    // For other sections, keep the animation
    const textElement = content.querySelector('.showcase-text');
    const visualElement = content.querySelector('.showcase-visual');
    
    if (textElement && visualElement) {
        const showcaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Slide in from opposite directions
                    setTimeout(() => {
                        textElement.style.opacity = '1';
                        textElement.style.transform = 'translateX(0)';
                    }, 100);
                    
                    setTimeout(() => {
                        visualElement.style.opacity = '1';
                        visualElement.style.transform = 'translateX(0) scale(1)';
                    }, 300);
                    
                    showcaseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial states
        textElement.style.opacity = '0';
        textElement.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        textElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        visualElement.style.opacity = '0';
        visualElement.style.transform = index % 2 === 0 ? 'translateX(50px) scale(0.9)' : 'translateX(-50px) scale(0.9)';
        visualElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        showcaseObserver.observe(content);
    }
});

// Remove parallax from the first showcase image
document.querySelectorAll('.showcase-visual img').forEach((img, index) => {
    if (index === 0) {
        img.style.transform = 'none';
    }
});

// Remove image observer for the first showcase image
document.querySelectorAll('.showcase-visual img').forEach((img, index) => {
    if (index === 0) {
        img.classList.add('image-visible');
    } else {
        imageObserver.observe(img);
    }
});

// Image hover effects with 3D tilt
document.querySelectorAll('.showcase-visual img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        this.style.transition = 'transform 0.5s ease';
    });
});

// Animate showcase features list items
document.querySelectorAll('.showcase-features li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 100);
                listObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    listObserver.observe(item);
});

// Hero title animation enhancement
document.querySelectorAll('.hero-title-line').forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        line.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }, index * 200 + 300);
});

console.log('🚀 INARA - Innovation Redefined');

// Countdown Timer - 20 days expiration
function initCountdown() {
    // Fixed start date: October 15, 2025 at 18:25
    const startDate = new Date('2025-10-15T18:25:00');
    
    // Calculate end date: 20 days from start date
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 20);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;
        
        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update the DOM
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        
        if (daysElement && hoursElement && minutesElement) {
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
        }
        
        // If countdown is finished
        if (distance < 0) {
            if (daysElement && hoursElement && minutesElement) {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
            }
            const countdownLabel = document.querySelector('.countdown-label');
            if (countdownLabel) {
                countdownLabel.textContent = 'Project Funding Has Been Canceled';
            }
            clearInterval(countdownInterval);
        }
    }
    
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every minute
    const countdownInterval = setInterval(updateCountdown, 60000);
}

// Initialize countdown when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
} else {
    initCountdown();
}
