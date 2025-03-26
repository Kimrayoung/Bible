import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopicMainScreen from '../Screens/TopicMainScreen';
import {TopicStackParamList} from '../Type/TopicNavigationTypes';
import TopicContentListView from '../Screens/TopicContentListView';
import NavigationBackButton from './NavigationBackButton';

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
    </Stack.Navigator>
  );
};

export default TopicStack;
