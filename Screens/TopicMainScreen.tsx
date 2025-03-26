import React, {useEffect, useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import TopicListItem from '../Component/TopicListItem';
import {TopicListProps} from '../Type/TopicTypes';
import {getApp} from '@react-native-firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';

const TopicMainScreen = () => {
  const [inputSearchData, setInputSearchData] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [searchTopicResult, setSearchTopicResult] = useState<string[] | null>(
    null,
  );
  const [topicList, setTopicList] = useState<string[]>();

  const navigation = useNavigation();

  const toTopicResult = (book: string) => {
    console.log(book);
  };

  const fetchTopics = async () => {
    try {
      const app = getApp();
      const db = getFirestore(app);

      const topicCollection = collection(db, 'Topics');
      const topicDocs = await getDocs(topicCollection);

      if (topicDocs.empty) {
        console.log('해당 책을 찾을 수 없습니다');
      }
      const tempDocsId: string[] = [];
      topicDocs.forEach(doc => {
        tempDocsId.push(doc.id);
      });
      setTopicList(tempDocsId);
    } catch (error) {
      console.log('주제 가져오기 오류: ', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

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
    <TopicListItem item={item} index={index} onPressHandler={toTopicResult} />
  );

  return (
    <View style={styles.container}>
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
        data={topicList}
        renderItem={listItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
