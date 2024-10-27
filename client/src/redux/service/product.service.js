import { getToken } from "./token.service"; 

export const getProductFromAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product`, {
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null; // Return null or handle error accordingly
    }
};

export const addProductToAPI = async (payload) => {
    const formData = new FormData();
    for (const key in payload) {
        formData.append(key, payload[key]);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product/store`, {
            method: 'POST',
            body: formData,
            headers: { 
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error adding product: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const deleteProductFromAPI = async (id) => { 
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting product: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const updateProductFromAPI = async (product) => {
    const formData = new FormData();
    for (const key in product) {
        formData.append(key, product[key]);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product/update/${product._id}`, {
            method: 'POST',
            body: formData,
            headers: { 
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error updating product: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};
