import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
} from 'react-native';
import { ArrowLeft, ChevronDown, Tag, FileText, Landmark, Check } from 'lucide-react-native';

export default function ExpenseScreen({ navigation }) {
    // 1. Quản lý dữ liệu 4 ô thông tin
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Ăn uống');
    const [note, setNote] = useState('');
    const [bank, setBank] = useState('Vietcombank (*4892)');

    // 2. Trạng thái đóng/mở bảng chọn Danh mục và Ngân hàng
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);

    // Danh sách danh mục gợi ý
    const categories = ['Ăn uống', 'Mua sắm', 'Di chuyển', 'Hoá đơn điện nước', 'Giải trí', 'Sức khoẻ'];

    // Danh sách ngân hàng đã liên kết
    const linkedBanks = [
        { name: 'Vietcombank', accNo: '*4892', balance: '12.500.000đ' },
        { name: 'MB Bank', accNo: '*8888', balance: '5.200.000đ' },
        { name: 'Techcombank', accNo: '*6677', balance: '18.400.000đ' },
        { name: 'Ví MoMo', accNo: '*0912', balance: '850.000đ' },
    ];

    return (
        <View style={styles.container}>

            {/* ========================================================
          Ô 1: HEADER ĐỎ - NHẬP SỐ TIỀN CẦN CHI
          ======================================================== */}
            <View style={styles.topSection}>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Chi Tiêu (Expense)</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.howMuchText}>Số tiền cần chi?</Text>
                    <View style={styles.amountRow}>
                        <Text style={styles.currencySymbol}>đ</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        //   autoFocus={true}
                        />
                    </View>
                </View>
            </View>

            {/* ========================================================
          FORM TRẮNG: 3 Ô THÔNG TIN CÒN LẠI
          ======================================================== */}
            <View style={styles.bottomSheet}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>

                    {/* Ô 2: DANH MỤC CHI TIÊU */}
                    <Text style={styles.fieldLabel}>Danh mục</Text>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowCategoryModal(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.inputLeft}>
                            <Tag size={20} color="#7C3AED" />
                            <Text style={styles.inputText}>{category}</Text>
                        </View>
                        <ChevronDown size={20} color="#91919F" />
                    </TouchableOpacity>

                    {/* Ô 3: NỘI DUNG GHI CHÚ (NOTE) */}
                    <Text style={styles.fieldLabel}>Nội dung ghi chú</Text>
                    <View style={styles.inputBox}>
                        <View style={styles.inputLeft}>
                            <FileText size={20} color="#7C3AED" />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nhập nội dung chi tiêu (VD: Cơm trưa...)"
                                placeholderTextColor="#91919F"
                                value={note}
                                onChangeText={setNote}
                            />
                        </View>
                    </View>

                    {/* Ô 4: BANKING - NGÂN HÀNG LIÊN KẾT ĐỂ RÚT TIỀN */}
                    <Text style={styles.fieldLabel}>Ngân hàng nguồn (Banking)</Text>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowBankModal(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.inputLeft}>
                            <Landmark size={20} color="#7C3AED" />
                            <Text style={styles.inputText}>{bank}</Text>
                        </View>
                        <ChevronDown size={20} color="#91919F" />
                    </TouchableOpacity>

                    {/* NÚT XÁC NHẬN CHI TIÊU */}
                    <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
                        <Text style={styles.continueButtonText}>Xác nhận chi tiêu</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            {/* --------------------------------------------------------
          MODAL 1: BẢNG CHỌN DANH MỤC
          -------------------------------------------------------- */}
            <Modal visible={showCategoryModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn danh mục chi tiêu</Text>
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={styles.modalItem}
                                onPress={() => {
                                    setCategory(cat);
                                    setShowCategoryModal(false);
                                }}
                            >
                                <Text style={[styles.modalItemText, category === cat && styles.selectedItemText]}>
                                    {cat}
                                </Text>
                                {category === cat && <Check size={20} color="#7C3AED" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {/* --------------------------------------------------------
          MODAL 2: BẢNG CHỌN NGÂN HÀNG LIÊN KẾT (BANKING)
          -------------------------------------------------------- */}
            <Modal visible={showBankModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn tài khoản thanh toán</Text>
                        {linkedBanks.map((item) => {
                            const bankLabel = `${item.name} (${item.accNo})`;
                            const isSelected = bank === bankLabel;
                            return (
                                <TouchableOpacity
                                    key={item.accNo}
                                    style={styles.modalItem}
                                    onPress={() => {
                                        setBank(bankLabel);
                                        setShowBankModal(false);
                                    }}
                                >
                                    <View>
                                        <Text style={[styles.modalItemText, isSelected && styles.selectedItemText]}>
                                            {item.name} <Text style={{ fontSize: 13, color: '#91919F' }}>{item.accNo}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 12, color: '#91919F' }}>Số dư: {item.balance}</Text>
                                    </View>
                                    {isSelected && <Check size={20} color="#7C3AED" />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Modal>

        </View>
    );
}

// ========================================================
// STYLESHEET
// ========================================================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FD3C4A', // Đỏ chi tiêu
    },
    topSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    amountContainer: {
        paddingHorizontal: 8,
    },
    howMuchText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 6,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencySymbol: {
        fontSize: 54,
        fontWeight: '700',
        color: '#FFFFFF',
        marginRight: 8,
    },
    amountInput: {
        fontSize: 54,
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        minWidth: 0, // 👈 THÊM DÒNG NÀY: Chống phình to vỡ màn hình trên Web
        padding: 0,
    },

    // Phần Form Trắng
    bottomSheet: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    formContent: {
        paddingBottom: 30,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#292B2D',
        marginBottom: 8,
        marginTop: 12,
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        borderWidth: 1,
        borderColor: '#F1F1FA',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FCFCFC',
    },
    inputLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    inputText: {
        fontSize: 15,
        color: '#292B2D',
        fontWeight: '500',
    },
    textInput: {
        fontSize: 15,
        color: '#292B2D',
        flex: 1,
    },
    continueButton: {
        backgroundColor: '#7C3AED',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },

    // Modal CSS
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0D0E0F',
        marginBottom: 16,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    modalItemText: {
        fontSize: 16,
        color: '#292B2D',
    },
    selectedItemText: {
        color: '#7C3AED',
        fontWeight: '700',
    },
});
