<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/js/tagManager.js'])
    <title>Tag Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container py-5">
    <h1 class="mb-4 text-center">Tag Manager</h1>

    <!-- Форма добавления тега -->
    <form id="tagForm" class="mb-4">
        @csrf
        <input type="hidden" id="tagId">
        <div class="input-group">
            <input type="text" class="form-control" id="tagName" placeholder="Введите название тега" required>
            <button class="btn btn-primary" type="submit">Сохранить</button>
        </div>
    </form>

    <!-- Список тегов -->
    <div id="tagsList" class="row">
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</div>
@include('ui.edit-tag-modal')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
