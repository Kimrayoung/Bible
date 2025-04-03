import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, storeData} from '../Component/AsyncStorageItem';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const SettingMainScreen = () => {
  const [colorModeOpen, setColorModeOpen] = useState(false);
  const [selectedMode, setSelectedColorThemeMode] = useState('');
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['100%'], []);

  // Bottom Sheet 열기 핸들러 - Fixed to call with an index parameter
  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(0); // 0 = 25%, 1 = 50%, 2 = 90%
  };

  // Bottom Sheet 닫기 핸들러
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const toggleColorMode = () => {
    setColorModeOpen(!colorModeOpen);
  };

  const handleSelectMode = mode => {
    setSelectedColorThemeMode(mode);
    setColorModeOpen(false);
  };

  useEffect(() => {
    const loadColorTheme = async () => {
      const savedTheme = await getData('colorTheme');
      if (savedTheme) {
        setSelectedColorThemeMode(savedTheme);
      } else {
        setSelectedColorThemeMode('default'); // 저장된 값이 없을 때만 default 설정
      }
    };
    loadColorTheme();
  }, []);

  // 두 번째로 실행할 useEffect - 데이터 저장
  useEffect(() => {
    // 초기 로드가 아닐 때만 저장 (빈 문자열이 아닐 때)
    if (selectedMode !== '') {
      const saveTheme = async () => {
        console.log('저장:', selectedMode);
        await storeData('colorTheme', selectedMode);
      };
      saveTheme();
    }
  }, [selectedMode]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={openSheet}>
        <Text style={styles.menuText}>글씨크기</Text>
        <FontAwesome5
          name="angle-right"
          iconStyle="solid"
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.menuItem} onPress={toggleColorMode}>
          <Text style={styles.menuText}>색상모드</Text>
          <View style={styles.colorTextContainer}>
            <Text style={styles.colorSelectedText}>
              {selectedMode === 'default'
                ? '기기 설정'
                : selectedMode === 'light'
                ? '라이트 모드'
                : '다크 모드'}
            </Text>
            <FontAwesome5
              name={colorModeOpen ? 'angle-down' : 'angle-right'}
              iconStyle="solid"
              size={20}
              color="#000"
            />
          </View>
        </TouchableOpacity>

        {colorModeOpen && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                selectedMode === 'default' && styles.selectedItem,
              ]}
              onPress={() => handleSelectMode('default')}>
              <Text style={styles.dropdownText}>기기설정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                selectedMode === 'light' && styles.selectedItem,
              ]}
              onPress={() => handleSelectMode('light')}>
              <Text style={styles.dropdownText}>라이트 모드</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                selectedMode === 'dark' && styles.selectedItem,
              ]}
              onPress={() => handleSelectMode('dark')}>
              <Text style={styles.dropdownText}>다크 모드</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // 초기에는 닫혀 있음
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{zIndex: 9999}}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>바텀 시트입니다 🎉</Text>
          <Button title="닫기" onPress={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDEE',
  },
  menuText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 23,
    color: '#000',
  },
  colorTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSelectedText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 15,
    marginRight: 10,
  },
  dropdownContainer: {
    width: 250,
    position: 'absolute',
    top: 55,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDEDEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDEE',
  },
  selectedItem: {
    backgroundColor: '#e1dbdb',
  },
  dropdownText: {
    fontSize: 18,
    color: '#333',
  },
  // New styles for BottomSheet content
  bottomSheetContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomSheetTitle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 24,
    marginBottom: 30,
    color: '#000',
  },
  fontSizeOptions: {
    width: '100%',
    marginBottom: 30,
  },
  fontSizeOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDEE',
    alignItems: 'center',
  },
  fontSizeText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 20,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 18,
    color: 'white',
  },
});

export default SettingMainScreen;
