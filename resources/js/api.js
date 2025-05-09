export default {
    async index(entity) {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/${entity}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return res.json();
    },

    async show(entity, id) {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/${entity}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return res.json();
    },

    async store(entity, taskData) {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/${entity}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return res.json();
    },

    async update(entity, id, taskData, position = false) {
        const path = position ? `/api/${entity}/${id}/position` : `/api/${entity}/${id}`;
        const token = localStorage.getItem('token');
        const res = await fetch(path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(taskData)
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return res.json();
    },

    async delete(entity, id) {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/${entity}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return res.json();
    }
};
