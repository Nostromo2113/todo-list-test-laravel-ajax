<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/js/task-manager.js'])
    <title>Task Manager</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container py-5">
    <div class="row mb-4">
        <div class="col">
            <h1 class="text-center">Task Manager</h1>
        </div>
    </div>

    <!-- Форма добавления задачи -->
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Add New Task</h5>
        </div>
        <div class="card-body">
            <form id="taskForm">
                @csrf
                <input type="hidden" id="taskId">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" required minlength="3" maxlength="20">
                </div>
                <div class="mb-3">
                    <label for="text" class="form-label">Description</label>
                    <textarea class="form-control" id="text" rows="3" maxlength="200"></textarea>
                </div>
                <div class="mb-3">
                    <label for="tagSelector" class="form-label">Tags</label>
                    <select class="form-select" id="tagSelector" name="tags[]" multiple>
                            {{--          TAGS             --}}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Save Task</button>
                <button type="button" class="btn btn-secondary" style="display: none;">
                    Cancel
                </button>
            </form>
        </div>
    </div>

    <!-- Список задач -->
    <div id="tasksList">
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</div>
@include('ui.edit-task-modal')
@include('ui.delete-task-modal')
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
