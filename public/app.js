document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        console.log(data); // Check response data in the console
        alert(data.message);
    } catch (error) {
        alert('Error signing up');
    }
});

document.getElementById('signinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById(signinEmail).value;
    const password = document.getElementById(signupPassword).value;

      try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            alert('Sign in successful');
            console.log('Token:', data.token);
            console.log('User:', data.user);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error signing in');
    }
});