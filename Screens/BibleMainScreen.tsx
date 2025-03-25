/* eslint-disable react/no-unstable-nested-components */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {BibleStackNavigationProp} from '../Type/BibleNavigationTypes';
import {
  bibleTestaments,
  convertFullNameToAbbreviation,
} from '../Type/BibleBooks';
import BibleGridItem from '../Component/BibleGridItem';
import BibleListItem from '../Component/ListItem';
import searchImage from '../assets/images/search.png';
import x_mark from '../assets/images/x_mark.png';

const numColumns = 4;

// 화면 너비를 가져와서 항목 크기 계산
const screenWidth = Dimensions.get('window').width;
const padding = 20; // 화면 좌우 패딩
const spacing = 10; // 항목 사이 간격

// 각 항목의 너비 계산 (패딩과 간격 고려)
const itemWidth =
  (screenWidth - padding * 2 - spacing * (numColumns - 1)) / numColumns;

const OldBibleButton = React.memo(({isActive, onChange}) => {
  console.log('리렌더링 체크');
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        {
          backgroundColor: isActive ? '#4973A4' : 'white',
          borderColor: '#969696',
          borderWidth: isActive ? 0 : 2,
        },
      ]}
      onPress={onChange}>
      <Text
        style={[
          styles.buttonTextStyle,
          {color: isActive ? 'white' : '#8A8787'},
        ]}>
        구약
      </Text>
    </TouchableOpacity>
  );
});

