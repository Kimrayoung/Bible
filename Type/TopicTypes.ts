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
  verses: [말씀내용: string, 성경위치: string];
}
