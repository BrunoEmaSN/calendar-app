import { types } from "../../Types";

export const openModal = () => ({ type: types.UIOpenModal });

export const closeModal = () => ({ type: types.UICloseModal });

export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});

export const rmError = () => ({
    type: types.uiRmError,
    payload: null
});