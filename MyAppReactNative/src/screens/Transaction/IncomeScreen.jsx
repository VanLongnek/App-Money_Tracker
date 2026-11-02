import TransactionForm from './components/TransactionForm.jsx';
import { useNavigation } from '@react-navigation/native';
const incomeCategories = [
  'Tiền lương',
  'Tiền thưởng',
  'Đầu tư',
  'Thu nhập khác',
];


export default function IncomeScreen() {
  const navigation = useNavigation();
  return (
    <TransactionForm
      navigation={navigation}
      title="Thu Nhập (Income)"
      themeColor="#00A86B"
      amountLabel="Số tiền nhận được?"
      categories={incomeCategories}
      defaultCategory="Tiền lương"
      buttonText="Xác nhận thu nhập"
    />
  );
}