const BibleMainScreen = () => {
  const [isClickOld, setIsClickOld] = useState<Boolean>(true);
  const [isClickNew, setIsClickNew] = useState<Boolean>(false);
  const [isList, setIsList] = useState<Boolean>(true);
  const [inputSearchData, setInputSearchData] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [searchBibleResult, setSearchBibleResult] = useState<string[] | null>(
    null,
  );

  // 전체 네비게이션의 props를 가지고 온다
  const navigation = useNavigation<BibleStackNavigationProp>();

  const toChapter = (book: string) => {
    const abb = convertFullNameToAbbreviation(book);
    navigation.navigate('ChapterSelect', {
      bookName: abb,
      bookFullName: book,
    });
  };

  const changeIsClickOld = useCallback(() => {
    if (!isClickOld) {
      setIsClickOld(true);
      setIsClickNew(false);
    }
  }, [isClickOld]);

  const changeIsClickNew = () => {
    if (!isClickNew) {
      setIsClickNew(true);
      setIsClickOld(false);
    }
  };

  const isListChange = () => {
    setIsList(prev => !prev);
  };

  useEffect(() => {
    if (!inputSearchData) {
      setSearchBibleResult(null);
      return;
    }
    if (isClickOld) {
      // 구약
      const filterResult = bibleTestaments.oldTestament.fullNames.filter(
        bible => bible.includes(inputSearchData),
      );
      setSearchBibleResult(filterResult);
    } else {
      //신약
      const filterResult = bibleTestaments.newTestament.fullNames.filter(
        bible => bible.includes(inputSearchData),
      );
      setSearchBibleResult(filterResult);
    }
    console.log(searchBibleResult);
  }, [inputSearchData, isClickOld, isList]);

  // const OldBible = React.memo(() => {
  //   console.log('리렌더링 체크');
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.buttonStyle,
  //         {
  //           backgroundColor: isClickOld ? '#4973A4' : 'white',
  //           borderColor: '#969696',
  //           borderWidth: isClickOld ? 0 : 2,
  //         },
  //       ]}
  //       onPress={changeIsClickOld}>
  //       <Text
  //         style={[
  //           styles.buttonTextStyle,
  //           {color: isClickOld ? 'white' : '#8A8787'},
  //         ]}>
  //         구약
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // });

  const NewBible = () => (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        {backgroundColor: isClickNew ? '#4973A4' : 'white'},
        {borderColor: '#969696', borderWidth: isClickNew ? 0 : 2},
      ]}
      onPress={changeIsClickNew}>
      <Text
        style={[
          styles.buttonTextStyle,
          {color: isClickNew ? 'white' : '#8A8787'},
        ]}>
        신약
      </Text>
    </TouchableOpacity>
  );

  const ListOrAbbBtn = () => (
    <TouchableOpacity
      style={styles.isListOrAbbContainer}
      onPress={isListChange}>
      <Text style={styles.isListOrAbbTextStyle}>
        {isList ? '그리드로 보기' : '리스트로 보기'}
      </Text>
    </TouchableOpacity>
  );

  const SearchTextInput = React.memo(({value, onChangeText}) => {
    return (
      <TextInput
        ref={inputRef}
        placeholder="성경"
        value={value}
        onChangeText={onChangeText} // 실시간으로 상태 업데이트
        autoFocus={true} // TextInput에 포커스 자동 설정
        clearButtonMode="while-editing"
        returnKeyType="search"
        enablesReturnKeyAutomatically
      />
    );
  });

  const SearchBtn = () => (
    <TouchableOpacity>
      <Image
        source={searchImage}
        resizeMode="contain"
        style={styles.searchBtnStyle}
      />
    </TouchableOpacity>
  );

  const bibleGridItem = ({item, index}: {item: string; index: number}) => (
    <BibleGridItem
      item={item}
      index={index}
      numColumns={numColumns}
      itemWidth={itemWidth}
      spacing={spacing}
      onPressHandler={toChapter}
    />
  );

  const bibleListItem = ({item, index}: {item: string; index: number}) => (
    <BibleListItem item={item} index={index} onPressHandler={toChapter} />
  );

  return (
    <View style={styles.container}>
      {/* <SearchTextInput
        value={inputSearchData}
        onChangeText={text => setInputSearchData(text.trim())}
      /> */}
      <View style={styles.inputContainerStyle}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInputStyle}
            ref={inputRef}
            placeholder="성경"
            value={inputSearchData}
            onChangeText={text => {
              setInputSearchData(text.trim());
            }}
            autoCorrect={false}
            // 입력 포커스 유지를 위한 추가 속성들
            clearButtonMode="while-editing"
            returnKeyType="search"
            enablesReturnKeyAutomatically
          />
          {inputSearchData.length > 0 && (
            <TouchableOpacity
              onPress={() => setInputSearchData('')}
              style={styles.clearButton}>
              <Image source={x_mark} style={styles.clearImage} />
            </TouchableOpacity>
          )}
        </View>
        <SearchBtn />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.oldOrnewContainerStyle}>
          <OldBibleButton isActive={isClickOld} onChange={changeIsClickOld} />
          <NewBible />
        </View>
        <ListOrAbbBtn />
      </View>
      <FlatList
        key={isList ? 'list' : 'grid'}
        data={
          searchBibleResult
            ? searchBibleResult
            : isClickOld
            ? bibleTestaments.oldTestament.fullNames
            : bibleTestaments.newTestament.fullNames
        }
        renderItem={isList ? bibleListItem : bibleGridItem}
        keyExtractor={(item, index) => index.toString()}
        {...(isList
          ? {} // isList가 true일 때는 아무 것도 안 넣음
          : {
              numColumns: numColumns,
              columnWrapperStyle: styles.containerRow,
            })}
        style={{paddingHorizontal: isList ? 0 : 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  containerRow: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  oldOrnewContainerStyle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
  },
  buttonTextStyle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 20,
  },
  isListOrAbbContainer: {
    justifyContent: 'center',
    marginRight: 20,
  },
  isListOrAbbTextStyle: {
    fontFamily: 'BMJUA_otf',
    fontSize: 16,
  },
  inputContainerStyle: {
    marginLeft: 12,
    marginRight: 13,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    height: 55,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingRight: 40, // X 버튼 공간 확보
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearImage: {
    width: 25,
    height: 25,
  },
  searchBtnStyle: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
});

export default BibleMainScreen;
