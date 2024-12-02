import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { himnos } from './lib/himnos';
import { formatTitle } from './utils/utils';
import  HimnoPreview  from './components/HimnoPreview.jsx';
import { useFonts } from 'expo-font'
import "./global.css";

export default function App() {
  const [himno, setHimno] = useState([])
 
  useEffect(() => {
    setHimno(himnos);
  }, []);

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
    <View className="flex-1 items-center justify-center">
      <StatusBar />
      <ScrollView>
      {himno.map((himno) => (
            <View className="mt-3" key={himno.himno}>
              <HimnoPreview
                himno={himno.himno}
                titulo={formatTitle(himno.titulo)}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
