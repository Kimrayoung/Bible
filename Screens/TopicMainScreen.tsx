import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
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
import EmptyView from '../Component/EmptyView';
import {TopicStackNativationProp} from '../Type/TopicNavigationTypes';

const TopicMainScreen = () => {
  const [inputSearchData, setInputSearchData] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [topicList, setTopicList] = useState<string[]>();
  const [searchResult, setSearchResult] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const navigation = useNavigation<TopicStackNativationProp>();

  const toTopicResult = (topic: string) => {
    navigation.navigate('TopicContentListView', {
      topic: topic,
    });
  };

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const app = getApp();
      const db = getFirestore(app);

      const topicCollection = collection(db, 'Topics');
      const topicDocs = await getDocs(topicCollection);

      if (topicDocs.empty) {
        console.log('해당 책을 찾을 수 없습니다');
        setIsLoading(false);
        return;
      }
      const tempDocsId: string[] = [];
      topicDocs.forEach(doc => {
        tempDocsId.push(doc.id);
      });
      setTopicList(tempDocsId);
      setIsLoading(false);
    } catch (error) {
      console.log('주제 가져오기 오류: ', error);
    }
  };

  const searchTopics = () => {
    if (!inputSearchData) {
      fetchTopics();
      return;
    }
    const filterResult =
      topicList?.filter(topic => topic.includes(inputSearchData)) ?? [];
    console.log('filterResult: ', filterResult, inputSearchData);
    setSearchResult(filterResult);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    searchTopics();
  }, [inputSearchData]);

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
    <TopicListItem
      item={item}
      index={index}
      onPressHandler={() => toTopicResult(item)}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingErrorText}>성경 구절을 불러오는 중...</Text>
      </View>
    );
  }

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
        data={inputSearchData ? searchResult : topicList}
        renderItem={listItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyView('주제')}
        contentContainerStyle={{flex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingErrorText: {
    fontFamily: 'BMJUA_otf',
    fontSize: 26,
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
