import TransactionForm from './TransactionForm.jsx';

export default {
  title: 'Giao dịch/TransactionForm',
  component: TransactionForm,

  parameters: {
    layout: 'fullscreen',
  },
};

export const Transfer = {
  args: {
    title: 'Chuyển tiền',
    themeColor: '#7C3AED',
    amountLabel: 'Số tiền chuyển?',
    categories: ['Giữa các tài khoản', 'Chuyển cho người khác'],
    defaultCategory: 'Giữa các tài khoản',
    buttonText: 'Tiếp tục',
  },
};