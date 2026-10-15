import React, { useState, useRef } from 'react';
import { Plus, X, ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from 'lucide-react-native';
import { colors } from '../theme/color.jsx';

import { StyleSheet, View, TouchableOpacity, Text, PanResponder } from 'react-native'




export default function Add() {
    //1 . Tạo State để quản lý trạng thái : false là đóng menu , true
    const [isOpen, setIsopen] = useState(false);


    //4. Khởi tạo sate activeOption để lưu lựa chọn hiện tại
    // và hàm setActiveOption để cập nhật lựa chọn  

    const [activeOption, setActiveOption] = useState(null);


    // 5. Khởi tạo hàm để biết ngón tay đang kéo về hướng nào
    const getSelectedOption = (dx, dy) => {
        if (dy >= -20) return null;
        if (dx < -25) return 'income';
        if (dx > 25) return 'expense';

        return 'transaction';

    };

    // KHỏi tạo biến lưu bộ đếm thời gian và cờ đánh dấu đã nhấn giữ lâu chưa 
    const timerRef = useRef(null);
    const isLongPressRef = useRef(false);

    // Khởi tạo đối tượng bộ bắt cử chỉ 

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true, // 👈 THÊM DÒNG NÀY: Xin quyền theo dõi khi di chuyển ngón tay
            
            // Hàm xử lý logic khi chạm ngón tay xuống , chưa mở ngay mà hẹn giờ 250ms 
            onPanResponderGrant: () => {
                isLongPressRef.current = false;

                //Bắt đầu đếm giờ : Nếu giữ đúng 250ms thì mới tính là NHẤN GIỮ và mở menu 
                timerRef.current = setTimeout(() => {
                    isLongPressRef.current = true;
                    setIsopen(true);
                },250) ; // 250 mili-giây 
            },



            // KHI RÊ TAY: Chỉ bắt cử chỉ khi ĐÃ NHẤN GIỮ ĐỦ LÂU
            onPanResponderMove: (_, { dx, dy }) => {
                if (isLongPressRef.current) { 
                    setActiveOption(getSelectedOption(dx, dy));
                }
            },



            // Khi thả tay ra 
            onPanResponderRelease: (_, { dx, dy }) => {
                // Hủy bộ đếm giờ nếu người dùng nhấc tay quá sớm 

                if(timerRef.current) {
                    clearTimeout(timerRef.current);
                }

                //Nếu là NHẤN GIỮ và KÉO

                if(isLongPressRef.current) {
                    const selected = getSelectedOption(dx,dy);


                    if(selected === 'income') {
                        console.log('Đã chọn : Thu Nhập')
                    }

                    if(selected === 'expense') {
                        console.log('Đã chọn : Chi Tiêu')
                    }

                    if(selected === 'transaction') {
                        console.log('Đã chọn : Giao Dịch')
                    }
                
                    //Đóng menu lại sau khi thả tay 
    
                    setIsopen(false);
                    setActiveOption(null);
                } else {
                    // Nếu chỉ là bấm chạm nhanh (Click bình thường)
                    if(isOpen) {
                        setIsopen(false);
                        setActiveOption(null);
                    }
                }


            },




        })
    ).current;



    return (
        <View style={styles.container}>
            {/* Giữ cụm 3 nút luôn có sẵn, chỉ đổi opacity để trình duyệt không bị mất dấu chuột */}
            <View
                style={[
                    styles.subButtonsContainer,
                    { opacity: isOpen ? 1 : 0 } // 👈 Khi mở thì hiện (1), khi đóng thì tàng hình (0)
                ]}
                pointerEvents={isOpen ? "box-none" : "none"} // 👈 Khi đóng thì không bấm trúng được
            >
                {/* 1. Nút Thu nhập */}
                <View
                    style={[
                        styles.subButton,
                        styles.incomeButton,
                        activeOption === 'income' && styles.subButtonActive
                    ]}
                >
                    <ArrowDownLeft color="#FFFFFF" size={22} />
                </View>
                {/* 2. Nút Giao dịch */}
                <View
                    style={[
                        styles.subButton,
                        styles.transactionButton,
                        activeOption === 'transaction' && styles.subButtonActive
                    ]}
                >
                    <ArrowLeftRight color="#FFFFFF" size={22} />
                </View>
                {/* 3. Nút Chi tiêu */}
                <View
                    style={[
                        styles.subButton,
                        styles.expenseButton,
                        activeOption === 'expense' && styles.subButtonActive
                    ]}
                >
                    <ArrowUpRight color="#FFFFFF" size={22} />
                </View>
            </View>
            {/* Nút bấm chính hình tròn */}
            <View
                style={styles.mainButton}
                {...panResponder.panHandlers}
            >
                {/* 👉 Dán đoạn này vào dòng 128: */}
                {isOpen ? (
                    <X size={28} color={colors.textMuted} />
                ) : (
                    <Plus color="#FFFFFF" size={30} />
                )}
                
            </View>
        </View>
    );



}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 38,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    mainButton: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#7C3AED',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
    },


    // Khung chứa định vị 3 nút con phía trên nút chính
    subButtonsContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 140,
        bottom: 30, // Đẩy lên phía trên nút tròn chính
    },
    // Kiểu dáng chung của 3 nút con (tròn 48x48)
    subButton: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    // 1. Nút Income: Nằm lệch góc trái
    incomeButton: {
        backgroundColor: '#10B981', // Màu xanh lá
        left: 14,
        top: 60,
    },
    // 2. Nút Transaction: Nằm trên đỉnh chính giữa
    transactionButton: {
        backgroundColor: '#3B82F6', // Màu xanh dương
        top: 10,
    },
    // 3. Nút Expense: Nằm lệch góc phải
    expenseButton: {
        backgroundColor: '#EF4444', // Màu đỏ
        right: 14,
        top: 60,
    },
    // Hiệu ứng nút con phóng to lên 1.25 lần khi ngón tay lướt qua
    subButtonActive: {
        transform: [{ scale: 1.25 }],
        elevation: 10,
        shadowOpacity: 0.5,
    },
});