import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {BibleScreenParams} from './NavigationCommonTypes';

export type TopicStackParamList = {
  TopicMainScreen: undefined;
  TopicContentListView: {
    topic: string;
  };
  Bible: BibleScreenParams;
};

export type TopicStackNavigationProp =
  NativeStackNavigationProp<TopicStackParamList>;

export type TopicResultProp = RouteProp<
  TopicStackParamList,
  'TopicContentListView'
>;
export type Bible = RouteProp<TopicStackParamList, 'Bible'>;
