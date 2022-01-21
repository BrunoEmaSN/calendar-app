import moment from "moment";
import { types } from "../../Types";

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños de Jonathan',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgcolor: '#E2FFA5',
        notes: 'notas',
        user:{
            _id: '123',
            name: 'Jorge'
        }
    }],
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
    
        default:
            return state;
    }
}