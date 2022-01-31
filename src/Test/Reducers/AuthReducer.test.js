import { authReducer } from "../../Store/Auth/AuthReducer";
import { types } from "../../Types";

const initialState = {
    checking: true
}

describe('pruebas en AuthReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer( initialState, {} );
        expect( state ).toEqual( initialState );
    });

    test('debe de autenticar el login', () => {
        const action = {
            type: types.AuthLogin,
            payload: {
                uid: '123',
                name: 'jotaro'
            }
        }

        const state = authReducer( initialState, action );
        expect( state ).toEqual({ checking: false, uid: '123', name: 'jotaro' });
    });
    
    
});