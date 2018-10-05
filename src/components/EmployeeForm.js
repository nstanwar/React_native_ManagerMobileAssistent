import React, { Component } from 'react';
import { FormInput, FormLabel } from 'react-native-elements';
import { Picker, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { employeeDataUpdate } from '../actions';

class EmployeeForm extends Component {
    render() {
        const { textFormLabelStyle, shiftTextStyle } = styles;
        return (
            <View>
                <FormLabel labelStyle={textFormLabelStyle}>Name</FormLabel>
                <FormInput 
                    value={this.props.name}
                    onChangeText={value => this.props.employeeDataUpdate({ prop: 'name', value })}
                    inputStyle={{ color: 'white' }}
                />

                <FormLabel labelStyle={textFormLabelStyle}>Phone</FormLabel>
                <FormInput 
                    value={this.props.phone}
                    onChangeText={value => this.props.employeeDataUpdate({ prop: 'phone', value })}
                    inputStyle={{ color: 'white' }}
                />

                <Text style={shiftTextStyle}>Shift</Text>
                <Picker
                    selectedValue={this.props.shift}
                    onValueChange={value => this.props.employeeDataUpdate({ 
                        prop: 'shift', value 
                    })}
                >
                    <Picker.Item label="Monday" value="Monday" color={pickerItemColorProp} />
                    <Picker.Item label="Tuesday" value="Tuesday" color={pickerItemColorProp} />
                    <Picker.Item label="Wednesday" value="Wednesday" color={pickerItemColorProp} />
                    <Picker.Item label="Thursday" value="Thursday" color={pickerItemColorProp} />
                    <Picker.Item label="Friday" value="Friday" color={pickerItemColorProp} />
                    <Picker.Item label="Saturday" value="Saturday" color={pickerItemColorProp} />
                    <Picker.Item label="Sunday" value="Sunday" color={pickerItemColorProp} />
                </Picker>
            </View>
        );
    }
}

const pickerItemColorProp = Platform.OS === 'android' ? 'white' : 'white';

const styles = {
    shiftTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        color: 'white'
    },
    textFormLabelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
};
const mapStateToProps = state => {
    const { name, phone, shift } = state.empData;
    return { name, phone, shift };
};
export default connect(mapStateToProps, { employeeDataUpdate })(EmployeeForm);
