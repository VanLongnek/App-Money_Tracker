import react from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ShoppingBag, ReceiptText, Utensils } from 'lucide-react-native';

// Mảng 3 giao dịch mẫu giống hệt 

const transaction = [
    {
        id: '1',
        title: 'Shopping',
        description: 'Buy some grocery',
        amount: '- $120',
        time: '10:00 AM',
        icon: ShoppingBag,
        iconColor: '#FCAC12', // Vàng cam
        iconBg: '#FCEED4',    // Nền vàng kem
        isExpense: true,
    },
    {
        id: '2',
        title: 'Subscription',
        description: 'Disney+ Annual..',
        amount: '- $80',
        time: '03:30 PM',
        icon: ReceiptText,
        iconColor: '#7C3AED', // Tím
        iconBg: '#EEE5FF',    // Nền tím nhạt
        isExpense: true,
    },
    {
        id: '3',
        title: 'Food',
        description: 'Buy a ramen',
        amount: '- $32',
        time: '07:30 PM',
        icon: Utensils,
        iconColor: '#FD3C4A', // Đỏ
        iconBg: '#FDD5D7',    // Nền đỏ nhạt
        isExpense: true,
    },
];



export default function RecentTransactions() {
    return (
        // Khung chứa thành phần chính 
        <View style={styles.container}>
            {/* Thanh tiêu đề :Recent transaction + Nút See All */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Recent Transaction</Text>
                <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>

            </View>


            {/*Danh sách các thẻ giao dịch */}
            <View style={styles.list}>

                {/* Biểu thức này dùng map lặp các phần tử trong mảng transaction */}
                {transaction.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        // 
                        <View key={item.id} style={styles.card}>
                            {/* Khung Icon bên trái */}
                            <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                                <IconComponent size={24} color={item.iconColor}/>

                            </View>

                            {/* Thông tin ở giữa bao gồm : Tên giao dịch và nội dung giao dịch */}
                            <View style={styles.inoCol}>
                                <Text style={styles.titleText}>{item.title}</Text>
                                <Text style={styles.descText} numberOfLines={1}>
                                    {item.description}
                                </Text>

                            </View>

                            {/* Số tiền và giờ bên phải */}
                            <View style={styles.amountCol}>
                                <Text style={[styles.amountText, item.isExpense && styles.expenseAmount]}>
                                  {item.amount}
                                </Text>
                                
                                <Text style={styles.timeText}>
                                  {item.time} 
                                </Text>

                            </View>


                        </View>
                    )
                })}
            </View>





        </View>
    );
}

// Tạo style CSS


const styles = StyleSheet.create({
    //Style khung chứa của component
    container: {
        marginTop: 20,    // Tạo khoảng cách 20px với Container 2 (Biểu đồ sóng) ở trên
        marginBottom: 20, // Cách đáy một khoảng để không bị dính sát

    },

    // Style Thanh tiêu đề 
    headerRow: {
        flexDirection: 'row',            // Xếp chữ và nút nằm trên cùng 1 hàng ngang
        justifyContent: 'space-between', // Đẩy tiêu đề dạt sát mép trái, nút See All dạt sát mép phải
        alignItems: 'center',            // Căn thẳng hàng theo chiều dọc
        marginBottom: 14,                // Cách phần danh sách các thẻ bên dưới 14px

    },

    // Style Chữ tiêu đề :" Recent Transaction"
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF', // 👈 Đổi sang màu trắng

    },

    // Style Khung chứa chữ "See All"
    seeAllBtn: {
        backgroundColor: 'rgba(124, 58, 237, 0.15)', // Nền tím mờ cực sang trong Dark Mode
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,

    },

    seeAllText: {
        color: '#7C3AED',   // Chữ màu tím đậm tương phản rõ trên nền tím nhạt
        fontSize: 14,
        fontWeight: '600',  // In đậm vừa phải

    },

    // ========================================================
    // KHU VỰC 2: DANH SÁCH & BỐ CỤC THẺ GIAO DỊCH
    // ========================================================


    // Style Bao quanh danh sách các thẻ
    list: {
        gap: 12, // Tự động tạo khoảng cách đều 12px giữa các thẻ giao dịch với nhau


    },

    // Style Mỗi thẻ giao dịch
    card: {
        backgroundColor: '#1E1E22',                 // 👈 Đổi sang #1E1E22
        borderRadius: 24,
        borderWidth: 1,                             // 👈 Thêm viền
        borderColor: 'rgba(255, 255, 255, 0.08)',   // 👈 Viền mờ đồng bộ
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',

    },

    // ========================================================
    // KHU VỰC 3: CHI TIẾT NỘI DUNG BÊN TRONG THẺ
    // ========================================================

    // Style Khung chứa các Icon danh mục (Shopping , Food)
    iconBox: {
        width: 50,                  // Chiều rộng cố định 50px
        height: 50,                 // Chiều cao cố định 50px (tạo thành hình vuông)
        borderRadius: 16,           // Bo tròn 4 góc của khung icon
        justifyContent: 'center',   // Căn icon vào chính giữa theo chiều dọc
        alignItems: 'center',       // Căn icon vào chính giữa theo chiều ngang
        marginRight: 14,            // Đẩy cột thông tin kế bên cách ra 14px

    },

    // Style Cột ở giữa chứa tên danh mục và mô tả ghi chú
    infoCol: {
        flex: 1, // 👉 RẤT QUAN TRỌNG: Giúp cột này co giãn chiếm toàn bộ khoảng trống ở giữa,
        // tự động đẩy cột số tiền dạt sát về mép phải!

    },

    //Style Tên giao dịch
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF', // 👈 Đổi sang màu trắng
        marginBottom: 4,
    },

    // Style nội dung ghi chú
    descText: {
        fontSize: 13,
        color: '#A0A0A0',   // Màu chữ xám nhạt nhỏ nhắn


    },

    //Style Cột bên phải chứa số tiền và Giờ giao dịch
    amountCol: {
        alignItems: 'flex-end', // Căn toàn bộ số tiền và thời gian dạt thẳng về mép bên phải



    },

    // Style Kiểu dáng chung cho số tiền
    amountText: {
        fontSize: 16,
        fontWeight: '700',  // In đậm
        marginBottom: 4,    // Cách dòng giờ bên dưới 4px

    },

    // Style Màu đỏ riêng cho tiền chi tiêu 
    expenseAmount: {
        color: '#FD3C4A',   // Màu đỏ tươi biểu thị tiền bị trừ đi (- $120)

    },

    //Style Dòng hiển thị giờ 
    timeText: {
        fontSize: 13,
        color: '#A0A0A0', // 👈 Xám sáng

    },














})