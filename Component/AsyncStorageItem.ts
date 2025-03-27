// 모듈 임포트
import AsyncStorage from '@react-native-async-storage/async-storage';

// 데이터 저장하기 (문자열)
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('데이터가 저장되었습니다');
  } catch (e) {
    console.error('저장 오류:', e);
  }
};

// 데이터 불러오기 (문자열)
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('불러온 데이터:', value);
      return value;
    }
    console.log('데이터가 없습니다');
    return null;
  } catch (e) {
    console.error('불러오기 오류:', e);
    return null;
  }
};

// 데이터 삭제하기
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('데이터가 삭제되었습니다');
  } catch (e) {
    console.error('삭제 오류:', e);
  }
};

// 모든 키 가져오기
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('모든 키:', keys);
    return keys;
  } catch (e) {
    console.error('키 불러오기 오류:', e);
    return [];
  }
};

// 여러 항목 한번에 저장하기
export const multiSet = async keyValuePairs => {
  try {
    await AsyncStorage.multiSet(keyValuePairs);
    console.log('여러 항목이 저장되었습니다');
  } catch (e) {
    console.error('다중 저장 오류:', e);
  }
};

// 여러 항목 한번에 가져오기
export const multiGet = async (keys: string[]) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    console.log('여러 항목 불러옴:', values);
    return values;
  } catch (e) {
    console.error('다중 불러오기 오류:', e);
    return [];
  }
};

// 특정 패턴의 키를 가진 항목들 모두 삭제하기
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('모든 데이터가 삭제되었습니다');
  } catch (e) {
    console.error('전체 삭제 오류:', e);
  }
};
