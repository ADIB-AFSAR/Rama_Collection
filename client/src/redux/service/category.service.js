import { getToken } from "./token.service"; 

export const getCategoryFromAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/category/`, {
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const data = await response.json();
        return data || []; // Return an empty array if no data is found
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
};

export const addCategoryToAPI = async (payload) => {
    try {
        const formData = new FormData();
        for (const key in payload) {
            formData.append(key, payload[key]);
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/category/store`, {
            body: formData,
            method: 'POST',
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error adding category: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const deleteCategoryFromAPI = async (payload) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/category/delete/${payload}`, {
            method: 'DELETE',
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting category: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const updateCategoryFromAPI = async (category) => {
    try {
        const formData = new FormData();
        for (const key in category) {
            formData.append(key, category[key]);
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/category/update/${category._id}`, {
            body: formData,
            method: 'POST',
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error updating category: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
