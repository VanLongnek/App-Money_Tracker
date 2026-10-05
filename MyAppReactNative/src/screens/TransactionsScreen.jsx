import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/color.jsx';

const transactions = [
    {
    id: '1',
    title: 'Ăn sáng',
    category: 'Ăn uống',
    amount: '-30.000 đ',
    type: 'expense',
  },
  {
    id: '2',
    title: 'Đổ xăng',
    category: 'Di chuyển',
    amount: '-100.000 đ',
    type: 'expense',
  },
  {
    id: '3',
    title: 'Tiền lương',
    category: 'Thu nhập',
    amount: '+8.000.000 đ',
    type: 'income',
  },
];



function TransactionItem({transaction}) {
  const amountColor =
    transaction.type === 'income' ? colors.primary : colors.textMuted;

  return (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionTitle}>
          {transaction.title}
        </Text>

        <Text style={styles.transactionCategory}>
          {transaction.category}
        </Text>
      </View>

      <Text style={[styles.transactionAmount, {color: amountColor}]}>
        {transaction.amount}
      </Text>
    </View>
  );
}

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Giao dịch gần đây</Text>

      <FlatList
        data={transactions}
        keyExtractor={transaction => transaction.id}
        renderItem={({item}) => (
          <TransactionItem transaction={item} />
        )}
        contentContainerStyle={styles.transactionList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },

  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  transactionList: {
    gap: 12,
  },

  transactionItem: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  transactionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },

  transactionCategory: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


