/* eslint-disable */
import * as React from 'react';
import { Text } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';
import GeneralFAQPage from './GeneralFAQPage';
import HomeScreen from './HomeScreen';
import Login from './Login';
import ChatBotPage from './ChatBotPage';
import JoinForm from './JoinForm';
import VideoChatRoomProvider from './VideoChatRoomProvider';

const MusicRoute = () => <Text>Music</Text>;
const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

const BottomNavigationMenu = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'faq', title: 'FAQ', focusedIcon: 'help-circle', unfocusedIcon: 'help-circle'},

    { key: 'recents', title: 'Log-In Page', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'chatBot', title: 'ChatBot', focusedIcon: 'chat', unfocusedIcon: 'chat-outline'},
    { key: 'videoChat', title: 'Video Chat', focusedIcon: 'video',unfocusedIcon: 'video-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    faq: GeneralFAQPage,
    recents: Login,
    notifications: NotificationsRoute,
    chatBot: ChatBotPage,
    videoChat: VideoChatRoomProvider,
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
