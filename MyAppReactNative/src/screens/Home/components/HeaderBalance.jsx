import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { ChevronDown, Bell, ArrowDown, ArrowUp } from 'lucide-react-native';
import defaultAvatar from '../../../assets/images/defaultavatar.jpg';




export default function HeaderBalance() {
    return (
        <View style={styles.container}>
            {/* Tầng 1 : TOP Bar (Avartar  + Tháng + Chuông )*/}
            <View style={styles.topBar}>
                {/* Avartar tròn bên phải */}
                <TouchableOpacity style={styles.avatarWrapper}>
                    <Image
                        source={defaultAvatar}
                        style={styles.avatar}
                    />
                </TouchableOpacity>

                {/* Nút chọn tháng ở giữa (kèm Icon mũi tên chỉ xuống) */}
                <TouchableOpacity style={styles.monthSelector}>
                    <ChevronDown size={18} color="#7C3AED" />
                    <Text style={styles.monthText}>October</Text>

                </TouchableOpacity>

                {/* Nút chuông thông báo bên phải */}
                <TouchableOpacity style={styles.bellButton}>
                    <Bell size={24} color="#7C3AED" />

                </TouchableOpacity>


            </View>



            {/* Tầng 2  :Số dư tài khoản */}
            <View style={styles.balanceSection}>
                <Text style={styles.balanceLabel}>Số Dư tài khoản</Text>
                <Text style={styles.balanceAmount}>$9400</Text>
            </View>


            {/* Tầng 3 Hai thẻ Thu Nhập và Chi Tiêu */}
            <View style={styles.cardRow}>

                {/* Thẻ 1 : Income */}
                <View style={[styles.card, styles.incomeCard]}>
                    {/* Tạo Icon */}
                    <View style={styles.iconBox}>
                        <ArrowDown size={20} color="#00A86B" />

                    </View>
                    {/* Tạo Nhãn Thu Nhập */}

                    <View style={styles.cardTextGroup}>
                        <Text style={styles.cardLabel}>Thu Nhập</Text>
                        <Text style={styles.cardAmount}>$5000</Text>
                    </View>

                </View>

                {/* Thẻ 2 : Expense(Đỏ) */}
                <View style={[styles.card, styles.expenseCard]}>
                    {/* Tạo Icon */}
                    <View style={styles.iconBox}>
                        <ArrowUp size={20} color="#FD3C4A" />

                    </View>

                    {/* Tạo Nhãn Chi Tiêu */}
                    <View style={styles.cardTextGroup}>
                        <Text style={styles.cardLabel}>Chi Tiêu</Text>
                        <Text style={styles.cardAmount}>$940</Text>
                    </View>

                </View>













                {/* Thẻ 2 : Expense*/}

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6E5', // Màu nền kem sáng bo cong mềm mại như trong ảnh
        borderRadius: 32, // Tự động bo tròn đều cả 4 góc

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


    //Tầng 2 
    balanceSection: {
        alignItems: 'center', // Căn chữ ra chính giữa
        marginTop: 20,
        marginBottom: 20,
    },

    balanceLabel: {
        fontSize: 14,
        color: '#91919F',
        marginBottom: 6,
    },

    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: '#161719',
    },


    //Tầng 3 : Hai thẻ Thu Nhập và Chi Tiêu
    cardRow: {
        flexDirection: 'row',
        gap: 16,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 24,
        gap: 12,
    },
    incomeCard: {
        backgroundColor: '#00A86B',
    },
    expenseCard: {
        backgroundColor: '#FD3C4A',

    },
    iconBox: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTextGroup: {
        justifyContent: 'center',
    },

    cardLabel: {
        fontSize: 13,
        color: '#FCFCFC',
        marginBottom: 4,
    },
    cardAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    }



})


