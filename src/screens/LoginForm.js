import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import {
    Card,
    FormLabel, 
    FormInput, 
    Button,
    Header,
    Icon
} from 'react-native-elements';

import { emailChange, passwordChange, loginUser } from '../actions';

const LOGO_IMAGE = require('../images/gl_logo.jpeg');

class LoginForm extends Component {
    onEmailChange = (text) => {
        this.props.emailChange(text);
    }
    onPasswordChange = (text) => {
        this.props.passwordChange(text);
    }
    onButtonPress = () => {
        const { email, password } = this.props;
        this.props.loginUser({ email, password }, () => {
            this.props.navigation.navigate('main');
        });
    }
    renderError = () => {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'rgba(0,0,0,0.01)', alignItems: 'center' }}>
                    <Text style={styles.textErrorStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }
    renderButton = () => {
        if (this.props.loading) {
        return (
                <ActivityIndicator size='large' />
            );
        }
        return (
            <Button
                    borderRadius={5}
                    large
                    title='Login'
                    backgroundColor='rgba(255,127,80,0.95)'
                    onPress={this.onButtonPress}
                    buttonStyle={{ margin: 8 }}
            />
        );
    }
    render() {
        const { textFormLabelStyle, imageStyle, containerStyle, textFormTitleStyle } = styles;
        return (
            <View style={containerStyle}>
                <Header
                    leftComponent={<Image
                        style={imageStyle}
                        source={LOGO_IMAGE}
                    />}
                    centerComponent={<Text style={textFormTitleStyle}>LoginForm</Text>}
                    rightComponent={<Icon name='create' color='#fff' />}
                    backgroundColor='rgba(0,0,0,0.75)'
                />
                <Card
                    containerStyle={{ borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.75)' }}
                >
                    <FormLabel labelStyle={textFormLabelStyle}>Email</FormLabel>
                    <FormInput 
                        onChangeText={this.onEmailChange}
                        placeholder="email@test.com"
                        value={this.props.email}
                        inputStyle={{ color: 'white' }}
                    />

                    <FormLabel labelStyle={textFormLabelStyle}>Password</FormLabel>
                    <FormInput 
                        onChangeText={this.onPasswordChange} 
                        secureTextEntry
                        placeholder="password"
                        value={this.props.password}
                        inputStyle={{ color: 'white' }}
                    />
                    {this.renderError()}
                    {this.renderButton()}
                </Card>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        flex: 1,
    },
    textFormLabelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textErrorStyle: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    imageStyle: {
        width: 70,
        height: 50,
    },
    textFormTitleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgba(255,127,80,0.95)'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;
    return {
        email,
        password,
        error,
        loading
    };
};
export default connect(mapStateToProps, { emailChange, passwordChange, loginUser })(LoginForm);
