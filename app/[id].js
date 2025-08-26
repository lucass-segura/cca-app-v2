import { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { himnos } from '../lib/himnos';
import { formatTitle } from '../utils/utils';

const HimnoDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const himno = himnos.find((h) => h.himno.toString() === id);
    const navigation = useNavigation();

    // Estado para controlar el tamaño de la fuente
    const [fontSize, setFontSize] = useState(22);

    const aumentarLetra = () => setFontSize((prev) => Math.min(prev + 2, 40)); // Máximo 40
    const reducirLetra = () => setFontSize((prev) => Math.max(prev - 2, 20)); // Mínimo 16

    // Actualizar el título del header dinámicamente
    useLayoutEffect(() => {
        if (himno) {
            navigation.setOptions({
                headerTitle: () => (
                    <Text className="text-3xl mt-1 font-himnBold">
                        {himno.himno}. {formatTitle(himno.titulo)}
                    </Text>
                ),
            });
        }
    }, [navigation, himno]);

    // Mostrar mensaje si no se encuentra el himno
    if (!himno) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500 text-2xl font-himnBold">Himno no encontrado</Text>
            </View>
        );
    }

    const { letra } = himno;

    // Obtener los versos, excluyendo coro y final
    const versos = Object.entries(letra)
        .filter(([key]) => key !== 'coro' && key !== 'final')
        .sort(([a], [b]) => a - b);

    const coro = letra.coro ? (
        <Text
            key="coro"
            style={{ fontSize: fontSize + 2, lineHeight: (fontSize + 2) * 1.5 }}
            className="ml-5 mt-4 font-himnBold"
        >
            {letra.coro}
        </Text>
    ) : null;

    const final = letra.final ? (
        <Text
            key="final"
            style={{ fontSize: fontSize + 2, lineHeight: (fontSize + 2) * 1.5 }}
            className="ml-10 mt-4 font-himnBold"
        >
            {letra.final}
        </Text>
    ) : null;

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

            {/* Contenido del himno */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
                {versos.map(([key, verso], index) => (
                    <View key={key} className="flex-row items-start mt-2">
                        <Text
                            style={{ fontSize, lineHeight: fontSize * 1.5 }}
                            className="ml-2 mr-1 font-himnMedium"
                        >
                            {index + 1}.
                        </Text>
                        <View className="flex-1">
                            {verso.split('\n').map((line, i) => (
                                <Text
                                    key={i}
                                    style={{ fontSize, lineHeight: fontSize * 1.5 }}
                                    className="leading-7 font-himnRegular"
                                >
                                    {line}
                                </Text>
                            ))}
                            {index === 0 && coro}
                        </View>
                    </View>
                ))}
                {final}
                <View className="mt-10"></View>
            </ScrollView>
        </View>
    );
};

export default HimnoDetailScreen;