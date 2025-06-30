import { getToken } from "./token.service";

export const getUserFromAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/`, {
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null; // Return null or handle error accordingly
    }
};

export const addUserToAPI = async (payload) => {
    const formData = new FormData();
    for (const key in payload) {
        formData.append(key, payload[key]);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/store`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error adding user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const deleteUserFromAPI = async (payload) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/delete/${payload._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const updateUserFromAPI = async (user) => { 
    const formData = new FormData();
    for (const key in user) {
        formData.append(key, user[key]);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/user/update/${user._id}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const registerUserToAPI = async (payload) => { 
    console.log(process.env.REACT_APP_API_URL);
    console.log("service",payload)
    const formData = new FormData();
    for (const key in payload) {
        formData.append(key, payload[key]);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {    
                'Content-Type': 'application/json',
                'Authorization': getToken()
            }
        });

        if (!response.ok) {
            throw new Error(`Error registering user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

export const loginUserToAPI = async (payload) => {
  console.log("service:", payload, "BASE URL", `${process.env.REACT_APP_API_URL}/api/login`);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json(); // parse even on error to get the message

    if (!response.ok) {
      // Throw structured error so saga can read .message
      throw new Error(data.message || `Error logging in: ${response.statusText}`);
    }

    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Login error in service:", error);
    throw error; // ✅ re-throw so saga can catch it
  }
};

