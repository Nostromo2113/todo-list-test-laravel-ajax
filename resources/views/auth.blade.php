<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход / Регистрация</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    @vite(['resources/js/auth.js'])
</head>
<body class="container py-5">
<h2>Авторизация</h2>
<div class="mb-3">
    <input type="email" id="email" class="form-control mb-2" placeholder="Email">
    <input type="password" id="password" class="form-control mb-2" placeholder="Пароль">
    <button class="btn btn-primary" id="loginBtn">Войти</button>
</div>

<hr>

<h2>Регистрация</h2>
<div class="mb-3">
    <input type="text" id="name" class="form-control mb-2" placeholder="Имя">
    <input type="email" id="reg-email" class="form-control mb-2" placeholder="Email">
    <input type="password" id="reg-password" class="form-control mb-2" placeholder="Пароль">
    <button class="btn btn-secondary" id="registerBtn">Зарегистрироваться</button>
</div>
</body>
</html>
