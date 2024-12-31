import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";

import { Main } from './components/Main';

export default function App() {
  return (
    <>
      {/* StatusBar fuera del SafeAreaView */}
      <StatusBar style="dark" />
      
      <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
        <View className="flex-1 items-center justify-center">
          <Main />
        </View>
      </SafeAreaView>
    </>
  );
}
