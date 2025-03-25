import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Bible from '../Screens/BibleScreen';
import BibleMainScreen from '../Screens/BibleMainScreen';
import NavigationBackButton from './NavigationBackButton';
import {BibleStackParamList} from '../Type/BibleNavigationTypes';
import ChapterSelectScreen from '../Screens/ChapterSelectScreen';
import BibleLeftRightButtons from './BibleLeftRightButtons';

const Stack = createNativeStackNavigator<BibleStackParamList>();

const BibleStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BibleMainScreen"
        component={BibleMainScreen}
        options={{
          headerShown: true,
          title: '성경',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'BMJUA_otf', fontSize: 20},
        }}
      />
      <Stack.Screen
        name="ChapterSelect"
        component={ChapterSelectScreen}
        options={({route, navigation}) => ({
          // headerShown: true,
          title: route.params.bookFullName,

          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'BMJUA_otf', fontSize: 20},
          headerLeft: () => (
            <NavigationBackButton
              onPressHandle={() => navigation.goBack()}
              imageShown={true}
              navigationText={'성경'}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Bible"
        component={Bible}
        options={({route, navigation}) => ({
          headerShown: true,
          title: `제${route.params.chapterName}장`,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'BMJUA_otf', fontSize: 20},
          // NavigationBackButton 컴포넌트를 사용하여 뒤로가기 기능 구현
          headerLeft: () => (
            <NavigationBackButton
              onPressHandle={() => navigation.goBack()}
              imageShown={false}
              navigationText={route.params.bookFullName}
            />
          ),
          headerRight: () => (
            <BibleLeftRightButtons
              chapterName={route.params.chapterName}
              chapterCount={route.params.chapterCount}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default BibleStack;
