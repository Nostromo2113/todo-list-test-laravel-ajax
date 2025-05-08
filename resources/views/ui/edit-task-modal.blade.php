<div class="modal fade" id="editTaskModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Редактирование задачи</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="editTaskId">

                <div class="mb-3">
                    <label for="editTaskTitle" class="form-label">Заголовок</label>
                    <input type="text" class="form-control" id="editTaskTitle">
                </div>

                <div class="mb-3">
                    <label for="editTaskText" class="form-label">Описание</label>
                    <textarea class="form-control" id="editTaskText" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="editTaskTags" class="form-label">Теги</label>
                    <select class="form-select" id="editTaskTags" multiple>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" id="saveTaskBtn">Сохранить</button>
            </div>
        </div>
    </div>
</div>
