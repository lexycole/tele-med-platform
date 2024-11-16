import React, { Component } from 'react';
import { View } from 'react-native';

import CallsList from '../../../components/Messenger/CallsList';
import styles from './styles';

export default class CallsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CallsList />
            </View>
        );
    }
}
