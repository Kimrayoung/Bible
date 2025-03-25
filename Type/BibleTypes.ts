export interface BibleButtonProps {
  bible: string;
  onPressHandle: (book: string) => void;
  id: number;
}

export interface BibleGridItemProps {
  item: string;
  index: number;
  numColumns: number;
  itemWidth: number;
  spacing: number;
  onPressHandler: (book: string) => void;
}

export interface BibleListItemProps {
  item: string;
  index: number;
  onPressHandler: (book: string) => void;
}

export interface VerseDate {
  verse: string;
  text: string;
}

export interface ChapterData {
  verses: {
    [verseNumber: string]: string;
  };
  verseCount: number;
}
