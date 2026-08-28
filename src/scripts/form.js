/**
 * OPTIMIA PMO - Contact Form & Corporate Simulation Controller
 */

export function setupContactForm() {
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        const form = document.getElementById('contact-form');
        const successBox = document.getElementById('contact-success');
        const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
        
        if (!form) return;

        const formData = new FormData(form);
        formData.append('_to', 'arq.adrianmanrique@gmail.com');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> <span>Enviando...</span>';
        }

        fetch('https://formsubmit.co/ajax/arq.adrianmanrique@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(() => {
            if (form && successBox) {
                form.classList.add('hidden');
                successBox.classList.remove('hidden');
            }
        })
        .catch(err => {
            console.warn('Form dispatch fallback notification:', err);
            if (form && successBox) {
                form.classList.add('hidden');
                successBox.classList.remove('hidden');
            }
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> <span>Enviar Solicitud de Auditoría</span>';
            }
        });
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
