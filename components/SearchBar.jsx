import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';  // Usando Pressable en lugar de TouchableOpacity
import Svg, { Path } from 'react-native-svg';

const SearchBar = ({ setSearchText }) => {
  const [searchTextLocal, setLocalSearchText] = useState('');

  const handleClearText = () => {
    setLocalSearchText('');
    setSearchText('');
  };

  const handleChangeText = (text) => {
    setLocalSearchText(text);
    setSearchText(text);
  };

  return (
    <View className="mt-3 ml-5 w-[90%] h-[70px] flex-row items-center font-himnSemiBold bg-primary rounded-lg">
      <Svg 
        className="w-5 h-5 mr-2 ml-2 text-white"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M21 21l-4.35-4.35m2.34-3.65a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0z"
        />
      </Svg>
      <TextInput 
        placeholder="Buscar himno por número, título o letra..." 
        placeholderTextColor="white"
        className="flex-1 text-2xl mt-1 bg-transparent font-himnSemiBold text-white"
        onChangeText={handleChangeText}
        value={searchTextLocal}
      />
      {searchTextLocal.length > 0 && (
        <Pressable onPress={handleClearText} className="mr-2">
          <Svg 
            className="w-5 h-5 text-white"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </Svg>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
