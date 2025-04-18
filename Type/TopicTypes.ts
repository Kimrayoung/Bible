import {ParsedBibleVerse} from './BibleBooks';

export interface TopicListItemProps {
  item: string;
  index: number;
  onPressHandler: (topic: string) => void;
}

export interface TopicListProps {
  listName: string;
}

export interface TopicProps {
  topicName: string;
  verses: {content: string; location: string}[];
}

export interface TopicComponentProps {
  location: string;
  content: string;
  onPressHandler: (location: string) => void;
}
