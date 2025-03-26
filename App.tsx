import React from 'react';
import {
  NavigationContainer,
  useNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Sample from './Screens/Sample';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import BibleStack from './Component/BibleStack';
import TopicMainScreen from './Screens/TopicMainScreen';
import TopicStack from './Component/TopicStack';

const Tab = createBottomTabNavigator();

// NavigationContainer 외부에서는 useNavigationState를 사용할 수 없습니다
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// NavigationContainer 내부에서 사용할 컴포넌트를 분리합니다
const TabNavigator = () => {
  // 여기서 useNavigationState 훅을 사용합니다
  const navigationState = useNavigationState(state => state);

  const getNestedRouteName = state => {
    if (!state) {
      return null;
    }
    const route = state.routes[state.index];
    if (route.state) {
      return getNestedRouteName(route.state);
    }
    return route.name;
  };

  const currentRouteName = getNestedRouteName(navigationState);
  const hideTabBarScreens = ['Bible', 'ChapterSelect']; // 여기에 탭 바를 숨기고 싶은 화면 이름을 추가하세요.

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: hideTabBarScreens.includes(currentRouteName)
            ? 'none'
            : 'flex',
        },
      }}>
      <Tab.Screen
        name="Bible"
        component={BibleStack}
        options={{
          title: '성경',
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome5
                name="bible"
                iconStyle="solid"
                size={16}
                color={focused ? '#4973A4' : 'a0a0a0'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Topic"
        component={TopicStack}
        options={{
          title: '주제별 말씀',
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome5
                name="folder-open"
                iconStyle="solid"
                size={16}
                color={focused ? '#4973A4' : 'a0a0a0'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Sample"
        component={Sample}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome5
                name="user-alt"
                iconStyle="solid"
                color={focused ? '#4973A4' : 'a0a0a0'}
                size={16}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
