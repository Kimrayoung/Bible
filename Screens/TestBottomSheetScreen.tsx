import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const App = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('Bottom sheet index:', index);
  }, []);

  const openSheet = () => {
    bottomSheetRef.current?.snapToIndex(2); // 0 = 25%, 1 = 50%, 2 = 90%
  };

  const closeSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="바텀 시트 열기" onPress={openSheet} />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // 초기에는 닫혀 있음
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.sheetText}>바텀 시트입니다 🎉</Text>
          <Button title="닫기" onPress={closeSheet} />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  sheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
