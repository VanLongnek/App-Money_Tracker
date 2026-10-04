import {Text , View} from 'react-native';
import {colors} from '../theme/color.jsx';


export default function SettingScreen() {
    return (
        <View style={{flex:1}}>
            <Text style= {{color: colors.text}}>Màn hình cài đặt</Text>
        </View>
    )
}