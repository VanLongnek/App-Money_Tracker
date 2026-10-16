import React from 'react'; 
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements';




export default function HeaderBalance() {
    return (
        <View > 
            {/* Tầng 1 : TOP Bar (Avartar  + Tháng + Chuông )*/}
            <View>
                {/* Avartar tròn bên phải */}
                <TouchableOpacity>
                    <Image
                       
                    >
                        

                    </Image>
                </TouchableOpacity>

                {/* Nút chọn tháng ở giữa (kèm Icon mũi tên chỉ xuống) */}
                <TouchableOpacity>
                    <ChevronDown size={18} color="#7C3AED" />
                    <Text style={styles.monthText}>October</Text>
                    
                </TouchableOpacity>

                {/* Nút chuông thông báo bên phải */}
                <TouchableOpacity>
                    <Bell size={24} color="#7C3AED" />

                </TouchableOpacity>


            </View>
         </View>
    )
}



const styles = StyleSheet.create({
    container : { 
        backgroundColor: '#FFF6E5', // Màu nền kem sáng bo cong mềm mại như trong ảnh
        borderBottomLeftRadius: 32,  // Bo tròn góc đáy bên trái
        borderBottomRightRadius: 32, // Bo tròn góc đáy bên phải
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 24,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Dàn đều 3 thành phần sang 2 bên và ở giữa
    },
    avatarWrapper: { 
        borderWidth: 2,
        borderColor: '#7C3AED', // Viền tím nổi bật quanh avatar
        borderRadius: 24,
        padding: 2,
    },
    avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#F1F1FA',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212325',
  },
  bellButton: {
    padding: 6,
  },

})


