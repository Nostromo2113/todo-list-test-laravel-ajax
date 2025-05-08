export default {
    index(entity) {
        const token = localStorage.getItem('token');
        return fetch(`/api/${entity}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json());
    },

    show(entity, id) {
        const token = localStorage.getItem('token');
        return fetch(`/api/${entity}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json());
    },

    store(entity, taskData) {
        const token = localStorage.getItem('token');
        return fetch(`/api/${entity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        }).then(res => res.json());
    },

    update(entity, id, taskData, position = false) {
        const path = position ? `api/${entity}/${id}/position` : `api/${entity}/${id}`;
        const token = localStorage.getItem('token');
        return fetch(path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(taskData)
        }).then(res => res.json());
    },

    delete(entity, id) {
        const token = localStorage.getItem('token');
        return fetch(`/api/${entity}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json());
    }
}
