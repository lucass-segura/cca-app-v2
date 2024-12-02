import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function HimnoPreview ({ himno, titulo }) {
  const [routing, setRouting] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!routing) {
      setRouting(true);
      router.push(`../screens/himno/${himno}`);
      setTimeout(() => setRouting(false), 1000);
    }
  };

  return (
    <Pressable onPress={handleClick} disabled={routing}>
      <View className="mt-3 ml-5 w-[90%] bg-white backdrop-blur-md shadow-pronounced rounded-2xl flex-row hover:bg-gray-300">
        <View className="h-[70px] items-center justify-center w-[70px] rounded-lg m-4 bg-blue-900">
          <Text className="text-5xl text-white font-himnMedium">{himno}</Text>
        </View>
        <View className="flex-1 m-auto">
          <Text className="text-[30px] leading-tight font-himnSemiBold">{titulo}</Text>
        </View>
      </View>
    </Pressable>
  );
};