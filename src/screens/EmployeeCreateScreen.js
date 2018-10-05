import React, { Component } from 'react';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation';
import { AndroidBackHandler } from 'react-navigation-backhandler';

import EmployeeForm from '../components/EmployeeForm';
import { employeeDataUpdate, createEmployee, setEmployeeFormToDefault } from '../actions'; 

class EmployeeCreateScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: 'Create Employee',
            headerLeft: <HeaderBackButton 
                onPress={params.onLeftButtonPress}
                tintColor='rgba(255,127,80,0.95)'
            />,
            headerStyle: {
                backgroundColor: 'rgba(0,0,0,0.75)'
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 30,
                color: 'rgba(255,127,80,0.95)'
            },
        };
    }  
    componentDidMount() { 
        this.props.navigation.setParams({ onLeftButtonPress: this.onSoftLeftBackButtonPress });
    }    
    onSoftLeftBackButtonPress = () => {
        this.props.setEmployeeFormToDefault();
        this.props.navigation.pop();
    }
    onBackButtonPressAndroid = () => {
        this.props.setEmployeeFormToDefault();
        return false;
    }
    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        this.props.createEmployee({ name, phone, shift: shift || 'Monday' }, () => 
        this.props.navigation.pop());
    }
    render() {
        const { containerStyle } = styles;
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <Card containerStyle={containerStyle}>
                    <EmployeeForm {...this.props} />
                    <Button 
                        borderRadius={5}
                        large
                        backgroundColor='rgba(255,127,80,0.95)'
                        title='Create'
                        onPress={this.onButtonPress}
                    />
                </Card>
            </AndroidBackHandler>
        );
    }
}

const styles = {
    containerStyle: {
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.75)'
    },
};
const mapStateToProps = state => {
    const { name, phone, shift } = state.empData;
    return { name, phone, shift };
};
export default connect(mapStateToProps, { 
    employeeDataUpdate,
    createEmployee,
    setEmployeeFormToDefault
})(EmployeeCreateScreen);
