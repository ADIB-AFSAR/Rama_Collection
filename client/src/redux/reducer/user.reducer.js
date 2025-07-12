import { 
    GET_USER_ERROR, 
    GET_USER_START, 
    GET_USER_SUCCESS, 
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER_SUCCESS, 
    REGISTER_USER_ERROR 
} from "../constant/user.constant";

// Initial state with user data from localStorage
const initialState = {
    users: localStorage.getItem('users') 
        ? JSON.parse(localStorage.getItem('users')) 
        : [],

    currentUser: localStorage.getItem('currentUser') && localStorage.getItem('currentUser') !== 'undefined'  
        ? JSON.parse(localStorage.getItem('currentUser')) 
        : {
            name: '',
            email: '',
            contact: '', 
        },
        loading : false
};

// User reducer to manage user-related state
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_START:
            return {
                ...state,
                loading : true
            }
        case GET_USER_SUCCESS:
            localStorage.setItem('users', JSON.stringify(action.payload));
            return {
                ...state,
                users: [...action.payload],
                loading :false
            };

        case GET_USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading :false
            };
        
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return {
                ...state,
                currentUser: { ...action.payload }
            };

        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('currentUser');
            localStorage.removeItem('jwt_token');
            return {
                ...state,
                currentUser: {
                    name: '',
                    email: '',
                    contact: '', 
                },
            };

        default:
            return state;
    }
};
