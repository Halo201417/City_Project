document.addEventListener('DOMContentLoaded', (event) => {
    
    /* Gallery photos */

    const lightbox = GLightbox({
        loop: true,
        touchNavigation: true,
        descPosition: 'bottom'
    });

    /* Button */

    const backToTopBtn = document.getElementById("backToTopBtn");
    if(backToTopBtn) {
        const scrollFunction = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };
        const topFunction = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        window.onscroll = () => scrollFunction();
        backToTopBtn.onclick = () => topFunction();
    }

    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.global-nav li a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage.endsWith(linkHref) || (linkHref === '/' && currentPage.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });

    /* Toggle menu */

    const menuToggleBtn = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.global-nav ul');
    if (menuToggleBtn && navList) {
        menuToggleBtn.addEventListener('click', () => {
            navList.classList.toggle('show-menu');
            if (navList.classList.contains('show-menu')) {
                menuToggleBtn.innerHTML = '✕ Close';
            } else {
                menuToggleBtn.innerHTML = '☰ Menu';
            }
        });
    }

    /* Dark mode */

    const darkModeBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if(darkModeBtn) darkModeBtn.innerText = '☀️';
    }
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeBtn.innerText = '☀️';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeBtn.innerText = '�';
            }
        });
    }

    /* Form */

    if (sessionStorage.getItem('formSubmitted') === 'true') {
        sessionStorage.removeItem('formSubmitted');
        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
        }, 100);
    }

    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        
        const formFields = {
            Name: contactForm.querySelector("#name"),
            Email: contactForm.querySelector("#email"),
            Message: contactForm.querySelector("#message"),
        };

        const errorMessages = {
            Name: document.getElementById("name-error"),
            Email: document.getElementById("email-error"),
            Message: document.getElementById("message-error"),
        };

        function isValidEmail(email) {
            const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return validation.test(email);
        }

        function textCounter(text) {
            if (typeof text !== 'string') return 0;
            const cleanText = text.trim();
            if (cleanText === '') return 0;
            return cleanText.split(/\s+/).length;
        }
        
        const validations = {
            Name: val => textCounter(val) > 0 && textCounter(val) <= 2,
            Email: val => val.trim() !== "" && isValidEmail(val),
            Message: val => textCounter(val) > 0 && textCounter(val) < 400,
        };
        
        const messagesInScreen = {
            Name: val => {
                const words = textCounter(val);
                if (words === 0) return "The name cannot be empty.";
                if (words > 2) return `The name has ${words} words. A maximum of 2 is allowed.`;
                return "";
            },
            Email: val => {
                if (val.trim() === "") return "The email cannot be empty.";
                if (!isValidEmail(val)) return "Invalid email format (e.g. user@domain.com).";
                return "";
            },
            Message: val => {
                const words = textCounter(val);
                if (words === 0) return "The message cannot be empty.";
                if (words >= 400) return `The message has ${words} words. A maximum of 400 is allowed.`;
                return "";
            },
        };
        
        function validateField(fieldName) {
            const field = formFields[fieldName];
            const messageSpan = errorMessages[fieldName];

            if (!field) return true;

            const isValid = validations[fieldName](field.value);
            const errorText = messagesInScreen[fieldName](field.value);

            field.style.border = "";
            field.style.backgroundColor = "";
            field.style.boxShadow = "";
            field.style.color = "";

            if (!isValid) {
                field.style.setProperty("border", "3px solid #dc3545", "important");
                field.style.setProperty("background-color", "#ffebee", "important");
                field.style.setProperty("box-shadow", "0 0 0 0.2rem rgba(220,53, 69, 0.25)", "important");
            
                field.style.setProperty("color", "#000000", "important"); 

                if (messageSpan) {
                    messageSpan.textContent = errorText;
                    messageSpan.style.display = "block";
                    messageSpan.style.color = "#dc3545";
                    messageSpan.style.backgroundColor = "#f8d7da";
                    messageSpan.style.padding = "5px 8px";
                    messageSpan.style.borderRadius = "4px";
                    messageSpan.style.marginTop = "5px";
                }
            }
            else{
                field.style.setProperty("border", "2px solid #28a745", "important");
                field.style.setProperty("background-color", "#f8fff9", "important");
                field.style.setProperty("box-shadow", "0 0 0 0.1rem rgba(40,167,69, 0.15)", "important");
            
                field.style.setProperty("color", "#000000", "important");

                if (messageSpan) {
                    messageSpan.textContent = "";
                    messageSpan.style.display = "none";
                }
            }

            return isValid;
        }
        
        function validateForm() {
            let allValid = true;
            for (let field in formFields) {
                if (!validateField(field)) {
                    allValid = false;
                }
            }
            return allValid;
        }

        for (let field in formFields) {
            const inputElement = formFields[field];
            if (inputElement) {
                inputElement.addEventListener("input", () => {
                    setTimeout(() => validateField(field), 200); 
                });
                inputElement.addEventListener("blur", () => validateField(field));
            }
        }

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const isFormValid = validateForm();

            if (isFormValid) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                
                submitBtn.innerText = 'Sending...';
                submitBtn.style.backgroundColor = '#ccc';
                submitBtn.disabled = true;

                setTimeout(() => {
                    sessionStorage.setItem('formSubmitted', 'true');
                    window.location.href = window.location.href;
                }, 1000);

            } else {
                for (let field in formFields) {
                    if (!validateField(field)) {
                        formFields[field].focus();
                        break;
                    }
                }
            }
        });
    }
});