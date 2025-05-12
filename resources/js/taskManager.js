import api from './api';
import {renderTask} from "./renderTask.js";
import { enableDragAndDrop } from './dragAndDrop';

// ====================== ИНИЦИАЛИЗАЦИЯ ======================

document.addEventListener('DOMContentLoaded', loadTasks);

// ====================== ОБРАБОТЧИКИ СОБЫТИЙ ======================

document.addEventListener('click', function(e) {
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
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskId = document.getElementById('taskId').value;
    taskId ? updateTask() : createTask();
});


// ====================== ОСНОВНЫЕ ФУНКЦИИ ======================

/**
 * Загружает и отображает список задач
 */
async function loadTasks() {
    try {
        const tasks = await api.index('tasks');
        if (tasks.length > 0) {
            renderTasks(tasks);
        } else {
            document.getElementById('tasksList').innerHTML = '<div class="alert alert-info">No tasks found</div>';
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка загрузки задач');
    }
    addTagsToSelect();
}

/**
 * Рендерит список задач в контейнер
 * @param {Array} tasks - Массив задач
 */
function renderTasks(tasks) {
    let dragAndDropInitialized = false;
    const container = document.getElementById('tasksList');
    container.innerHTML = '';
    tasks.forEach((task) => {
        renderTask(task);
    })

    if (!dragAndDropInitialized) {
        enableDragAndDrop();
        dragAndDropInitialized = true;
    }
}

// ====================== РАБОТА С ТЕГАМИ ======================

/**
 * Загружает список тегов с сервера
 * @return {Promise<Array>} Массив тегов
 */
async function loadTags() {
    try {
        const response = await api.index('tags');
        const tags = response.data ?? response;
        return tags;
    } catch(e){
        console.error(e)
    }
}

/**
 * Добавляет теги в select-элемент
 */
async function addTagsToSelect() {
        const tags= await loadTags();
        const tagsSelect = document.getElementById('tagSelector');
        tagsSelect.innerHTML = '';

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.title;
            tagsSelect.appendChild(option);
        });
}

// ====================== CRUD ОПЕРАЦИИ ======================

/**
 * Создает новую задачу
 */
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

/**
 * Обновляет существующую задачу
 */
async function updateTask() {
    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value;
    const text = document.getElementById('editTaskText').value;

    const selectedTags = Array.from(document.getElementById('editTaskTags').selectedOptions)
        .map(option => parseInt(option.value));

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

/**
 * Удаляет задачу
 * @param {number} id - ID задачи
 */
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

/**
 * Открывает форму редактирования задачи
 * @param {number} id - ID задачи
 */
async function editTask(id) {
    try {
        const task = await api.show('tasks', id);
        const tags = loadTags();

        document.getElementById('editTaskId').value = task.id;
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskText').value = task.text || '';

        const tagsContainer = document.getElementById('editTaskTags');
        tagsContainer.innerHTML = '';

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.title;

            const isAttached = task.tags.some(t => t.id === tag.id);
            option.selected = isAttached;

            tagsContainer.appendChild(option);
        });

        const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        modal.show();
    } catch (error) {
        console.error(error);
        alert('Не удалось загрузить данные задачи');
    }
}

/**
 * Показывает модальное окно подтверждения удаления
 * @param {number} id - ID задачи
 */
function showDeleteModal(id) {
    document.getElementById('deleteId').value = id;

    const modalElement = document.getElementById('deleteTaskModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

    modal.show();
}

/**
 * Сбрасывает форму задачи
 */
function resetForm() {
    document.getElementById('taskForm').reset();
    document.getElementById('taskId').value = '';
}
