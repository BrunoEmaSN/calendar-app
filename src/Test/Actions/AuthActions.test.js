import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import { startChecking, startLogin, startRegister } from '../../Store/Auth/AuthActions';
import { types } from '../../Types';
import * as fechtModule from '../../Helpers/fecth';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );
Storage.prototype.setItem = jest.fn();

describe('pruebas en AuthActions', () => {
    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {
        await store.dispatch( startLogin('jonathan@jojo.com', 'jjba123') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.AuthLogin,
            payload: {
                uid: expect.any( String ),
                name: expect.any( String )
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', expect.any( String ) );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );
    });
    
    test('startLogin incorrecto', async () => {
        await store.dispatch( startLogin('jonathan@jojo.com', 'jjba12') );
        const actions = store.getActions();

        expect( actions ).toEqual( [] );
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrector', 'error');
    });
    
    test('startRegister correcto', async () => {
        fechtModule.fetchWithoutToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'jotaro',
                    token: 'jojobizarreadventure'
                }
            }
        }));
        await store.dispatch( startRegister( 'jotaro', 'jotaro@jojo.com', 'jjba123' ) );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.AuthLogin,
            payload: {
                uid: '123',
                name: 'jotaro',
            }
        })
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'jojobizarreadventure' );
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token-init-date', expect.any( Number ) );
    });
    
    test('startChecking correcto', async () => {
        fechtModule.fetchWithToken = jest.fn(() => ({
            json(){
                return {
                    ok: true,
                    uid: '123',
                    name: 'jotaro',
                    token: 'jojobizarreadventure'
                }
            }
        }));
        await store.dispatch( startChecking() );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.AuthLogin,
            payload: {
                uid: '123',
                name: 'jotaro',
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'jojobizarreadventure');
    });
    
});