import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartRemove } from '../../Store/Calendar/EventActions';

export const DeleteEventFab = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch( eventStartRemove() );
    }
    return (
        <button className="btn. btn-danger fab-danger" onClick={ handleClick }>
            <i className="fas fa-trash"></i>
            <span> Borrar Evento </span>
        </button>
    )
}