import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import {getApp} from '@react-native-firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from '@react-native-firebase/firestore';
import {
  BibleChapterSelectRouteProp,
  BibleStackNavigationProp,
} from '../Type/BibleNavigationTypes';
import {FromScreen} from '../Type/NavigationCommonTypes';

// 화면 너비 가져오기
const {width} = Dimensions.get('window');
// 한 줄에 들어갈 수 있는 버튼 개수(width - 양쪽 패딩) / (버튼 크기 + 버튼 마진)
const buttonsPerRow = Math.floor((width - 40) / 80);
// 한 줄에 표시할 아이템 수
const numColumns = buttonsPerRow;

const ChapterSelectScreen = () => {
  const navigation = useNavigation<BibleStackNavigationProp>();
  const route = useRoute<BibleChapterSelectRouteProp>();
  const {bookName, bookFullName} = route.params || {};
  const [chapterCount, setChapterCount] = useState<number>(13);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toBible = (chapter: string) => {
    navigation.navigate('Bible', {
      bookName: bookName,
      chapterName: chapter,
      bookFullName: bookFullName,
      chapterCount: String(chapterCount),
      verse: '1',
      fromScreen: FromScreen.chapterScreen,
    });
  };

  const fetchChapters = async () => {
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
        setError('해당 책을 찾을 수 없습니다');
        setLoading(false);
        return;
      }
      console.log('second');
      const data = bookDoc.data();
      setChapterCount(data.chapterCount);
      setLoading(false);
      console.log(chapterCount);
    } catch (error) {
      console.log('책 정보 가져오기 오류: ', error);
      setError('책 정보를 가져오는 중 오류가 발생함');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  // FlatList에 데이터 생성
  const chapterData = [...Array(chapterCount)].map((_, index) => ({
    id: String(index + 1),
    chapter: index + 1,
  }));

  // 아이템 렌더링 함수
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => toBible(String(item.chapter))}
      style={styles.buttonContainer}>
      <Text style={styles.buttonStyle}>{item.chapter}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chapterData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    // justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'flex-start', // 중앙 정렬
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 12,
  },
  buttonStyle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 32,
  },
});

export default ChapterSelectScreen;
