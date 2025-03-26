import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopicMainScreen from '../Screens/TopicMainScreen';
import {TopicStackParamList} from '../Type/TopicNavigationTypes';
import TopicContentListView from '../Screens/TopicContentListView';
import NavigationBackButton from './NavigationBackButton';
import BibleLeftRightButtons from './BibleLeftRightButtons';
import Bible from '../Screens/BibleScreen';

const Stack = createNativeStackNavigator<TopicStackParamList>();

const TopicStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopicMainScreen"
        component={TopicMainScreen}
        options={{
          headerShown: true,
          title: '주제별 말씀',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'BMJUA_otf', fontSize: 20},
        }}
      />
      <Stack.Screen
        name="TopicContentListView"
        component={TopicContentListView}
        options={({route, navigation}) => ({
          headerShown: true,
          title: `${route.params.topic}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {fontFamily: 'BMJUA_otf', fontSize: 20},
          headerLeft: () => (
            <NavigationBackButton
              onPressHandle={() => navigation.goBack()}
              imageShown={true}
              navigationText={'주제'}
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

export default TopicStack;
