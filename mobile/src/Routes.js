import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          headerTitleAlign: 'center',
          title: 'FindDev',
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          headerTitleAlign: 'center',
          title: 'Perfil do github',
        },
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#7D40E7',
        },
        headerBackTitleVisible: false,
      },
    },
  ),
);

export default Routes;

