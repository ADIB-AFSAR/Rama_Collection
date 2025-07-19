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

        const data = await response.json();
         return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch product data"); // Force catch block in saga
    }
};

export const addProductToAPI = async (payload) => {
  const formData = new FormData();

  for (const key in payload) {
    if (key === 'sizes' && Array.isArray(payload[key])) {
      payload[key].forEach(size => {
        formData.append('sizes', size); // ✅ Append each size
      });
    } else if (key === 'images' && Array.isArray(payload[key])) {
      payload[key].forEach(file => {
        if (file instanceof File) {
          formData.append('images', file); // ✅ Append each image
        }
      });
    } else {
      formData.append(key, payload[key]); // ✅ Normal fields
    }
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product/store`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': getToken() // ⚠️ Don't set 'Content-Type' manually
      }
    });

    if (!response.ok) {
      throw new Error(`Error adding product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Add product failed:', error);
    throw error;
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

export const updateProductFromAPI = async (payload) => {
  const formData = new FormData();
 
  for (const key in payload) {
    if (key === 'sizes' && Array.isArray(payload[key])) {
      payload[key].forEach(size => {
        formData.append('sizes', size); // ✅ Add each size individually
      });
    } else if (key === 'images' && Array.isArray(payload[key])) {
      payload[key].forEach(file => {
        if (file instanceof File) {
          formData.append('images', file); // ✅ Add each file individually
        }
      });
    } else {
      formData.append(key, payload[key]);
    }
  }

  

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/product/update/${payload._id}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': getToken()
        // ⚠️ Do not manually set 'Content-Type'
      }
    });

    if (!response.ok) {
      throw new Error(`Error updating product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


