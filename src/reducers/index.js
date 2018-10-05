import { combineReducers } from 'redux';
import { authReducers } from './authReducers';
import { employeeReducers } from './employeeReducers';
import employeeFetchData from './employeesFetchReducers';

export default combineReducers({
    auth: authReducers,
    empData: employeeReducers,
    employees: employeeFetchData
});
