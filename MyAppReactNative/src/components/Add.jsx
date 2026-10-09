import React, { useState } from 'react';
import { Plus, X, ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from 'lucide-react-native';
import { colors } from '../theme/color.jsx';

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'




export default function Add() {
    //1 . Tạo State để quản lý trạng thái : false là đóng menu , true
    const [isOpen, setIsopen] = useState(false);

    // Tạo hàm mở menu khi người dùng nhấn giữ
    const handleOpen = () => {
        setIsopen(true);
    }

    // 3. Hàm dóng menu khi bấm nút hoạc chạm ra ngoài 
    const handleClose = () => {
        setIsopen(false);
    }



    return (
        <View style={styles.container}>

            {/* Khi menu mở (isOpen === true) thì render 3 nút con */}
            {isOpen && (
                <View style={styles.subButtonsContainer} pointerEvents="box-none">
                    {/* 1. Nút Thu nhập (Income) - Góc trái trên, màu xanh lá */}
                    <TouchableOpacity
                        style={[styles.subButton, styles.incomeButton]}
                        activeOpacity={0.8}
                        onPress={handleClose}
                    >
                        <ArrowDownLeft color="#FFFFFF" size={22} />
                    </TouchableOpacity>

                    {/* 2. Nút Giao dịch (Transaction) - Đỉnh trên, màu xanh dương */}
                    <TouchableOpacity
                        style={[styles.subButton, styles.transactionButton]}
                        activeOpacity={0.8}
                        onPress={handleClose}
                    >
                        <ArrowLeftRight color="#FFFFFF" size={22} />
                    </TouchableOpacity>

                    {/* 3. Nút Chi tiêu (Expense) - Góc phải trên, màu đỏ */}
                    <TouchableOpacity
                        style={[styles.subButton, styles.expenseButton]}
                        activeOpacity={0.8}
                        onPress={handleClose}
                    >
                        <ArrowUpRight color="#FFFFFF" size={22} />
                    </TouchableOpacity>
                </View>
            )}







            {/* Nút bấm chính hình tròn */}
            <TouchableOpacity
                style={styles.mainButton}
                activeOpacity={0.85} // Độ mờ khi chạm vào (tạo cảm giác phản hồi tốt)

                // Nếu menu đang mở thì hco phép bấm để đóng 
                onPress={isOpen ? handleClose : undefined}


                //Nếu menu đang đóng thì bắt sự kiện NHẤN GIỮ để mở
                onLongPress={!isOpen ? handleOpen : undefined}
                delayLongPress={250}  // Thời gian giữ 250ms (vừa phải , ko bị quá lâu)
            >
                {/* Đổi Icon linh hoạt theo trạng thái isOpen */}
                {isOpen ? (
                    <X size={28} color={colors.textMuted} />
                ) : (
                    <Plus color="#FFFFFF" size={30} />
                )}

            </TouchableOpacity>

        </View>
    );



}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
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
});