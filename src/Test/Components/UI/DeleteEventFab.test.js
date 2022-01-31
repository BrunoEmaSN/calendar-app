import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../Components/UI/DeleteEventFab';
import { eventStartRemove } from '../../../Store/Calendar/EventActions';

jest.mock('../../../Store/Calendar/EventActions', () => ({
    eventStartRemove: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {};
let store = mockStore( initialState );
store.dispatch = jest.fn();
const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
)

describe('Pruebas en <DeleteEventFab/>', () => {
    test('debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('debe de llamar el eventStartRemove al hacer click', () => {
        wrapper.find('button').simulate('click');
        expect( eventStartRemove ).toHaveBeenCalled();
    });
});
