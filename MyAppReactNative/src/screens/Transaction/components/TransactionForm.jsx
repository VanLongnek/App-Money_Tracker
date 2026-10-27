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
    const [showBandModal, setShowBankModal] = useState(false);


    // Danh sách các ngân hàng liên kết
    const linkedBanks = [
        { name: 'Vietcombank', accNo: '*4892', balance: '12.500.000' },
        { name: 'MB Bank', accNo: '*8888', balance: '5.200.000' },
        { name: 'Techcombank', accNo: '*6677', balance: '18.400.000đ' },
        { name: 'Ví MoMo', accNo: '*0912', balance: '850.000đ' },
    ];

    return (
        // 👉 Điểm thay đổi 1: Màu nền nhận linh hoạt từ themeColor
        <View >
            {/* Ô 1: HEADER TRÊN CÙNG */}
            <View>
                <View>
                    <TouchableOpacity>
                        <ArrowLeft />
                    </TouchableOpacity>

                    <Text></Text>
                    <View />

                </View>
                <View>
                    {/* Điểm thay đổi 3 ; Nhãn nhận từ prop amoubtLabel */}
                    <Text></Text>
                    <View>
                        <Text></Text>
                        <TextInput />
                    </View>

                </View>

            </View>




            {/* FORM TRẮNG: 3 Ô THÔNG TIN CÒN LẠI */}

            <View>
                <ScrollView>
                    {/* Danh Mục  */}
                    <Text></Text>
                    <TouchableOpacity>
                        <View>

                        </View>
                        <ChevronDown />
                    </TouchableOpacity>



                    {/* Nội dung ghi chú */}
                    <Text></Text>
                    <View>
                        <View>
                            <FileText />
                            <TextInput />
                        </View>
                    </View>

                    {/* Banking (Nguồn ngân hàng)  */}
                    <Text></Text>
                    <TouchableOpacity>
                        <View></View>
                        <ChevronDown />
                    </TouchableOpacity>



                    {/* Nút xác nhận */}
                    <TouchableOpacity>
                        <Text></Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>


            {/* MODAL 1: BẢNG CHỌN DANH MỤC */}
            <Modal >
                <View>
                    <View>
                        <Text></Text>
                        {/* Điểm thay đổi 5 : Reder các prop trong categories */}
                        {/* Cú pháp map để render các property trong thành phan */}
                    </View>
                </View>
            </Modal>

            {/* MODAL 2: BẢNG CHỌN TÀI KHOẢN BANKING */}

            <Modal>
                <View>
                    <View>
                        <Text></Text>
                        {/* Cú pháp linkedBanks */}
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











    )

}