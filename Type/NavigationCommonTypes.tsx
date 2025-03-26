import {CompositeNavigationProp} from '@react-navigation/native';
import {BibleStackNavigationProp} from './BibleNavigationTypes';
import {TopicStackNavigationProp} from './TopicNavigationTypes';

export enum FromScreen {
  topicScreen,
  chapterScreen,
}

export type BibleScreenParams = {
  bookName: string;
  chapterName: string;
  bookFullName: string;
  chapterCount: string;
  verse: string;
  fromScreen: FromScreen;
};

export type RootNavigationProp = CompositeNavigationProp<
  BibleStackNavigationProp,
  TopicStackNavigationProp
>;
