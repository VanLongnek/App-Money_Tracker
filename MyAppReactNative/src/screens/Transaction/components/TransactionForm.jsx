import React, { useState } from 'react';
import Home from '../../Home/Home';
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

export default function TransactionForm({
    navigation,
    title = 'Giao dịch',
    themeColor = '#FD3C4A', // Mặc định là màu đỏ
    amountLabel = 'Số tiền?',
    categories = [],
    defaultCategory = '',
    buttonText = 'Xác nhận',
}) {
    // 1. Quản lý dữ liệu 4 ô thông tin
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(defaultCategory || categories[0] || '');
    const [note, setNote] = useState('');
    const [bank, setBank] = useState('Vietcombank (*4892)');

    // 2. Trạng thái Modal
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBankModal, setShowBankModal] = useState(false);

    // Danh sách ngân hàng đã liên kết
    const linkedBanks = [
        { name: 'Vietcombank', accNo: '*4892', balance: '12.500.000đ' },
        { name: 'MB Bank', accNo: '*8888', balance: '5.200.000đ' },
        { name: 'Techcombank', accNo: '*6677', balance: '18.400.000đ' },
        { name: 'Ví MoMo', accNo: '*0912', balance: '850.000đ' },
    ];

    return (
        // 👉 Điểm thay đổi 1: Màu nền nhận linh hoạt từ themeColor
        <View style={[styles.container, { backgroundColor: themeColor }]}>

            {/* Ô 1: HEADER TRÊN CÙNG */}
            <View style={styles.topSection}>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => navigation?.navigate('Home')} style={styles.backButton}>
                        <ArrowLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    {/* 👉 Điểm thay đổi 2: Tiêu đề nhận từ Prop title */}
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.amountContainer}>
                    {/* 👉 Điểm thay đổi 3: Nhãn nhận từ Prop amountLabel */}
                    <Text style={styles.howMuchText}>{amountLabel}</Text>
                    <View style={styles.amountRow}>
                        <Text style={styles.currencySymbol}>đ</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        />
                    </View>
                </View>
            </View>

            {/* FORM TRẮNG: 3 Ô THÔNG TIN CÒN LẠI */}
            <View style={styles.bottomSheet}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>

                    {/* Ô 2: DANH MỤC */}
                    <Text style={styles.fieldLabel}>Danh mục</Text>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowCategoryModal(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.inputLeft}>
                            <Tag size={20} color={themeColor} />
                            <Text style={styles.inputText}>{category}</Text>
                        </View>
                        <ChevronDown size={20} color="#91919F" />
                    </TouchableOpacity>

                    {/* Ô 3: NỘI DUNG GHI CHÚ */}
                    <Text style={styles.fieldLabel}>Nội dung ghi chú</Text>
                    <View style={styles.inputBox}>
                        <View style={styles.inputLeft}>
                            <FileText size={20} color={themeColor} />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nhập ghi chú..."
                                placeholderTextColor="#91919F"
                                value={note}
                                onChangeText={setNote}
                            />
                        </View>
                    </View>

                    {/* Ô 4: BANKING */}
                    <Text style={styles.fieldLabel}>Tài khoản nguồn (Banking)</Text>
                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowBankModal(true)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.inputLeft}>
                            <Landmark size={20} color={themeColor} />
                            <Text style={styles.inputText}>{bank}</Text>
                        </View>
                        <ChevronDown size={20} color="#91919F" />
                    </TouchableOpacity>

                    {/* NÚT XÁC NHẬN */}
                    <TouchableOpacity
                        style={[styles.continueButton, { backgroundColor: themeColor }]}
                        activeOpacity={0.8}
                    >
                        {/* 👉 Điểm thay đổi 4: Chữ nút bấm nhận từ buttonText */}
                        <Text style={styles.continueButtonText}>{buttonText}</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            {/* MODAL 1: BẢNG CHỌN DANH MỤC */}
            <Modal visible={showCategoryModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn danh mục</Text>
                        {/* 👉 Điểm thay đổi 5: Render từ Prop categories */}
                        {categories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={styles.modalItem}
                                onPress={() => {
                                    setCategory(cat);
                                    setShowCategoryModal(false);
                                }}
                            >
                                <Text style={[styles.modalItemText, category === cat && { color: themeColor, fontWeight: '700' }]}>
                                    {cat}
                                </Text>
                                {category === cat && <Check size={20} color={themeColor} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {/* MODAL 2: BẢNG CHỌN TÀI KHOẢN BANKING */}
            <Modal visible={showBankModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn tài khoản</Text>
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
                                        <Text style={[styles.modalItemText, isSelected && { color: themeColor, fontWeight: '700' }]}>
                                            {item.name} <Text style={{ fontSize: 13, color: '#91919F' }}>{item.accNo}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 12, color: '#91919F' }}>Số dư: {item.balance}</Text>
                                    </View>
                                    {isSelected && <Check size={20} color={themeColor} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        minWidth: 0,
        padding: 0,
    },
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
});
