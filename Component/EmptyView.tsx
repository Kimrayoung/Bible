import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EmptyView = (text: string) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>찾으시는 {text}가 없습니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 26,
  },
});

export default EmptyView;
