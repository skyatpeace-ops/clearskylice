const appointmentForm = document.querySelector('.appointment-form');
const submitButton = appointmentForm.querySelector('button[type="submit"]');
const statusMessage = appointmentForm.querySelector('[role="status"]');

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (submitButton.disabled) return;

  submitButton.disabled = true;
  statusMessage.textContent = 'Sending your request…';

  try {
    const response = await fetch(appointmentForm.action, {
      method: 'POST',
      body: new FormData(appointmentForm),
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Formspree did not accept the request.');

    appointmentForm.reset();
    statusMessage.textContent = 'Request received. We’ll text you to confirm availability.';
  } catch {
    statusMessage.textContent = 'We couldn’t confirm that your request went through. Please try again or text (512) 563-4162.';
  } finally {
    submitButton.disabled = false;
  }
});

appointmentForm.hidden = false;
