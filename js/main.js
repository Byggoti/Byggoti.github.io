// Mobile Menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');
    mobileDropdowns.forEach(drop => {
        drop.addEventListener('click', (e) => {
            e.preventDefault(); // împiedică navigarea
            drop.parentElement.classList.toggle('open');
        });
    });
});
