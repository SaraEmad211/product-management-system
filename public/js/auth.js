
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

document.getElementById('showRegister').addEventListener('click', () => {
    console.log(registerForm.style.display );
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    console.log(registerForm.style.display );
    document.getElementById('message').innerText = '';
});

document.getElementById('showLogin').addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    document.getElementById('message').innerText = '';
});
// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('token', data.data.token);
            window.location.href = '/products';
        } else {
            document.getElementById('message').innerText = data.message || 'Login failed';
        }

    } catch(err) {
        console.log(err);
    }
});

// Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('message').innerText = 'Registered successfully! You can login now.';
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        } else {
            document.getElementById('message').innerText = data.message;
        }
    } catch(err) {
        console.log(err);
    }
});