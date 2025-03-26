import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TopicComponentProps} from '../Type/TopicTypes';
import {parseBibleVerse} from '../Type/BibleBooks';

const TopicComponentView = ({
  location,
  content,
  onPressHandler,
}: TopicComponentProps) => {
  return (
    <View style={styles.containter}>
      <TouchableOpacity onPress={() => onPressHandler(location)}>
        <Text style={styles.contentText}>{content}</Text>
        <Text style={styles.locationText}>{location}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 13,
    paddingVertical: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
    marginVertical: 12,
  },
  contentText: {
    fontSize: 21,
    textAlign: 'left',
    marginBottom: 20,
  },
  locationText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 22,
    color: '#4973A4',
    alignSelf: 'flex-end',
  },
});

export default TopicComponentView;
