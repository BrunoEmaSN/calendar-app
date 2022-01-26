import { types } from "../../Types";

const initialState = {
    checking: true
}

export const authReducer = ( state = initialState, actions ) => {
    switch (actions.type) {
        case types.AuthLogin:
            return {
                ...state,
                checking: false,
                ...actions.payload
            };

        case types.AuthCheckingFinish:
            return {
                ...state,
                checking: false
            }
        
        case types.AuthLoguot:
            return {
                checking: false
            };

        default:
            return state;
    }
}