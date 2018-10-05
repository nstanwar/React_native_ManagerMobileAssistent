import _ from 'lodash'; 
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { text } from 'react-native-communications';

import { employeeDataUpdate, 
    employeeSave, 
    setEmployeeFormToDefault, 
    deleteSelectedEmployee 
} from '../actions';
import EmployeeForm from '../components/EmployeeForm';
import Confirm from '../components/Confirm';

class EmployeeEditScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Employee',
            headerLeft: <HeaderBackButton 
                tintColor='rgba(255,127,80,0.95)'
                onPress={navigation.getParam('onHeaderLeftButtonPress')} 
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
    };
    state = { showModal: false };
    componentWillMount() {
        const { item } = this.props.navigation.state.params.employee;
        _.forEach(item, (value, prop) => {
            this.props.employeeDataUpdate({ prop, value });
        });
        this.props.navigation.setParams({ onHeaderLeftButtonPress: this.onHeaderLeftButtonPress });
    }
    onHeaderLeftButtonPress = () => {
        this.props.setEmployeeFormToDefault();
        this.props.navigation.pop();
    }
    onButtonPress = () => {
        const { name, phone, shift } = this.props;
        const { uid } = this.props.navigation.state.params.employee.item; 
        this.props.employeeSave({ name, phone, shift, uid }, () => {
            this.props.navigation.navigate('empList');
        }); 
    }
    onTextButtonPress = () => {
        const { phone, shift } = this.props;
        text(phone, `Your shift is on ${shift}`);
    }
    onBackButtonPressAndroid = () => {
        this.props.setEmployeeFormToDefault();
        return false;
    }
    onAccept = () => {
        const { uid } = this.props.navigation.state.params.employee.item;
        this.props.deleteSelectedEmployee(uid, () => {
            this.props.navigation.navigate('empList');
        });
        this.setState({ showModal: false });
    }
    render() {
        const { containerStyle } = styles;
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
            <ScrollView>
                <Card containerStyle={containerStyle} >
                    <EmployeeForm {...this.props} />
                    <Button 
                        borderRadius={5}
                        large
                        backgroundColor='rgba(255,127,80,0.95)'
                        title='Update Employee'
                        onPress={this.onButtonPress}
                        buttonStyle={{ marginBottom: 8 }}
                    />
                    <Button 
                        borderRadius={5}
                        large
                        backgroundColor='rgba(255,127,80,0.95)'
                        title='Text Schedule'
                        onPress={this.onTextButtonPress}
                        buttonStyle={{ marginBottom: 8 }}
                    />
                    <Button 
                        borderRadius={5}
                        large
                        backgroundColor='rgba(255,127,80,0.95)'
                        title='Delete'
                        onPress={() => this.setState({ showModal: true })}
                        buttonStyle={{ marginBottom: 8 }}
                    />
                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept}
                        onDecline={() => this.setState({ showModal: false })} 
                    >
                        You want to delete it.Are you sure?
                    </Confirm>
                </Card>
                </ScrollView>
            </AndroidBackHandler>
        );
    }
}

const styles = {
    containerStyle: {
        borderRadius: 5,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
    }
};
const mapStateToProps = state => {
    const { name, phone, shift } = state.empData;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeDataUpdate,
    employeeSave,
    setEmployeeFormToDefault,
    deleteSelectedEmployee
 })(EmployeeEditScreen);
