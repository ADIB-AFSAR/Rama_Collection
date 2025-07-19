import { defaultValue } from "../reducer/cart.reducer";
import { getToken } from "./token.service";

export const getCartFromAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken(),
            },
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching cart: ${response.statusText}`);
        }

        const data = await response.json();

        return data.currentCart || defaultValue;
    } catch (error) {
        console.error(error);
        return defaultValue; // Return default value in case of error
    }
};

export const addCartToAPI = async (product) => {
   console.warn(product)
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/add/${product._id}`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken(),
      },
    });

    if (!response.ok) {
      throw new Error(`Error adding product: ${response.statusText}`);
    }

    const data = await response.json();
     return data;
  } catch (error) {
    console.error(error);
  }
};


export const updateCartToApi = async (product) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/update/${product.itemId}`, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken(),
            },
        });

        if (!response.ok) {
            throw new Error(`Error updating product: ${response.statusText}`);
        }

        const data = await response.json();
         return data; // Return data for further use if needed
    } catch (error) {
        console.error(error);
    }
};

export const deleteCartItemFromAPI = async (payload) => {
     try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/delete/${payload}`, {
            method: 'DELETE',
            headers: {
                'Authorization': getToken(),
            },
        });

        if (!response.ok) {
            throw new Error(`Error deleting item: ${response.statusText}`);
        }

        const data = await response.json();
         return data; // Return data for further use if needed
    } catch (error) {
        console.error(error);
    }
};
