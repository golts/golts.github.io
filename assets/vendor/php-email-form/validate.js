/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      // Reset messages
      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.sent-message').style.display = 'none';

      let action = thisForm.getAttribute('action');
      if (!action) {
        console.error('The form action property is not set!');
        return;
      }

      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Error submitting the form.');
          }
        })
        .then(data => {
          thisForm.querySelector('.loading').style.display = 'none';
          if (data.trim() === 'OK') {
            thisForm.querySelector('.sent-message').style.display = 'block';
            thisForm.reset();
          }
        })
        .catch(() => {
          thisForm.querySelector('.loading').style.display = 'none';
        });
    });
  });
})();
