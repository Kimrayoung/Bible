import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {BibleButtonProps} from '../Type/BibleTypes';

const BibleButton = ({bible, onPressHandle, id}: BibleButtonProps) => {
  return (
    <TouchableOpacity key={id} onPress={() => onPressHandle(bible)}>
      <Text>{bible}</Text>
    </TouchableOpacity>
  );
};

export default BibleButton;
