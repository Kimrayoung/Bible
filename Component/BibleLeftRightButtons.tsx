import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import {useNavigation} from '@react-navigation/native'; // useNavigation을 추가

interface BibleLeftRightButtonsProps {
  chapterName: string;
  chapterCount: string;
}

const BibleLeftRightButtons: React.FC<BibleLeftRightButtonsProps> = ({
  chapterName,
  chapterCount,
}) => {
  const navigation = useNavigation(); // navigation 객체 사용

  const goToPreviousChapter = () => {
    if (Number(chapterName) > 1) {
      navigation.setParams({
        chapterName: (Number(chapterName) - 1).toString(), // 이전 장으로 이동
      });
    }
  };

  const goToNextChapter = () => {
    if (Number(chapterName) < Number(chapterCount)) {
      navigation.setParams({
        chapterName: (Number(chapterName) + 1).toString(), // 다음 장으로 이동
      });
    }
  };

  return (
    <View style={styles.navigationContainerStyle}>
      <TouchableOpacity
        disabled={chapterName === '1'}
        style={styles.leftbuttonStyle}
        onPress={goToPreviousChapter}>
        <FontAwesome5
          name="angle-left"
          iconStyle="solid"
          size={30}
          color={chapterName === '1' ? '#BEB7B7' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={chapterName === chapterCount}
        style={styles.rightbuttonStyle}
        onPress={goToNextChapter}>
        <FontAwesome5
          name="angle-right"
          iconStyle="solid"
          size={30}
          color={chapterName === chapterCount ? '#BEB7B7' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainerStyle: {
    flexDirection: 'row',
    width: 80,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftbuttonStyle: {
    width: 20,
    height: 30,
  },
  rightbuttonStyle: {
    width: 20,
    height: 30,
  },
});

export default BibleLeftRightButtons;
