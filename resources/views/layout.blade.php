<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="tasks-tab" data-bs-toggle="tab" data-bs-target="#tasks" type="button"
                    role="tab" aria-controls="tasks" aria-selected="true">
                Задачи
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tags-tab" data-bs-toggle="tab" data-bs-target="#tags" type="button"
                    role="tab" aria-controls="tags" aria-selected="false">
                Теги
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="tasks" role="tabpanel" aria-labelledby="tasks-tab">
            @include('todo')  <!-- Включение списка задач -->
        </div>
        <div class="tab-pane fade" id="tags" role="tabpanel" aria-labelledby="tags-tab">
            @include('tags')  <!-- Включение списка тегов -->
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
