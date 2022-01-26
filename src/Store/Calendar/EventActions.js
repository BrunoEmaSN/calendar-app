import Swal from "sweetalert2";
import { fetchWithToken } from "../../Helpers/fecth";
import { prepareEvents } from "../../Helpers/prepareEvents";
import { types } from "../../Types";

export const startEventAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        const { uid, name } = getState().Auth;
        const resp = await fetchWithToken( 'event/', event, 'POST' );
        const body = await resp.json();

        if( body.ok ){
            event.id = body.evento.id;
            event.user = {
                _id: uid,
                name: name
            }
            dispatch( eventAddNew( event ) );
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const eventAddNew = ( event ) => ({
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

export const eventStartUpdate = ( event ) => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( `event/id/${ event.id }`, event, 'PUT' );
        const body = await resp.json();
        if( body.ok ){
            dispatch( eventUpdate( event ) );
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const eventUpdate = ( event ) => ({
    type: types.EventUpdate,
    payload: event
});

export const eventStartRemove = () => {
    return async ( dispatch, getState ) => {
        const { id } = getState().Calendar.activeEvent;
        const resp = await fetchWithToken( `event/id/${ id }`, {}, 'DELETE' );
        const body = await resp.json();
        if( body.ok ){
            dispatch( eventRemove() );
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const eventRemove = () => ({
    type: types.EventRemove
});

export const eventStartLoading = () => {
    return async ( dispatch ) => {
        const resp = await fetchWithToken( 'event/', 'GET' );
        const body = await resp.json();
        if( body.ok ){
            const events = prepareEvents( body.eventos );
            dispatch( eventLoaded( events ) );
        }
        else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const eventLoaded = ( events ) => ({
    type: types.EventLoaded,
    payload: events
});