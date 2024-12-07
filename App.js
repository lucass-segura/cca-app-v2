import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";

import { Main } from './components/Main';

export default function App() {

  const [fontsLoaded] = useFonts({
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'MarkaziText-Bold': require('./assets/fonts/MarkaziText-Bold.ttf'),
    'MarkaziText-SemiBold': require('./assets/fonts/MarkaziText-SemiBold.ttf'),
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <StatusBar style="dark" />
        <Main />
      </View>
    </SafeAreaView>
  );
}
