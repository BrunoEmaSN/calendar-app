import { types } from "../../Types";

const initialState = {
    modalOpen: false,
    msgError: null
}

export const UIReducer = ( state = initialState, actions ) => {
    switch ( actions.type ) {
        case types.UIOpenModal:
            return {
                ...state,
                modalOpen: true
            };

        case types.UICloseModal:
            return {
                ...state,
                modalOpen: false
            };
        
        case types.uiSetError:
            return {
                ...state,
                msgError: actions.payload
            };
            
        case types.uiRmError:
            return {
                ...state,
                msgError: null
            };
    
        default:
            return state;
    }
}