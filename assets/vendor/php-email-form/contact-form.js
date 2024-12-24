document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const loading = document.querySelector('.loading');
    const errorMessage = document.querySelector('.error-message');
    const sentMessage = document.querySelector('.sent-message');
    const submitButton = document.getElementById('submit-button');

    // Show loading indicator
    loading.style.display = 'block';
    errorMessage.style.display = 'none';
    sentMessage.style.display = 'none';

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
            loading.style.display = 'none';
            sentMessage.style.display = 'block';

            // Disable the form to prevent resubmission
            submitButton.disabled = true;
            form.querySelectorAll('input, textarea').forEach(input => (input.disabled = true));
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Hide loading and show error message
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'There was an error. Please try again.';
    }
});
