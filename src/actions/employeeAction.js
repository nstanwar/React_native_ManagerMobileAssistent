import firebase from 'firebase';

import {
    EMPLOYEE_DATA_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEE_FETCH_SUCCESS,
    EMPLOYEE_SAVED_SUCCESSFULLY,
    SET_EMP_FORM_TO_DEFAULT,
    EMPLOYEE_DELETED
} from './types';

export const employeeDataUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_DATA_UPDATE,
        payload: { prop, value }
    };
};

export const createEmployee = ({ name, phone, shift }, callback) => {
    const { currentUser } = firebase.auth();    
    return (dispatch) => {        
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift });
        dispatch({ type: EMPLOYEE_CREATED });
        callback();
    };
};

export const employeesDataFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
            dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
        });
    };    
};

export const employeeSave = ({ name, phone, shift, uid }, callback) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift });
        dispatch({ type: EMPLOYEE_SAVED_SUCCESSFULLY });
        callback();
    };
};

export const setEmployeeFormToDefault = () => {
    return { type: SET_EMP_FORM_TO_DEFAULT };
};

export const deleteSelectedEmployee = (uid, callback) => {
    const { currentUser } = firebase.auth();
    return async (dispatch) => {
        await firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove();
        dispatch({ type: EMPLOYEE_DELETED });
        callback();
    };
};
