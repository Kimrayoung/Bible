import React, {useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import searchImage from '../assets/images/search.png';
import x_mark from '../assets/images/x_mark.png';
import BibleListItem from '../Component/ListItem';
import {useNavigation} from '@react-navigation/native';

const TopicMainScreen = () => {
  const [inputSearchData, setInputSearchData] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [searchTopicResult, setSearchTopicResult] = useState<string[] | null>(
    null,
  );
  const navigation = useNavigation();

  const toTopicResult = (book: string) => {
    console.log(book);
  };

  const SearchBtn = () => (
    <TouchableOpacity>
      <Image
        source={searchImage}
        resizeMode="contain"
        style={styles.searchBtnStyle}
      />
    </TouchableOpacity>
  );

  const listItem = ({item, index}: {item: string; index: number}) => (
    <BibleListItem item={item} index={index} onPressHandler={toTopicResult} />
  );

  return (
    <View>
      <View style={styles.inputContainerStyle}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInputStyle}
            ref={inputRef}
            placeholder="주제를 입력해주세요"
            value={inputSearchData}
            onChangeText={text => {
              setInputSearchData(text.trim());
            }}
            autoCorrect={false}
            // 입력 포커스 유지를 위한 추가 속성들
            clearButtonMode="while-editing"
            returnKeyType="search"
            enablesReturnKeyAutomatically
          />
          {inputSearchData.length > 0 && (
            <TouchableOpacity
              onPress={() => setInputSearchData('')}
              style={styles.clearButton}>
              <Image source={x_mark} style={styles.clearImage} />
            </TouchableOpacity>
          )}
        </View>
        <SearchBtn />
      </View>
      <FlatList
        data={['1', '2', '3', '4']}
        renderItem={listItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginLeft: 12,
    marginRight: 13,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    height: 55,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingRight: 40, // X 버튼 공간 확보
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearImage: {
    width: 25,
    height: 25,
  },
  searchBtnStyle: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
});

export default TopicMainScreen;
