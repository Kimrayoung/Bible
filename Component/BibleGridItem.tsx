import React from 'react';
import {StyleSheet, View} from 'react-native';
import BibleButton from './BibleButton';
import {BibleGridItemProps} from '../Type/BibleTypes';

const BibleGridItem = ({
  item,
  index,
  numColumns,
  itemWidth,
  spacing,
  onPressHandler,
}: BibleGridItemProps) => {
  // 같은 행에서의 위치 계산
  const isLastInRow = index % numColumns === numColumns - 1;

  return (
    <View
      style={[
        styles.item,
        {
          width: itemWidth,
          height: itemWidth * 0.7,
          marginRight: isLastInRow ? 0 : spacing,
          marginBottom: spacing,
        },
      ]}>
      <BibleButton bible={item} id={index} onPressHandle={onPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#DBDBE2',
  },
});

export default BibleGridItem;
