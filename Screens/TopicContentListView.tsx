import React, {useEffect, useState} from 'react';
import TopicComponentView from '../Component/TopicComponentView';
import {FlatList, StyleSheet, View} from 'react-native';
import {TopicComponentProps, TopicProps} from '../Type/TopicTypes';
import {getApp} from '@react-native-firebase/app';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
} from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  TopicResultProp,
  TopicStackNavigationProp,
} from '../Type/TopicNavigationTypes';
import {FromScreen} from '../Type/NavigationCommonTypes';
import {parseBibleVerse} from '../Type/BibleBooks';

const TopicContentListView = () => {
  const navigation = useNavigation<TopicStackNavigationProp>();
  const route = useRoute<TopicResultProp>();
  const {topic} = route.params || {};
  const [versesData, setVersesData] = useState<TopicComponentProps[]>([]);

  const toBible = async (location: string) => {
    console.log('실행중?');
    const parsed = parseBibleVerse(location);
    const chapterCount = await fetchChapters(parsed?.book);
    parsed &&
      chapterCount != null &&
      navigation.navigate('Bible', {
        bookName: parsed.book,
        chapterName: parsed.chapter,
        bookFullName: parsed.bookFullName,
        chapterCount: chapterCount,
        verse: parsed.verse,
        fromScreen: FromScreen.topicScreen,
      });
  };

  const fetchChapters = async (bookName?: string): Promise<string | null> => {
    try {
      console.log('here');
      // Firebase 앱 인스턴스 가져오기
      const app = getApp();
      // Firestore 인스턴스 가져오기
      const db = getFirestore(app);

      // 문서 참조 생성
      const bibleCollection = collection(db, 'Bible');
      const bookDocRef = doc(bibleCollection, bookName);
      const bookDoc = await getDoc(bookDocRef);

      if (!bookDoc.exists) {
        console.log('cant find');
        // setError('해당 책을 찾을 수 없습니다');
        // setLoading(false);
        return null;
      }
      console.log('second');
      const data = bookDoc.data();
      // setLoading(false);
      return String(data.chapterCount);
    } catch (error) {
      console.log('책 정보 가져오기 오류: ', error);
      // setError('책 정보를 가져오는 중 오류가 발생함');
      // setLoading(false);
      return null;
    }
  };

  const fetchTopicContent = async () => {
    try {
      const app = getApp();
      const db = getFirestore(app);

      const topicCollection = collection(db, 'Topics');
      const topicDocRef = doc(topicCollection, topic);
      const topicDoc = await getDoc(topicDocRef);

      if (!topicDoc.exists) {
        console.log('해당 주제에 대한 데이터를 찾을 수 없습니다');
      }

      const data = topicDoc.data();
      const verses = data.verses.map(v => ({
        content: v['말씀내용'],
        location: v['성경위치'],
      }));
      setVersesData(verses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopicContent();
    console.log(versesData);
  }, []);

  const contentItem = ({item}: {item: TopicComponentProps}) => (
    <TopicComponentView
      content={item.content}
      location={item.location}
      onPressHandler={() => toBible(item.location)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={versesData}
        renderItem={contentItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatListStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListStyle: {
    paddingHorizontal: 20,
  },
});

export default TopicContentListView;
