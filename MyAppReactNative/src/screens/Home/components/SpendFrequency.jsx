import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../../../theme/color.jsx';

export default function SpendFrequency() {
  // 1. Quản lý tab đang chọn (Mặc định chọn 'Today')
  const [activeTab, setActiveTab] = useState('Today');
  
  // 4 mốc thời gian theo đúng ảnh thiết kế
  const tabs = ['Today', 'Week', 'Month', 'Year'];

  return (
    <View style={styles.container}>
      
      {/* 2. THANH TIÊU ĐỀ */}
      <Text style={styles.title}>Spend Frequency</Text>

      {/* 3. BIỂU ĐỒ SÓNG UỐN LƯỢN (SVG) */}
      <View style={styles.chartContainer}>
        <Svg height="140" width="100%" viewBox="0 0 320 140">
          <Defs>
            {/* Hiệu ứng màu tím đổ mờ nhạt dần xuống đáy */}
            <LinearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#7C3AED" stopOpacity="0.3" />
              <Stop offset="1" stopColor="#7C3AED" stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Vùng màu tím mờ đổ bóng bên dưới chân sóng */}
          <Path
            d="M 0,95 C 40,85 55,120 70,120 C 85,120 95,75 120,75 C 145,75 160,110 185,85 C 215,50 225,10 245,10 C 265,10 280,75 320,80 L 320,140 L 0,140 Z"
            fill="url(#purpleGradient)"
          />

          {/* Đường sóng viền tím uốn lượn chính */}
          <Path
            d="M 0,95 C 40,85 55,120 70,120 C 85,120 95,75 120,75 C 145,75 160,110 185,85 C 215,50 225,10 245,10 C 265,10 280,75 320,80"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* 4. THANH BỘ LỌC THỜI GIAN (Pills Filter) */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </View>
  );
}

// 5. BỘ STYLESHEET CHUẨN GIAO DIỆN SÁNG
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Nền màu trắng như ảnh thiết kế
    borderRadius: 24,           // Bo tròn 4 góc Container-2
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginTop: 16,              // Cách Container-1 bên trên 16px
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D0E0F',
    marginBottom: 8,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Dàn đều 4 nút sang 2 bên
    alignItems: 'center',
    marginTop: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,           // Bo tròn hình viên thuốc (pill)
  },
  activeTabButton: {
    backgroundColor: '#FCEED4', // Nền vàng kem khi đang chọn
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#91919F',          // Chữ xám khi chưa chọn
  },
  activeTabText: {
    color: '#FCAC12',          // Chữ vàng cam in đậm khi được chọn
    fontWeight: '700',
  },
});
