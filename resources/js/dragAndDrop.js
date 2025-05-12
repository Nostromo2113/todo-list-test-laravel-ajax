import api from "./api";


/**
 * Активация drag-and-drop
 */
export function enableDragAndDrop() {
    const container = document.getElementById('tasksList');
    let draggedItem = null;

    container.addEventListener('dragstart', e => {
        if (e.target.classList.contains('task-card')) {
            draggedItem = e.target;
            e.target.classList.add('dragging', 'border', 'border-primary', 'shadow-lg', 'bg-light');
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
            draggedItem.classList.remove('dragging', 'border', 'border-primary', 'shadow-lg', 'bg-light');
            logNewPosition(draggedItem);
            draggedItem = null;
        }
    });
}

/**
 * Находит элемент, после которого нужно вставить перетаскиваемый таск
 * @param container - родительский контейнер
 * @param y - Y-координата курсора
 * @return элемент, перед которым нужно вставить
 */

function getDragAfterElement(container, y) {
    const cards = [...container.querySelectorAll('.task-card:not(.dragging)')];

    return cards.find(card => {
        const rect = card.getBoundingClientRect();
        return y < rect.top + rect.height / 2;
    });
}

/**
 * Отправляет новую позицию элемента на сервер
 */

const logNewPosition = (() => {
    let isRunning = false;

    return async function(draggedItem) {
        if (isRunning) return;
        isRunning = true;

        const cards = document.querySelectorAll('.task-card');
        const newPosition = Array.from(cards).findIndex(card => card === draggedItem);
        const taskId = draggedItem.dataset.id;

        try {
            setProcessingState(true);
            await api.update('tasks', taskId, { position: newPosition }, true);
            setProcessingState(false);
        } catch (error) {
            console.error(error);
            alert('Не удалось обновить позицию');
        } finally {
            isRunning = false;
        }
    };
})();


/**
 * Устанавливает состояние "в обработке" для всех карточек
 */
function setProcessingState(isProcessing) {
    const container = document.getElementById('tasksList');
    const cards = container.querySelectorAll('.task-card');

    cards.forEach(card => {
        if (isProcessing) {
            card.classList.add('opacity-75', 'pe-none');
            card.classList.remove('opacity-100');

            card.setAttribute('draggable', 'false');
            card.style.cursor = 'default';
        } else {
            card.classList.remove('opacity-75', 'pe-none');
            card.classList.add('opacity-100');

            card.setAttribute('draggable', 'true');
            card.style.cursor = 'pointer';
        }
    });
}
