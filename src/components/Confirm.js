import React from 'react';
import { Modal, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, textStyle, buttonViewStyle } = styles;
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <Card containerStyle={{ borderRadius: 5 }}>
                    <Text style={textStyle}>{children}</Text>
                    <View style={buttonViewStyle}>
                        <Button 
                            onPress={onAccept}
                            borderRadius={5}
                            backgroundColor='blue'
                            title='Yes'
                            containerViewStyle={{ width: '30%' }}
                        />
                        <Button 
                            onPress={onDecline}
                            borderRadius={5}
                            backgroundColor='blue'
                            title='No'
                            containerViewStyle={{ width: '30%' }}
                        />
                    </View>
                </Card>
            </View>
        </Modal>
    );
};
const styles = {
    containerStyle: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 40
    },
    buttonViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
};
export default Confirm;
