const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    switch (method) {
        case 'GET':
            return fetch( url );
        default:
            return fetch( url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
            });
    }
}

export const fetchWithToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';
    switch (method) {
        case 'GET':
            return fetch( url, {
                method,
                headers: {
                    'x-token': token
                }
            });
        default:
            return fetch( url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify( data )
            });
    }
}