import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Metrics from '../config/metrics';
import AppStyles from '../config/styles';


class CameraScreen extends Component {
    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            alert('Saved', data.uri);
        }
    };

    onPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={
                        'We need your permission to use your camera phone'
                    }
                />
                <SafeAreaView style={styles.absoluteView}>
                    <View style={styles.head}>
                        <TouchableOpacity onPress={this.onPress}>
                            <Icon name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Icon name="photo-camera" size={75} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }
}

CameraScreen.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppStyles.colors.black
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: AppStyles.colors.grey,
        borderRadius: 75,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    absoluteView: {
        width: Metrics.screenWidth,
        position: 'absolute',
        left: 0,
        top: 50,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    head: {
        width: Metrics.screenWidth,
        height: 50,
        padding: 16
    }
});

export default CameraScreen;