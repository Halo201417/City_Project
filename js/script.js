document.addEventListener('DOMContentLoaded', (event) =>{
    const lightbox = GLightbox({
        loop:true,
        touchNavigation: true,
        descPosition: 'bottom'
    });

    //Button
    const backToTopBtn = document.getElementById("backToTopBtn");

    const scrollFunction = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
            backToTopBtn.style.display = "block";
        }
        else{
            backToTopBtn.style.display = "none";
        }
    };

    const topFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.onscroll = () => scrollFunction();
    backToTopBtn.onclick = () => topFunction();

    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.global-nav li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        if(currentPage.endsWith(linkHref)){
            link.classList.add('active');
        }
    });

    /* Form simulation */

    if(sessionStorage.getItem('formSubmitted') === 'true'){
        sessionStorage.removeItem('formSubmitted');

        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully.');
        }, 100);
    }

    const contactForm = document.querySelector('.contact-form form');

    if(contactForm){
        contactForm.addEventListener('submit', function(event){
            event.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');

            submitBtn.innerText = 'Sending...';
            submitBtn.style.backgroundColor = '#ccc';
            submitBtn.disabled = true;

            setTimeout(() => {
                sessionStorage.setItem('formSubmitted', 'true');

                window.location.href = window.location.href;
            }, 1000);
        });
    }

    /* Toggle menu */
    const menuToggleBtn = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.global-nav ul');

    if(menuToggleBtn && navList){
        menuToggleBtn.addEventListener('click', () => {
            navList.classList.toggle('show-menu');

            if(navList.classList.contains('show-menu')){
                menuToggleBtn.innerHTML = '✕ Close';
            }
            else{
                menuToggleBtn.innerHTML = '☰ Menu';
            }
        });
    }
});