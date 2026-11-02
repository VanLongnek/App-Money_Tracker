import TransactionForm from './components/TransactionForm.jsx';
import { useNavigation } from '@react-navigation/native';
const transferCategories = [
  'Giữa các tài khoản',
  'Chuyển cho người khác',
];

export default function TransferScreen() {
  return (
    <TransactionForm
      navigation={navigation}
      title="Chuyển khoản"
      themeColor="#7C3AED"
      amountLabel="Số tiền chuyển?"
      categories={transferCategories}
      defaultCategory="Giữa các tài khoản"
      buttonText="Tiếp tục"
    />
  );
}