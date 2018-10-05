import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList, View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { employeesDataFetch, logOutUser } from '../actions';
import ListItem from '../components/ListItem';

class EmployeeListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <Button 
                    title='Logout'
                    onPress={navigation.getParam('onHeaderLeftButtonPress')}
                    buttonStyle={{ backgroundColor: 'rgba(255,127,80,0.95)' }}
                />),
            title: 'Employee List',
            headerRight: (
            <Button 
                title='Add'
                onPress={() => navigation.navigate('empCreate')}
                buttonStyle={{ backgroundColor: 'rgba(255,127,80,0.95)' }}
            />),
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 30,
                paddingLeft: Platform.OS === 'android' ? 55 : 45,
                color: 'rgba(255,127,80,0.95)'
              },
            headerStyle: {
                backgroundColor: 'rgba(0,0,0,0.75)'
              }
        };
    }
    componentDidMount() {
        this.props.employeesDataFetch();
        this.props.navigation.setParams({ 
            onHeaderLeftButtonPress: this.onHeaderLeftButtonPress 
        });
    }
    onHeaderLeftButtonPress = () => {
        this.props.logOutUser(() => {
            this.props.navigation.navigate('loginForm');
        });
    }
    renderItem = (employee) => {
        return <ListItem employee={employee} navigation={this.props.navigation} />;
    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <FlatList
                    data={this.props.employees}
                    renderItem={this.renderItem}
                    keyExtractor={employee => employee.uid}
                />
            </View>    
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)', 
        flex: 1
    }
};

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    return { employees };
};
export default connect(mapStateToProps, { 
    employeesDataFetch,
    logOutUser
 })(EmployeeListScreen);
