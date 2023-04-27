const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Unable to log you in at this time. Please verify your email and password and try again.');
            }
        } catch (err) {
            console.error(err)
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);