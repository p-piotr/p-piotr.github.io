function scroll(event) {
    event.preventDefault();
    
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        // Get the scroll-margin-top value from the element
        const computedStyle = window.getComputedStyle(targetElement);
        const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop) || 0;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - scrollMarginTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 400; // milliseconds
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
}

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', scroll);
})
