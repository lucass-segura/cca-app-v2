import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';

export function HimnoPreview ({ himno, titulo }) {
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

export function AnimatedHimnoPreview({himno, index, titulo}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{opacity}}>
      <HimnoPreview himno={himno} titulo={titulo} />
    </Animated.View>
  )
}