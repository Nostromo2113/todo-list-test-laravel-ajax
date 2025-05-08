<div class="modal fade" id="editTagModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Редактирование задачи</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="editTagId">

                <div class="mb-3">
                    <label for="editTagName" class="form-label">Заголовок</label>
                    <input type="text" class="form-control" id="editTagName">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" id="saveTagBtn">Сохранить</button>
            </div>
        </div>
    </div>
</div>
