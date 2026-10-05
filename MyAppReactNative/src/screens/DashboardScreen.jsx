import {Button , Text, View} from 'react-native';
import {colors} from '../theme/color.jsx';
import {useNavigation} from '@react-navigation/native';





export default function DashboardScreen() {
    const navigation = useNavigation();

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

            <Button
                title="Xem giao dịch"
                onPress={() => navigation.navigate('Transactions')}
            />

        </View>
    )
}