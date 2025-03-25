import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BibleListItemProps} from '../Type/BibleTypes';

const ListItem = ({item, index, onPressHandler}: BibleListItemProps) => {
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity key={index} onPress={() => onPressHandler(item)}>
        <Text style={styles.bibleText}>{item}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDEE',
  },
  bibleText: {
    marginHorizontal: 15,
    fontFamily: 'BMJUA_otf',
    fontSize: 18,
  },
});

export default ListItem;
