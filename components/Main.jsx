import { FlatList, View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { AnimatedHimnoPreview } from './HimnoPreview.jsx';
import { himnos } from '../lib/himnos';

// Función para normalizar texto, ignorando acentos y comas
const normalizeText = (text) => {
    return text
        .normalize('NFD') // Descompone los caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
        .replace(/,/g, '') // Elimina las comas
        .toLowerCase(); // Convierte a minúsculas
};

export function Main() {
    const [himno, setHimno] = useState(himnos);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [customMessage, setCustomMessage] = useState(''); // Para mensajes personalizados

    useEffect(() => {
        setHimno(himnos);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);

        // Iniciar la carga y manejar el estado de error
        setLoading(true);
        setLoadingError(false);
        setCustomMessage(''); // Resetear el mensaje personalizado

        if (!query) {
            setHimno(himnos);
            setLoading(false);
        } else {
            const lowerCaseQuery = normalizeText(query); // Normalizamos la búsqueda

            // Lógica para mensajes personalizados
            if (lowerCaseQuery === 'lucas') {
                setCustomMessage('¡Qué tipo fachero!');
                setLoading(false);
                setHimno([]); // Limpiar los himnos
            } else if (lowerCaseQuery === 'priscila') {
                setCustomMessage('¡Qué tipa fachera!');
                setLoading(false);
                setHimno([]); // Limpiar los himnos
            } else {
                // Si no es "Lucas" ni "Priscila", realizar la búsqueda de himnos
                const filteredHimnos = himnos.filter((himno) => {
                    return (
                        normalizeText(himno.himno.toString()).includes(lowerCaseQuery) ||
                        normalizeText(himno.titulo).includes(lowerCaseQuery) ||
                        Object.values(himno.letra).some((letra) =>
                            normalizeText(letra).includes(lowerCaseQuery)
                        )
                    );
                });

                // Si se busca "Luca" o "Prisci", mostrar error
                if (lowerCaseQuery === 'luca' || lowerCaseQuery === 'prisci') {
                    setLoadingError(true);
                    setLoading(false);
                } else if (filteredHimnos.length === 0) {
                    setLoadingError(true);
                    setLoading(false);
                } else {
                    setHimno(filteredHimnos);
                    setLoading(false);
                }
            }
        }
    };

    // Manejo de temporizador de carga (3 segundos)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setLoadingError(true);
                setLoading(false);
            }
        }, 3000);

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    }, [loading]);

    // Función para borrar el texto en el campo de búsqueda
    const clearSearch = () => {
        setSearchQuery('');
        setHimno(himnos);
        setLoading(false);
        setLoadingError(false);
        setCustomMessage(''); // Limpiar mensaje personalizado
    };

    return (
        <View className="flex-1 bg-gray-100 p-2">
      
            {/* Barra de búsqueda */}
            <View className="relative">
                <TextInput
                    className="mb-5 mt-5 p-3 mx-5 border-2 border-primary rounded-lg bg-white shadow-lg text-lg text-primary"
                    placeholder="Buscar himno..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                {/* Icono de borrar (X) */}
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={clearSearch}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2"
                    >
                        <Text className="text-xl text-gray-500">X</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Mostrar mensaje personalizado si se busca "Lucas" o "Priscila" */}
            {customMessage ? (
                <View className="flex-1 items-center p-4">
                    <View className="flex-row justify-center bg-blue-100 p-4 rounded-xl shadow-lg">
                        <Text className="text-2xl font-bold text-blue-600 mr-2">😎</Text>
                        <Text className="text-xl text-blue-600">{customMessage}</Text>
                    </View>
                </View>
            ) : (
                <>
                    {/* Mostrar mensaje de error si no se encuentra himno */}
                    {loadingError ? (
                        <View className="flex-1 items-center p-4">
                            <View className="flex-row justify-center bg-red-100 p-4 rounded-xl shadow-lg">
                                <Text className="text-2xl font-bold text-red-600 mr-2">😞</Text>
                                <Text className="text-xl text-red-600">Himno no encontrado</Text>
                            </View>
                        </View>
                    ) : (
                        <>
                            {/* Mostrar los himnos o indicador de carga */}
                            {loading ? (
                                <View className="flex-1 justify-center items-center">
                                    <ActivityIndicator size="large" color="#F59E0B" />
                                    <Text className="text-xl text-gray-500 mt-4">Cargando...</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={himno}
                                    keyExtractor={(item) => item.himno.toString()}
                                    renderItem={({ item, index }) => (
                                        <AnimatedHimnoPreview himno={item} index={index} />
                                    )}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </View>
    );
}
