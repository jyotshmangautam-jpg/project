document.addEventListener("DOMContentLoaded", () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // 1-second delay for aesthetic 
    });

    // --- Custom Cursor Glow ---
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Enhance cursor on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.background = 'radial-gradient(circle, var(--neon-purple) 0%, transparent 80%)';
        });
        elem.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.background = 'radial-gradient(circle, var(--neon-blue) 0%, transparent 80%)';
        });
    });

    // --- Typing Effect ---
    const textArray = ["Full Stack Developer", "UI/UX Designer", "Problem Solver"];
    const typingSpan = document.getElementById("typing-text");
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Initiate typing effect
    setTimeout(type, 1500); 

    // --- Scroll Animations (Intersection Observer) ---
    const hiddenSections = document.querySelectorAll('.section-hidden');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.15 }); // Triggers when 15% of element is visible

    hiddenSections.forEach((el) => scrollObserver.observe(el));

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Form Submission Prevention (Demo only) ---
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent successfully! (This is a frontend demo)');
        form.reset();
    });
});