/* eslint-disable */
import * as React from 'react';
import { Text } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';
import GeneralFAQPage from './GeneralFAQPage';
import HomeScreen from './HomeScreen';
import Login from './Login';

const MusicRoute = () => <Text>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNavigationMenu = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'faq', title: 'FAQ', focusedIcon: 'help-circle', unfocusedIcon: 'help-circle'},

    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    faq: GeneralFAQPage,
    recents: Login,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationMenu;
