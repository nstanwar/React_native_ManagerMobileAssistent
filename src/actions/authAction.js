import firebase from 'firebase';
import {
    EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
} from './types';

export const emailChange = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text
    };
};

export const passwordChange = (text) => {
    return {
        type: PASSWORD_CHANGE,
        payload: text
    };
};

export const loginUser = ({ email, password }, callback) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_USER });
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
            callback();
        } catch (ee) {
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
            } catch (error) {
                dispatch({ type: LOGIN_USER_FAIL });
            }
        }
    };  
};    

export const logOutUser = (callback) => {    
        return async (dispatch) => {
            try {
                await firebase.auth().signOut();
                dispatch({ type: LOGOUT_USER });
                callback();
            } catch (error) {
                console.log('logOutUser Error: ', error);
            }
        };
};
