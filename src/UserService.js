const BASE_URL = 'http://localhost:8080/api/users';


const userService = {

    getUsers: async () => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    },

    addUser: async (userData) => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }
    }
};

export default userService;