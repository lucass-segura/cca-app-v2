import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";

import { Main } from './components/Main';

export default function App() {

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <StatusBar style="dark" />
        <Main />
      </View>
    </SafeAreaView>
  );
}
