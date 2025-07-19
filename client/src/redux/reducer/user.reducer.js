import { secureGet, secureRemove, secureSet } from "../../utils/secure_localStorage";
import { 
    GET_USER_ERROR, 
    GET_USER_START, 
    GET_USER_SUCCESS, 
    LOGIN_USER_ERROR, 
    LOGIN_USER_START, 
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER_START, 
    LOGOUT_USER_SUCCESS, 
    REGISTER_USER_ERROR, 
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS
} from "../constant/user.constant";

// Initial state with user data from localStorage
const initialState = {
  users: secureGet('users')
    ? secureGet('users')
    : [],

  currentUser: secureGet('currentUser') && secureGet('currentUser') !== 'undefined'
    ? secureGet('currentUser')
    : {
        name: '',
        email: '',
        contact: '',
      },

  loading: false
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
            secureSet('users', action.payload);
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

            case LOGIN_USER_START:
                return {
                    ...state,
                    loading : true
                };
        
        case LOGIN_USER_SUCCESS:
             secureSet('currentUser',action.payload)
            return {
                ...state,
                currentUser: { ...action.payload },
                loading : false
            };
            case LOGIN_USER_ERROR:
                return {
                    ...state,
                    loading : false
                }

        case LOGOUT_USER_START:
                return {
                    ...state,
                    loading : true
                };

        case LOGOUT_USER_SUCCESS:
            secureRemove('currentUser');
            secureRemove('jwt_token');
            return {
                ...state,
                currentUser: {
                    name: '',
                    email: '',
                    contact: '', 
                },
                loading : false
            };
        case REGISTER_USER_START:
                return {
                    ...state,
                    loading : true
                };
        case REGISTER_USER_SUCCESS:
                return {
                    ...state,
                    loading : false,
                    user: action.payload
                };
        case REGISTER_USER_ERROR:
                return {
                    ...state,
                    loading : false,
                };

        default:
            return state;
    }
};
