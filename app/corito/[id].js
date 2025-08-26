import { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { coritos } from '../../lib/coritos';
import { formatTitle } from '../../utils/utils';

const CoritoDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const corito = coritos.find((c) => c.corito.toString() === id);
    const navigation = useNavigation();

    // Estado para controlar el tamaño de la fuente
    const [fontSize, setFontSize] = useState(22);

    const aumentarLetra = () => setFontSize((prev) => Math.min(prev + 2, 40));
    const reducirLetra = () => setFontSize((prev) => Math.max(prev - 2, 20));

    // Actualizar el título del header dinámicamente
    useLayoutEffect(() => {
        if (corito) {
            navigation.setOptions({
                headerTitle: () => (
                    <Text className="text-3xl mt-1 font-himnBold">
                        {corito.corito}. {formatTitle(corito.titulo)}
                    </Text>
                ),
            });
        }
    }, [navigation, corito]);

    // Mostrar mensaje si no se encuentra el corito
    if (!corito) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500 text-2xl font-himnBold">Corito no encontrado</Text>
            </View>
        );
    }

    const { coro } = corito;

    return (
        <View className="flex-1 bg-white mt-1">
            {/* Controles para el tamaño de la letra */}
            <View className="flex-row justify-end items-end mt-4 ml-4">
                <View className="flex-row pb-1">
                    <TouchableOpacity onPress={reducirLetra} className="bg-primary px-4 py-2 rounded-md mx-2">
                        <Text className="text-white font-himnBold">A-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={aumentarLetra} className="bg-primary px-4 py-2 rounded-md mx-2">
                        <Text className="text-white font-himnBold">A+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Contenido del corito */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                <View className="flex-1">
                    {coro.split('\n').map((line, i) => (
                        <Text
                            key={i}
                            style={{ fontSize, lineHeight: fontSize * 1.5 }}
                            className="leading-7 font-himnRegular"
                        >
                            {line}
                        </Text>
                    ))}
                </View>
                <View className="mt-10"></View>
            </ScrollView>
        </View>
    );
};

export default CoritoDetailScreen;