import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { himnos } from './lib/himnos';
import "./global.css";

export default function App() {
  const [himno, setHimno] = useState({});
  useEffect(() => {
    setHimno(himnos);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar />
      <ScrollView>
        {himnos.map((himno) => (
          <Text className="text-2xl font-bold" key={himno.himno}>{himno.titulo}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
