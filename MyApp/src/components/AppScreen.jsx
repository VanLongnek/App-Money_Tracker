// Import các component có sẵn của React Native 

import {ScrollView , View , StyleSheet} from "react-native";

// Import SafeAreaView để đảm bảo giúp nội dung không bị che bởi tai thỏ / thanh trạng thái

import {SafeAreaView} from "react-native-safe-area-context";

// Import màu sắc và khoảng cách đã định nghĩa sẵn trong theme 

import {colors , spacing} from "../theme/tokens";

/// Component AppScreen để tạo khung màng hình dùng chung - children là nội dung bên trong 

export function AppScreen({children}){
  return (
    // edge={["top"]} : chỉ chừa khoảng an toàn ở phía trên, các cạnh khác vẫn có thể bị che bởi tai thỏ / thanh trạng thái
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn dọc
      >
        {/* Bọc nội dung để thêm padding xung quanh */}
        <View style={styles.content}>{children}</View>


      </ScrollView>
    </SafeAreaView>
  );


}


// Định nghĩa  style tập trung một chỗ , dễ sửa

const styles = StyleSheet.create({
  screen: {
    flex:1 , // chiếm toàn bộ chiều cao màn hình
    backgroundColor: colors.background,

  },

  scrollArea : {
    flex:1, // vùng cuộn lấp đầy phần còn lại
  },

  content : {
    paddingHorizontal: spacing.md, // padding ngang
    paddingBottom: spacing.lg, // padding dưới
  },
});