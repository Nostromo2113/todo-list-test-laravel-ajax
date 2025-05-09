import api from './api';

// ====================== ИНИЦИАЛИЗАЦИЯ ======================

document.addEventListener('DOMContentLoaded', loadTasks);

// ====================== ОБРАБОТЧИКИ СОБЫТИЙ ======================

document.addEventListener('click', function (e) {
    // Кнопка редактирования задачи
    if (e.target.classList.contains('editTaskBtn')) {
        const id = e.target.dataset.id;
        editTask(id);
    }

    // Кнопка удаления задачи
    if (e.target.classList.contains('deleteTaskBtn')) {
        const id = e.target.dataset.id;
        showDeleteModal(id);
    }

    // Кнопка сохранения изменений в задаче
    if (e.target.id === 'saveTaskBtn') {
        updateTask();
    }

    // Кнопка подтверждения удаления задачи
    if (e.target.id === 'deleteTaskBtn') {
        const id = document.getElementById('deleteId').value;
        deleteTask(id);
    }
});
// Отправка формы
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskId = document.getElementById('taskId').value;
    taskId ? updateTask() : createTask();
});

// ====================== ОСНОВНЫЕ ФУНКЦИИ ======================

async function loadTasks() {
    try {
        const tasks = await api.index('tasks');
        if (Array.isArray(tasks) && tasks.length > 0) {
            renderTasks(tasks);
        } else {
            document.getElementById('tasksList').innerHTML = '<div class="alert alert-info">No tasks found</div>';
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка загрузки задач');
    }
    loadTagsToSelect();
}

function renderTasks(tasks) {
    const container = document.getElementById('tasksList');

    container.innerHTML = tasks.map(task => `
        <div class="card mb-3 task-card"
             id="task-${task.id}"
             data-id="${task.id}"
             draggable="true"
             style="cursor: pointer"
             >
            <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                    <strong class="me-2">#${task.id}</strong>
                    <h5 class="card-title mb-0">${task.title}</h5>
                </div>
                <p class="card-text">${task.text || 'No description'}</p>
                <div class="mb-2">
                    ${task.tags.map(tag => `
                        <span class="badge bg-primary tag-badge">${tag.title}</span>
                    `).join('')}
                </div>
                <button class="btn btn-sm btn-warning editTaskBtn" data-id="${task.id}">Edit</button>
                <button class="btn btn-sm btn-danger deleteTaskBtn" data-id="${task.id}">Delete</button>
            </div>
        </div>
    `).join('');

    enableDragAndDrop();
}

// ====================== РАБОТА С ТЕГАМИ ======================

async function loadTagsToSelect() {
    try {
        const response = await api.index('tags');
        const tags = response.data ?? response;

        const tagsSelect = document.getElementById('tagSelector');
        tagsSelect.innerHTML = '';

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.title;
            tagsSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        alert('Ошибка загрузки тегов');
    }
}

// ====================== CRUD ОПЕРАЦИИ ======================

async function createTask() {
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;
    const tagSelect = document.getElementById('tagSelector');
    const selectedTags = Array.from(tagSelect.selectedOptions)
        .map(option => parseInt(option.value))
        .filter(id => !isNaN(id));

    const data = {
        title: title,
        text: text,
        tags: selectedTags
    };

    try {
        await api.store('tasks', data);
        loadTasks();
        resetForm();
    } catch (error) {
        console.error(error);
        alert('Ошибка создания задачи');
    }
}

async function updateTask() {
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value;
    const text = document.getElementById('editTaskText').value;

    const selectedTags = Array.from(document.getElementById('editTaskTags').selectedOptions)
        .map(option => parseInt(option.value))
        .filter(id => !isNaN(id));

    const data = {
        title: title,
        text: text,
        tags: selectedTags
    };

    try {
        await api.update('tasks', id, data);
        loadTasks();

        const modal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
        modal.hide();
    } catch (error) {
        console.error(error);
        alert('Ошибка обновления задачи');
    }
}

async function deleteTask(id) {
    try {
        await api.delete('tasks', id);
        loadTasks();
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteTaskModal'));
        modal.hide();
    } catch (error) {
        console.error(error);
        alert('Ошибка удаления задачи');
    }
}

// ====================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======================

async function editTask(id) {
    try {
        const task = await api.show('tasks', id);
        const allTags = await api.index('tags');

        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskText').value = task.text || '';

        const tagsSelect = document.getElementById('editTaskTags');
        tagsSelect.innerHTML = '';

        allTags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.title;

            const isAttached = task.tags.some(t => t.id === tag.id);
            option.selected = isAttached;

            tagsSelect.appendChild(option);
        });

        const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        modal.show();
    } catch (error) {
        console.error(error);
        alert('Не удалось загрузить данные задачи');
    }
}

function showDeleteModal(id) {
    document.getElementById('deleteId').value = id;

    const modalElement = document.getElementById('deleteTaskModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    modal.show();
}


function resetForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
}

// ====================== DRAG AND DROP ======================

function enableDragAndDrop() {
    const container = document.getElementById('tasksList');
    let draggedItem = null;

    container.addEventListener('dragstart', e => {
        if (e.target.classList.contains('task-card')) {
            draggedItem = e.target;
            e.target.classList.add('dragging');
        }
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = container.querySelector('.dragging');
        if (!dragging) return;
        const afterElement = getDragAfterElement(container, e.clientY);

        if (afterElement) {
            container.insertBefore(dragging, afterElement);
        } else {
            container.appendChild(dragging);
        }
    });

    container.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
            logNewPosition(draggedItem);
            draggedItem = null;
        }
    });
}

function getDragAfterElement(container, y) {
    const cards = [...container.querySelectorAll('.task-card:not(.dragging)')];

    return cards.find(card => {
        const rect = card.getBoundingClientRect();
        return y < rect.top + rect.height / 2;
    });
}

const logNewPosition = (() => {
    let isRunning = false;
    let timeoutId = null;
    const delay = 200;

    return function(draggedItem) {
        if (isRunning) return;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            if (isRunning) return;
            isRunning = true;

            const cards = document.querySelectorAll('.task-card');
            const newPosition = Array.from(cards).findIndex(card => card === draggedItem);
            const taskId = draggedItem.dataset.id;

            try {
                await api.update('tasks', taskId, { position: newPosition }, true);
                loadTasks();
            } catch (error) {
                console.error(error);
                alert('Не удалось обновить позицию');
                window.location.reload();
            } finally {
                isRunning = false;
            }
        }, delay);
    };
})();
