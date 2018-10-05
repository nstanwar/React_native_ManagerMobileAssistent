import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

class ListItem extends Component {
    onListItemPress = () => {
        const { employee } = this.props;
        this.props.navigation.navigate('empEdit', { employee });
    }
    render() {
        const { name } = this.props.employee.item;
        const { containerStyle, textStyle } = styles;
        return (
            <TouchableWithoutFeedback
                onPress={this.onListItemPress}
            >
                <View style={containerStyle}>
                    <Text style={textStyle}>{name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
};
export default ListItem;
