import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import StatusList from '../components/Messenger/StatusList';
// import styles from './styles';
import { StyleSheet } from 'react-native';
import colors from '../config/styles';


class MessagesScreen extends Component {
    onPress = () => {
        const { navigation } = this.props;
        navigation.navigate('CameraScreen');
    };

    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <StatusList />
                <Button
                    icon="add-a-photo"
                    mode="contained"
                    onPress={() => this.props.navigation.navigate('ChatScreen')}
                >
                    Press me
                </Button>
            </View>
            </SafeAreaView>
        );
    }
}

MessagesScreen.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightWhite
    }
});

export default MessagesScreen;