const registerFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-register').value.trim();
    const userName = email.split('@')[0];
    const password = document.querySelector('#password-register').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                body: JSON.stringify({ email, userName, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/views/layouts/dashboard.handlebars');
            } else {
                alert('You have failed to assimilate.  Verify your inputs and join the circle.');
            }
        } catch (err) {
            console.error(err)
        }
    }
};

document.querySelector('.register-form').addEventListener('submit', registerFormHandler);