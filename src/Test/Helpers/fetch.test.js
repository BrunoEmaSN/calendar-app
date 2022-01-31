import { fetchWithoutToken, fetchWithToken } from "../../Helpers/fecth";

let token = '';

describe('Pruebas en fetch', () => {

    test('debe de funcionar fetch sin token', async () => {
        const resp = await fetchWithoutToken('auth/login', { email: 'jonathan@jojo.com', password: 'jjba123' }, 'POST');
        expect( resp instanceof Response ).toBe( true );
        
        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;
    });

    test('debe de funcionar fetch con token', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchWithToken( 'event/', 'GET' );
        const body = await resp.json();
        expect( body.ok ).toBe( true );
        expect( Array.isArray(body.eventos) ).toBe( true );
    });
})