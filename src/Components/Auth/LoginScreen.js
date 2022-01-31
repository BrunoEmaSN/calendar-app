import React from 'react';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../Hooks/useForm';
import { rmError, setError } from '../../Store/UI/UIActions';
import { startLogin, startRegister } from '../../Store/Auth/AuthActions';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.UI );

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });
    
    const { lEmail, lPassword } = formLoginValues;

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPasswordConfirm: ''
    });

    const { rName, rEmail, rPassword, rPasswordConfirm } = formRegisterValues;

    const isFormLoginValid = () => {
        if( !validator.isEmail( lEmail ) ) {
            dispatch( setError( 'Correo invalido' ) );
            return false;
        }
        
        if( lPassword.length < 6 ){
            dispatch( setError( 'La contraseña debe de contener minimo 6 caracteres' ) );
            return false;
        }

        dispatch( rmError() );
        return true;
    }

    const isFormRegisterValid = () => {
        if( rName.length < 3 ){
            dispatch( setError( 'El nombre debe de contener minimo 3 caracteres' ) );
        }
        if( !validator.isEmail( rEmail ) ) {
            dispatch( setError( 'Correo invalido' ) );
            return false;
        }
        
        if( rPassword.length < 6 ){
            dispatch( setError( 'La contraseña debe de contener minimo 6 caracteres' ) );
            return false;
        }

        if( !validator.equals(rPassword, rPasswordConfirm) ){
            dispatch( setError( 'Las contraseñas deben de ser iguales' ) );
            return false;
        }

        dispatch( rmError() );
        return true;
    }

    const handleLogin = ( e ) => {
        e.preventDefault();
        if( isFormLoginValid() ){
            dispatch( startLogin( lEmail, lPassword ) );
        }
        else {
            Swal.fire('Error', msgError, 'error');
        }
    }

    const handleRegister = ( e ) => {
        e.preventDefault();
        if( isFormRegisterValid() ){
            dispatch( startRegister( rEmail, rPassword, rName ) )
        }
        else {
            Swal.fire('Error', msgError, 'error');
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword"
                                value={ rPassword }
                                onChange={ handleRegisterInputChange }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPasswordConfirm"
                                value={ rPasswordConfirm }
                                onChange={ handleRegisterInputChange }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}