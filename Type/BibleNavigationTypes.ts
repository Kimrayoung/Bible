import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {BibleScreenParams} from './NavigationCommonTypes';

// 스택 파라미터 타입 정의
// 네비게이션 스택에 있는 각 화면과 그 화면으로 이동할 때 필요한 파라미터 정의
export type BibleStackParamList = {
  BibleMainScreen: undefined;
  ChapterSelect: {
    bookName: string;
    bookFullName: string;
  };
  Bible: BibleScreenParams;
};

// 네비게이션 Props 타입(즉, 전체 네비게이션에 전달할 내용)
// 네비게이션 객체 타입 정의
// useNavigation 훅을 사용할 떄 이 타입을 지정하면, 타입스크립트가 올바른 파라미터를 전달했는지 확인
export type BibleStackNavigationProp =
  NativeStackNavigationProp<BibleStackParamList>;

// 각 화면별 Route Props 타입
// 이 타입들은 각 화면에서 useRoute훅을 통해 전달받은 파라미터에 접근할 떄 사용함
export type BibleChapterSelectRouteProp = RouteProp<
  BibleStackParamList,
  'ChapterSelect'
>;
export type BibleScreenRouteProp = RouteProp<BibleStackParamList, 'Bible'>;
export type BibleMainScreenRouteProp = RouteProp<
  BibleStackParamList,
  'BibleMainScreen'
>;

/*
1. 각 화면별로 필요한 데이터들 정의
2. useNavigation훅에서 올바른 파라미터 전달했는지 확인하기 위한 Props정의
3. 각 화면별 데이터에 접근하기 위한 props정의
*/
