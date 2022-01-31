import { closeModal, openModal } from "../../Store/UI/UIActions";
import { UIReducer } from "../../Store/UI/UIReducer";

const initState = {
    modalOpen: false,
    msgError:null
}

describe('Pruebas en UIReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const state = UIReducer( initState, {} );
        expect( state ).toEqual( initState );
    });
    
    test('debe de abrir y cerrar el modal', () => {
        const modalOpen = openModal();
        const stateOpen = UIReducer( initState, modalOpen );

        expect( stateOpen ).toEqual({ modalOpen: true, msgError: null });

        const modalClose = closeModal();
        const stateClose = UIReducer( initState, modalClose );

        expect( stateClose ).toEqual({ modalOpen: false, msgError: null })
    });
    
});