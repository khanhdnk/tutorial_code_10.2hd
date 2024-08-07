export default {
    // Called when the bound element is mounted into the DOM
    mounted(el, binding) {
        const color = binding.value;

        // Set initial border and transition properties
        el.style.border = `2px solid ${color}`;
        el.style.transition = 'border 0.5s, opacity 2s, box-shadow 0.3s';

        // Set initial opacity
        el.style.opacity = '1';

        // Add hover effect
        el.addEventListener('mouseenter', () => {
            el.style.boxShadow = `0px 4px 15px ${color}`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.boxShadow = 'none';
        });
    }
};
