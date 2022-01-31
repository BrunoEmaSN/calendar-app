import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../Components/Auth/LoginScreen';
import { startLogin, startRegister } from '../../../Store/Auth/AuthActions';
import { rmError, setError } from '../../../Store/UI/UIActions';

jest.mock('../../../Store/Auth/AuthActions', () => ({
    startRegister: jest.fn(),
    startLogin: jest.fn()
}));

jest.mock('../../../Store/UI/UIActions', () => ({
    setError: jest.fn(),
    rmError: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
    UI: {
        msg: null
    }
};
let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen />
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should first', () => {
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('debe de llamar el dispatch del login', () => {
        wrapper.find('form').at(0).simulate('submit', { preventDefault(){} });
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target:{
                name: 'lEmail',
                value: 'jonathan@jojo.com'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target:{
                name: 'rPassword',
                value: 'jjba123'
            }
        });
        expect( setError ).not.toHaveBeenCalled();
        expect( rmError ).toHaveBeenCalled();
        expect( startLogin ).toHaveBeenCalledWith('jonathan@jojo.com', 'jjba123');
    });

    test('No hay registro si las contraseña son difernetes', () => {
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target:{
                name: 'rPassword',
                value: 'jojoba1'
            }
        });

        wrapper.find('input[name="rPasswordConfirm"]').simulate('change', {
            target: {
                name: 'rPasswordConfirm',
                value: 'jojoba2'
            }
        });

        wrapper.find('form').at(1).simulate('submit', { preventDefault(){} });

        expect( setError ).toHaveBeenCalledWith('Password and Confirm Password should be equals');
        expect( rmError ).not.toHaveBeenCalled();
        expect( startRegister ).not.toHaveBeenCalled();
    });

    test('Registro con contraseñas iguales', () => {
        wrapper.find('input[name="rName"]').simulate('change', {
            target:{
                name: 'rName',
                value: 'jonathan'
            }
        });
        
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target:{
                name: 'rEmail',
                value: 'jonathan@jojo.com'
            }
        });

        wrapper.find('input[name="rPassword"]').simulate('change', {
            target:{
                name: 'rPassword',
                value: 'jjba123'
            }
        });
        
        wrapper.find('input[name="rPasswordConfirm"]').simulate('change', {
            target: {
                name: 'rPasswordConfirm',
                value: 'jjba123'
            }
        });

        wrapper.find('form').at(1).simulate('submit', { preventDefault(){} });
        expect( setError ).not.toHaveBeenCalled();
        expect( rmError ).toHaveBeenCalled();
        expect( startRegister ).toHaveBeenCalledWith('jonathan@jojo.com', 'jjba123', 'jonathan');
    });
    
})