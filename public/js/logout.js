const logout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert('Unable to log you out at this time. Do you even lift, bro?');
        }
    } catch (err) {
        console.error(err)
    }
};

document.querySelector('#logout').addEventListener('click', logout);