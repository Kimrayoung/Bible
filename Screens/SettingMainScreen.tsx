import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData, storeData} from '../Component/AsyncStorageItem';

const BibleVerseComponent = () => {
  const [colorModeOpen, setColorModeOpen] = useState(false);
  const [selectedMode, setSelectedColorThemeMode] = useState('');

  const toggleColorMode = () => {
    setColorModeOpen(!colorModeOpen);
  };

  const handleSelectMode = (mode: string) => {
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

  // 로드할 때
  useEffect(() => {
    const loadColorTheme = async () => {
      const theme = await getData('colorTheme');
      console.log('불러온 테마:', theme);
      if (theme) {
        setSelectedColorThemeMode(theme);
      }
    };
    loadColorTheme();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem}>
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
    </View>
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
});

export default BibleVerseComponent;
