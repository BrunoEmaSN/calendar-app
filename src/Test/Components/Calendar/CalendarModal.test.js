import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import { CalendarModal } from '../../../Components/Calendar/CalendarModal';
import { eventActiveCleaning, eventStartUpdate, startEventAddNew } from '../../../Store/Calendar/EventActions';

jest.mock('../../../Store/Calendar/EventActions', () => ({
    eventStartUpdate: jest.fn(),
    eventActiveCleaning: jest.fn(),
    startEventAddNew: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minute(0).second(0).add(1, 'hours');
const oneHourLater = now.clone().add(1, 'hours');

const initialState = {
    Calendar: {
        events:  [],
        activeEvent: {
            title: 'Steel Ball Run',
            notes: 'Tusk',
            start: now.toDate(),
            end: oneHourLater.toDate()
        }
    },
    Auth: {
        uid: '123',
        name: 'Johnny'
    },
    UI: {
        modalOpen: true
    }
};
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    test('debe de mostrar el modal', () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe( true );
    });
    
    test('debe de llamar la accion de actualizar y cerrar el modal', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initialState.Calendar.activeEvent );
        expect( eventActiveCleaning ).toHaveBeenCalled();
    });

    test('debe de mostrar error si falta el titulo', () => {
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe( true );
    });
    
    test('debe de crear un nuevo evento', () => {
        const initialState = {
            Calendar: {
                events:  [],
                activeEvent: null
            },
            Auth: {
                uid: '123',
                name: 'Johnny'
            },
            UI: {
                modalOpen: true
            }
        };
        let store = mockStore( initialState );
        store.dispatch = jest.fn();
        
        const wrapper = mount(
        <Provider store={ store }>
            <CalendarModal />
        </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Steel Ball Run'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( startEventAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Steel Ball Run',
            notes: ''
        });
        expect( eventActiveCleaning ).toHaveBeenCalled();
    });

    test('debe de validar las fechas', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Steel Ball Run'
            }
        });

        const hoy = moment().toDate();
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "La fecha Fin debe de ser mayor a la fecha de inicio", "error");
    });
})