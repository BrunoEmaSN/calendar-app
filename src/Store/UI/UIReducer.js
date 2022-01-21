import { types } from "../../Types";

const initialState = {
    modalOpen: false
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
    
        default:
            return state;
    }
}