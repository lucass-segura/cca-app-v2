import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { formatTitle } from '../utils/utils';

export function HimnoPreview({ himno }) {

  return (
    <Link href={`/${himno.himno}`} asChild>
      <Pressable>
        <View className="mt-3 ml-5 w-[90%] bg-white backdrop-blur-md shadow-pronounced rounded-2xl flex-row">
          <View className="h-[70px] items-center justify-center w-[70px] rounded-lg m-4 bg-blue-900">
            <Text className="text-5xl text-white font-himnMedium">{himno.himno}</Text>
          </View>
          <View className="flex-1 m-auto">
            <Text className="text-[30px] leading-tight font-himnSemiBold">{formatTitle(himno.titulo)}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export function AnimatedHimnoPreview({ himno, index }) {
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
    <Animated.View style={{ opacity }}>
      <HimnoPreview himno={himno} />
    </Animated.View>
  )
}