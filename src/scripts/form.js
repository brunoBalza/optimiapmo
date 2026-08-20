/**
 * OPTIMIA PMO - Contact Form & Corporate Simulation Controller
 */

export function setupContactForm() {
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        const form = document.getElementById('contact-form');
        const successBox = document.getElementById('contact-success');
        
        if (form && successBox) {
            form.classList.add('hidden');
            successBox.classList.remove('hidden');
        }
    };

    window.resetContactForm = function() {
        const form = document.getElementById('contact-form');
        const successBox = document.getElementById('contact-success');
        
        if (form && successBox) {
            form.reset();
            form.classList.remove('hidden');
            successBox.classList.add('hidden');
        }
    };
}
