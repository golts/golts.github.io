document.querySelectorAll('.contact-form').forEach(function (form) {
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const loading = form.querySelector('.loading');
        const errorMessage = form.querySelector('.error-message');
        const sentMessage = form.querySelector('.sent-message');
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading indicator
        if (loading) loading.style.display = 'block';
        if (errorMessage) errorMessage.style.display = 'none';
        if (sentMessage) sentMessage.style.display = 'none';

        try {
            // Send form data to Formspree
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                // Hide loading and show success message
                if (loading) loading.style.display = 'none';
                if (sentMessage) sentMessage.style.display = 'block';

                // Disable the form to prevent resubmission
                if (submitButton) submitButton.disabled = true;
                form.querySelectorAll('input, textarea').forEach(input => (input.disabled = true));
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Hide loading and show error message
            if (loading) loading.style.display = 'none';
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'There was an error. Please try again.';
            }
        }
    });
});
