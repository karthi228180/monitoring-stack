// ⚠️ Replace this with YOUR API Gateway invoke URL after deploying (Step 7 of the guide)
// It will look like: https://xxxxxxxxxx.execute-api.<region>.amazonaws.com/prod-deploy/register
const API_URL = 'https://08av0tk1d7.execute-api.ap-south-1.amazonaws.com/prod/register';

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Stop the browser's default form submission

    const formData = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        class_apply: document.getElementById('class_apply').value.trim(),
        dob: document.getElementById('dob').value,
        parent_first_name: document.getElementById('parent_first_name').value.trim(),
        parent_last_name: document.getElementById('parent_last_name').value.trim(),
        address: document.getElementById('address').value.trim(),
        address2: document.getElementById('address2').value.trim(),
        city: document.getElementById('city').value.trim(),
        region: document.getElementById('region').value.trim(),
        postal_code: document.getElementById('postal_code').value.trim(),
        country: document.getElementById('country').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        signature: document.getElementById('signature').value.trim()
    };

    console.log('Submitting form data:', formData);

    const submitBtn = document.querySelector('#registrationForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting…';
    }

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(async (response) => {
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || `Request failed with status ${response.status}`);
            }
            return data;
        })
        .then((data) => {
            console.log('Success:', data);
            alert('Form successfully submitted!');
            document.getElementById('registrationForm').reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error submitting the form: ' + error.message);
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }
        });
});
