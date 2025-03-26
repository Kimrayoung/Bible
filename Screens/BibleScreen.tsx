import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BibleStackParamList} from '../Type/BibleNavigationTypes';
import {getApp} from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from '@react-native-firebase/firestore';
import {ChapterData, VerseDate} from '../Type/BibleTypes';
import {FromScreen} from '../Type/NavigationCommonTypes';
import {TopicStackParamList} from '../Type/TopicNavigationTypes';

type BibleScreenRoutePropUnion =
  | RouteProp<BibleStackParamList, 'Bible'>
  | RouteProp<TopicStackParamList, 'Bible'>;

const Bible = () => {
  const route = useRoute<BibleScreenRoutePropUnion>();
  const {bookName, chapterName, chapterCount, verse, fromScreen} =
    route.params || {};
  const [verses, setVerses] = useState<VerseDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchBibleVerses = async () => {
      try {
        // 가져오려는 데이터 정보
        const book = bookName; // 성경책 (창세기)
        const chapter = chapterName; // 장

        const app = getApp();
        // Firestore 인스턴스 가져오기
        const db = getFirestore(app);

        // 문서 참조 생성
        const bibleCollection = collection(db, 'Bible');
        const bookDocRef = doc(bibleCollection, book);
        const chaptersCollection = collection(bookDocRef, 'chapters');
        const chapterDocRef = doc(chaptersCollection, chapter);
        const chapterDoc = await getDoc(chapterDocRef);

        if (!chapterDoc.exists) {
          console.log('??');
          setError('해당 장을 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        const chapterData = chapterDoc.data() as ChapterData;
        const selectedVerses: VerseDate[] = [];

        // verses 필드에 있는 모든 절 추출
        if (chapterData.verses) {
          // 모든 절 번호를 가져와서 정렬
          const verseNumbers = Object.keys(chapterData.verses).sort(
            (a, b) => parseInt(a) - parseInt(b),
          );

          // 정렬된 순서대로 절 데이터 추가
          verseNumbers.forEach(verseNumber => {
            selectedVerses.push({
              verse: verseNumber,
              text: chapterData.verses[verseNumber],
            });
          });
        }

        setVerses(selectedVerses);
        setLoading(false);
      } catch (err) {
        console.error('성경 구절 가져오기 오류:', err);
        setError('성경 구절을 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchBibleVerses();
  }, [chapterName]);

  useEffect(() => {
    if (
      isLayoutReady &&
      fromScreen !== FromScreen.chapterScreen &&
      !loading &&
      verse &&
      flatListRef.current
    ) {
      // 해당 절(verse)의 인덱스 찾기
      const verseIndex = verses.findIndex(item => item.verse === verse);
      console.log('verseIndex', verseIndex);
      if (verseIndex !== -1) {
        // 약간의 지연 후 스크롤 실행 (데이터 렌더링 후 스크롤이 작동하도록)
        setTimeout(() => {
          flatListRef.current.scrollToIndex({
            index: verseIndex,
            animated: true,
            viewOffset: 50, // 상단에서 약간 여백을 두고 위치하도록
          });
        }, 500);
      }
    }
  }, [isLayoutReady]);

  const renderVerse = ({item}: {item: VerseDate}) => {
    const isHighlighted = item.verse === verse;

    return (
      <View
        style={[
          styles.verseContainer,
          isHighlighted && styles.highlightedVerse,
        ]}>
        <Text style={styles.verseNumber}>{item.verse}</Text>
        <Text style={styles.verseText}>{item.text}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>성경 구절을 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        onLayout={() => setIsLayoutReady(true)}
        data={verses}
        keyExtractor={item => `${item.verse}`}
        renderItem={renderVerse}
        // onScrollToIndexFailed={handleScrollToIndexFailed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  verseNumber: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  highlightedVerse: {
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
  },
});

export default Bible;
