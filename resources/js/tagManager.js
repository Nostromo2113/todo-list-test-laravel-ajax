import api from './api';
import {renderTag} from "./renderTag.js";

// ====================== ИНИЦИАЛИЗАЦИЯ ======================

document.addEventListener('DOMContentLoaded', loadTags);

// ====================== ОБРАБОТЧИКИ СОБЫТИЙ ======================

document.addEventListener('click', function (e) {
    // Кнопка редактирования тега
    if (e.target.classList.contains('editTagBtn')) {
        const id = e.target.dataset.id;
        editTag(id);
    }

    // Кнопка удаления тега
    if (e.target.classList.contains('deleteTagBtn')) {
        const id = e.target.dataset.id;
        deleteTag(id);
    }

    // Кнопка сохранения изменений в теге
    if (e.target.id === 'saveTagBtn') {
        update();
    }
});
// Отправка формы
document.getElementById('tagForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const tagId = document.getElementById('tagId').value;
    tagId ? update('tags', tagId) : create('tags');
});

// ====================== ОСНОВНЫЕ ФУНКЦИИ ======================

/**
 * Загружает и отображает список тегов
 */
async function loadTags() {
    try {
        const tags = await api.index('tags');

        if (Array.isArray(tags) && tags.length > 0) {
            renderTags(tags);
        } else {
            document.getElementById('tagsList').innerHTML = '<div class="alert alert-info">No tags found</div>';
        }
    } catch (error) {
        console.error(error)
        alert('Ошибка загрузки тегов');
    }
}

/**
 * Рендерит список тегов в контейнер
 * @param {Array} tags - Массив тегов
 */
function renderTags(tags) {
    const container = document.getElementById('tagsList');

    container.innerHTML = '';

    tags.forEach(tag => {
      const tagCard = renderTag(tag);
      container.appendChild(tagCard);
    });
}

// ====================== CRUD ОПЕРАЦИИ ======================

/**
 * Создает новый тег
 * @param {string} type - Тип сущности ('tags')
 */
async function create() {
    const name = document.getElementById('tagName').value;
    const data = {
        title: name
    };

    try {
        await api.store('tags', data);
        loadTags();
        resetForm();
    } catch (error) {
        console.error(error);
        alert('Ошибка создания тега');
    }
}

/**
 * Обновляет существующий тег
 * @param {string} type - Тип сущности ('tags')
 * @param {number} id - ID тега
 */
async function update() {
    const id = document.getElementById('editTagId').value;
    const name = document.getElementById('editTagName').value;

    const data = {
        title: name
    };

    try {
        await api.update('tags', id, data);
        loadTags();

        const modal = bootstrap.Modal.getInstance(document.getElementById('editTagModal'));
        modal.hide();
    } catch (error) {
        console.error(error);
        alert('Ошибка обновления тега');
    }
}

/**
 * Удаляет тег
 * @param {number} id - ID тега
 */
async function deleteTag(id) {
    try {
        await api.delete('tags', id);
        loadTags();
    } catch (error) {
        console.error(error);
        alert('Ошибка удаления тега');
    }
}

/**
 * Открывает форму редактирования тега
 * @param {number} id - ID тега
 */
async function editTag(id) {
    try {
        const tag = await api.show('tags', id);

        document.getElementById('editTagId').value = tag.id;
        document.getElementById('editTagName').value = tag.title;

        const modal = new bootstrap.Modal(document.getElementById('editTagModal'));
        modal.show();
    } catch (error) {
        console.error(error);
        alert('Не удалось загрузить тег');
    }
}

// ====================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======================


/**
 * Сбрасывает форму тега
 */
function resetForm() {
    document.getElementById('tagForm').reset();
    document.getElementById('tagId').value = '';
}
