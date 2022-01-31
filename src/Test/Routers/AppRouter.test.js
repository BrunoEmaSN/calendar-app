import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouteer } from '../../Routers/AppRouter';

jest.mock('../../Store/Calendar/EventActions', () => ({
    eventStartLoading: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe('Pruebas en <AppRouter/>', () => {
    test('debe de mostrar LoadingScreen', () => {
        const initialState = {
            Auth:{
                checking: true
            },
            UI:{
                msgError: null
            }
        };
        let store = mockStore( initialState );

        const wrapper = mount(
            <Provider store={ store }>
                <AppRouteer />
            </Provider>
        )

        expect( wrapper ).toMatchSnapshot();
    });
    
    test('debe de mostrar Ruta publica', () => {
        const initialState = {
            Auth:{
                checking: false,
                uid: null
            },
            UI:{
                msgError: null
            }
        };
        let store = mockStore( initialState );
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouteer />
            </Provider>
        )

        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de mostrar Ruta privada', () => {
        const initialState = {
            Auth:{
                checking: false,
                uid: '123',
                name: 'jotaro'
            },
            UI:{
                msgError: null,
                modalOpen: false
            },
            Calendar:{
                events: []
            }
        };
        let store = mockStore( initialState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={ store }>
                <AppRouteer />
            </Provider>
        )

        expect( wrapper ).toMatchSnapshot();
    });
});
