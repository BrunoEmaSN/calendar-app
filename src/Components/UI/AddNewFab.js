import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../Store/UI/UIActions';

export const AddNewFab = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch( openModal() );
    }
    return (
        <button className="btn. btn-primary fab" onClick={ handleClick }>
            <i className="fas fa-plus"></i>
        </button>
    )
}
