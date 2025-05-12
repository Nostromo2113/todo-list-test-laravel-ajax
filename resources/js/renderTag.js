export function renderTag(tag) {
    // Контейнер карточки
    const card = document.createElement('div');
    card.className = 'card mb-3 tag-card';
    card.id = `tag-${tag.id}`;

    // Тело карточки
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex justify-content-between align-items-center';

    // Название тега
    const leftDiv = document.createElement('div');
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.style.backgroundColor = '#6c757d'; // Серый цвет
    badge.textContent = tag.title;

    // Кнопки
    const rightDiv = document.createElement('div');

    // Кнопка редактирования
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-warning editTagBtn';
    editBtn.dataset.id = tag.id; // ID тега в data-атрибуте
    editBtn.textContent = 'Edit';

    // Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger deleteTagBtn ms-2';
    deleteBtn.dataset.id = tag.id; // ID тега в data-атрибуте
    deleteBtn.textContent = 'Delete';

    // Добавляем все в карточку
    leftDiv.appendChild(badge);
    rightDiv.append(editBtn, deleteBtn);
    cardBody.append(leftDiv, rightDiv);
    card.appendChild(cardBody);

    return card;
}
