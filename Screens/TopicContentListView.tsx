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
import {useRoute} from '@react-navigation/native';
import {TopicResultProp} from '../Type/TopicNavigationTypes';

const TopicContentListView = () => {
  const route = useRoute<TopicResultProp>();
  const {topic} = route.params || {};
  const [versesData, setVersesData] = useState<TopicComponentProps[]>([]);

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
    <TopicComponentView content={item.content} location={item.location} />
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
