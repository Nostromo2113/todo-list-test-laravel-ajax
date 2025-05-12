export function renderTask(task){
    const container = document.getElementById('tasksList');

    const taskCard = document.createElement('div');
    taskCard.classList.add('card', 'mb-3', 'task-card');
    taskCard.id = `task-${task.id}`;
    taskCard.dataset.id = task.id;
    taskCard.draggable = true;
    taskCard.style.cursor = 'pointer';

    // Body карточки
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Создаем строку с ID задачи и заголовком
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('d-flex', 'align-items-center', 'mb-2');
    const strong = document.createElement('strong');
    strong.classList.add('me-2');
    strong.textContent = `#${task.id}`;
    const title = document.createElement('h5');
    title.classList.add('card-title', 'mb-0');
    title.textContent = task.title;

    headerDiv.appendChild(strong);
    headerDiv.appendChild(title);
    cardBody.appendChild(headerDiv);

    // Описание
    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = task.text || 'No description';
    cardBody.appendChild(description);

    // Список тегов
    const tagsDiv = document.createElement('div');
    tagsDiv.classList.add('mb-2');
    task.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('badge', 'bg-primary', 'tag-badge');
        tagSpan.textContent = tag.title;
        tagsDiv.appendChild(tagSpan);
    });
    cardBody.appendChild(tagsDiv);

    // Кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-sm', 'btn-warning', 'editTaskBtn');
    editBtn.dataset.id = task.id;
    editBtn.textContent = 'Edit';

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'deleteTaskBtn', 'ms-2');
    deleteBtn.dataset.id = task.id;
    deleteBtn.textContent = 'Delete';

    // Добавляем кнопки
    cardBody.appendChild(editBtn);
    cardBody.appendChild(deleteBtn);

    // Добавляем body карточки в карточку
    taskCard.appendChild(cardBody);

    // Добавляем карточку в контейнер
    container.appendChild(taskCard);
}
