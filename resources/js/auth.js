document.addEventListener('DOMContentLoaded', function () {

    const login = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/todo';
            } else {
                alert('Ошибка входа');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сети или сервера');
        }
    };

    const register = async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/todo';
            } else {
                alert('Ошибка регистрации');
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка сети или сервера');
        }
    };

    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
});
