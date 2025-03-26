import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TopicListItemProps} from '../Type/TopicTypes';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const TopicListItem = ({item, index, onPressHandler}: TopicListItemProps) => {
  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        key={index}
        onPress={() => onPressHandler(item)}
        style={styles.buttonStyle}>
        <Text style={styles.topicText}>{item}</Text>
        <FontAwesome5 name="angle-right" iconStyle="solid" size={20} />
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
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  topicText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 26,
  },
});

export default TopicListItem;
