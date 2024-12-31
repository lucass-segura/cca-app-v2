import { FlatList, View, Text, TextInput, ActivityIndicator } from 'react-native';
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

    useEffect(() => {
        setHimno(himnos);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);

        // Iniciar la carga y manejar el estado de error
        setLoading(true);
        setLoadingError(false);

        if (!query) {
            setHimno(himnos);
            setLoading(false);
        } else {
            const lowerCaseQuery = normalizeText(query); // Normalizamos la búsqueda

            const filteredHimnos = himnos.filter((himno) => {
                return (
                    normalizeText(himno.himno.toString()).includes(lowerCaseQuery) ||
                    normalizeText(himno.titulo).includes(lowerCaseQuery) ||
                    Object.values(himno.letra).some((letra) =>
                        normalizeText(letra).includes(lowerCaseQuery)
                    )
                );
            });

            if (filteredHimnos.length === 0) {
                setLoadingError(true);
            }

            setHimno(filteredHimnos);
            setLoading(false);
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

    return (
        <View className="flex-1 bg-gray-100 p-2">
          <Text className="ml-5 mt-5 text-6xl font-himnSemiBold">Himnario de</Text>
      <Text className="ml-5 text-6xl mb-5 font-himnSemiBold">Música</Text>
   
            {/* Barra de búsqueda */}
            <TextInput
                className="mb-10 p-3 mx-5 border-2 border-primary rounded-lg bg-white shadow-lg text-lg text-primary"
                placeholder="Buscar himno..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Mostrar mensaje de error si no se encuentra himno */}
            {loadingError ? (
                <View className="flex-1  items-center p-4">
                    <View className="flex-row  justify-center bg-red-100 p-4 rounded-xl shadow-lg">
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
        </View>
    );
}
