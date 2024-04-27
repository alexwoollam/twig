import axios from 'axios';

export const login = (userData) => {
    return async (dispatch) => {
        try {
            const graphqlQuery = {
                query: `
                    query Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            token
                        }
                    }
                `,
                variables: {
                    email: userData.email,
                    password: userData.password
                }
            };

            const graphqlResponse = await axios.post('http://localhost:3000/graphql', graphqlQuery);

            if (graphqlResponse.data.errors) {
                throw new Error(graphqlResponse.data.errors[0].message);
            }

            const responseData = graphqlResponse.data.data.login;
            const { token } = responseData;

            dispatch({ type: 'LOGIN_SUCCESS', payload: token });
            return true;
        } catch (error) {
            console.error('error', error);
            dispatch({ type: 'LOGIN_ERROR', payload: error.message });
            return false;
        }
    };
};

export const validateToken = (token) => {

    return async (dispatch) => {
        try {
            const graphqlQuery = {
                query: `
                    query Token($token: String!) {
                        token(token: $token) {
                            valid
                        }
                    }
                `,
                variables: {
                    token
                }
            };

            const graphqlResponse = await axios.post('http://localhost:3000/graphql', graphqlQuery);

            return graphqlResponse.data.data.token?.valid === true;
        } catch (error) {
            console.log('error', error);
            dispatch({ type: 'LOGIN_ERROR', payload: error.message });
            return false;
        }
    }
}