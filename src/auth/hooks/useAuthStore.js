import {useDispatch, useSelector} from 'react-redux';
import reminderApi from './../../api/axiosApi.js'
import {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout,
    TYPE_CHECKING,
    TYPE_AUTHENTICATED,
    TYPE_NOT_AUTHENTICATED
} from './../../store';

export const useAuthStore = () => {

    const {
        status,
        user,
        errorMessage,
    } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {
        dispatch(onChecking());
        try {
            const {data} = await reminderApi.post('/api/login', {email, password});
            const {user} = data

            localStorage.setItem('access_token', data.access_token );
            localStorage.setItem('token_type', data.token_type );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({id: user.id, name: user.name, email: user.email}));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async({ name, email, password, confirmedPassword }) => {
        dispatch( onChecking() );
        try {
            const { data } = await reminderApi.post('/api/register',{ name, email, password, password_confirmation: confirmedPassword});
            const {user} = data

            localStorage.setItem('access_token', data.access_token );
            localStorage.setItem('token_type', data.token_type );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({id: user.id, name: user.name, email: user.email}));

        } catch (error) {
            dispatch( onLogout( error.response.data?.msg || '--' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('access_token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const { data } = await reminderApi.get('/api/verify-token');
            const {user} = data
            localStorage.setItem('access_token', data.access_token );
            localStorage.setItem('token_type', data.token_type );
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch(onLogin({id: user.id, name: user.name, email: user.email}));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = async () => {
        await reminderApi.post('/api/logout');
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        //* Propiedades
        errorMessage,
        status,
        TYPE_CHECKING,
        TYPE_AUTHENTICATED,
        TYPE_NOT_AUTHENTICATED,
        // user,

        //* Métodos
        startLogin,
        checkAuthToken,
        startLogout,
        startRegister,
    }

}