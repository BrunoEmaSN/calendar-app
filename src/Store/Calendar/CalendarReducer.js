import { types } from "../../Types";

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, actions ) => {
    switch ( actions.type ) {
        case types.EventAddNew:
            return {
                ...state,
                events: [ actions.payload, ...state.events ]
            };

        case types.EventSetActive:
            return {
                ...state,
                activeEvent: {
                    ...actions.payload
                }
            };
        
        case types.EventActiveCleaning:
            return {
                ...state,
                activeEvent: null
            };

        case types.EventUpdate:
            return {
                ...state,
                events: state.events.map( e => e.id === actions.payload.id ? actions.payload : e )
            };
        
        case types.EventRemove:
            return {
                ...state,
                events: state.events.filter( e => e.id !== state.activeEvent.id ),
                activeEvent: null
            };

        case types.EventLoaded:
            return {
                ...state,
                events: [ ...actions.payload ]
            };
    
        default:
            return state;
    }
}