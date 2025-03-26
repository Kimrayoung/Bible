import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type TopicStackParamList = {
  TopicMainScreen: undefined;
  TopicContentListView: {
    topic: string;
  };
  Bible: {
    bookName: string;
    chapterName: string;
    bookFullName: string;
    chapterCount: string;
  };
};

export type TopicStackNativationProp =
  NativeStackNavigationProp<TopicStackParamList>;

export type TopicResultProp = RouteProp<
  TopicStackParamList,
  'TopicContentListView'
>;
export type Bible = RouteProp<TopicStackParamList, 'Bible'>;
