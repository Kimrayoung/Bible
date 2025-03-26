import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopicMainScreen from '../Screens/TopicMainScreen';
import {TopicStackParamList} from '../Type/TopicNavigationTypes';

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
    </Stack.Navigator>
  );
};

export default TopicStack;
