import {Button , Text, View} from 'react-native';
import {colors} from '../theme/color.jsx';

export default function DashboardScreen({navigation}) {
    return (
        <View style={{flex:1}}>
            <Text style={{color: colors.text}}>
                Màn hình Tổng quan
            </Text>

            <Button
            title="Mở cài đặt"
            onPress={() => navigation.navigate('Settings')}
            >

            </Button>

        </View>
    )
}