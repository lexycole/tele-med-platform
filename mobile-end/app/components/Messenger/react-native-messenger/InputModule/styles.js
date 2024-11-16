import { StyleSheet } from 'react-native';
import Metrics from '../../../../config/metrics';
import colors from '../../../../config/colors';
import { isIphoneX } from '../../../../utils/isIphoneX';

const styles = StyleSheet.create({
    container: {
        height: isIphoneX() ? 74 : 50,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
        paddingBottom: isIphoneX() ? 24 : 0
    },
    customContainer: {
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
        paddingBottom: 0
    },
    btn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden'
    },
    input: {
        width: Metrics.screenWidth / 2 - 16,
        height: 36,
        borderRadius: 24,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.grey,
        marginVertical: 8
    }
});
export default styles;
