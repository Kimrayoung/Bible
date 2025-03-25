import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const BibleVerseComponent = () => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBibleVerses = async () => {
      try {
        // 가져오려는 데이터 정보
        const book = '창'; // 성경책 (창세기)
        const chapter = '1'; // 장

        // Firestore에서 chapters 컬렉션 내의 장 문서 가져오기
        const chapterDoc = await firestore()
          .collection('biblesample')
          .doc(book)
          .collection('chapters')
          .doc(chapter)
          .get();

        if (!chapterDoc.exists) {
          setError('해당 장을 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        const chapterData = chapterDoc.data();
        const selectedVerses = [];

        // verses 필드에 있는 모든 절 추출
        if (chapterData.verses) {
          // 모든 절 번호를 가져와서 정렬
          const verseNumbers = Object.keys(chapterData.verses).sort(
            (a, b) => parseInt(a) - parseInt(b),
          );

          // 정렬된 순서대로 절 데이터 추가
          verseNumbers.forEach(verseNumber => {
            selectedVerses.push({
              book,
              chapter,
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
  }, []);

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
      {verses.length > 0 ? (
        verses.map(item => (
          <View
            key={`${item.book}${item.chapter}:${item.verse}`}
            style={styles.verseContainer}>
            <Text style={styles.verseNumber}>{item.verse}</Text>
            <Text style={styles.verseText}>{item.text}</Text>
          </View>
        ))
      ) : (
        <Text>해당 범위의 구절이 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
});

export default BibleVerseComponent;
