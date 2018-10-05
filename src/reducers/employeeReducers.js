import {
    EMPLOYEE_DATA_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEE_SAVED_SUCCESSFULLY,
    SET_EMP_FORM_TO_DEFAULT
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export const employeeReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_DATA_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EMPLOYEE_CREATED:
            return INITIAL_STATE;
        case EMPLOYEE_SAVED_SUCCESSFULLY:
            return INITIAL_STATE;
        case SET_EMP_FORM_TO_DEFAULT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
