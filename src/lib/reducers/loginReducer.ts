const initialState = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    token: null
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.payload,
                error: '',
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.payload,
                user: initialState,
            };
        case 'LOGOUT':
            return {
                ...state,
                error: '',
                user: initialState,
            };
        default:
            return state;
    }
};

export default loginReducer;