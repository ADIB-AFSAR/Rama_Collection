import { secureSet } from "../../utils/secure_localStorage";
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
        const data = await response.json();
            // if (!response.ok) {
            // throw new Error(data.message || 'Registration failed');
            // }
          return {data,response}
    } catch (error) {
        console.error(error);
    }
};

export const loginUserToAPI = async (payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ safe parsing (works for JSON + text + HTML)
    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { message: text }; // fallback for non-JSON errors
    }

    if (!response.ok) {
      if (response.status === 504) {
        throw new Error("Server is waking up. Please try again in 5 seconds.");
      }
      throw new Error(data?.message || `Login failed (${response.status})`);
    }

    if (data.token) {
      localStorage.setItem("jwt_token", data.token);
      secureSet("currentUser", data.user);
    }

    return data;
  } catch (error) {
    console.error("Login error in service:", error);
    throw error;
  }
};



export const loginGoogleAPI = async (token) => {
    fetch('/api/auth/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  }).then(res => res.json());
}
