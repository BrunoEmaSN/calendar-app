import { types } from "../../Types";

export const eventAddNew = ( event ) => ({
    type: types.EventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    type: types.EventSetActive,
    payload: event
});

export const eventActiveCleaning = () => ({
    type: types.EventActiveCleaning,
});

export const eventUpdate = ( event ) => ({
    type: types.EventUpdate,
    payload: event
});

export const eventRemove = () => ({
    type: types.EventRemove
});