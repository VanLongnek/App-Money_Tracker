import TransactionForm from './components/TransactionForm.jsx';
import { useNavigation } from '@react-navigation/native';

const expenseCategories = [
  'Ăn uống',
  'Mua sắm',
  'Di chuyển',
  'Hóa đơn điện nước',
  'Giải trí',
  'Sức khỏe',
];

export default function ExpenseScreen() {

    const navigation = useNavigation();


  return (
    <TransactionForm
      navigation={navigation}
      title="Chi Tiêu (Expense)"
      themeColor="#FD3C4A"
      amountLabel="Số tiền cần chi?"
      categories={expenseCategories}
      defaultCategory="Mua sắm"
      buttonText="Xác nhận chi tiêu"
    />
  );
}
