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
});
