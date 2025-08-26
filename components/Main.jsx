import { SectionList, View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { AnimatedHimnoPreview } from './HimnoPreview.jsx';
import { himnos } from '../lib/himnos';
import { coritos } from '../lib/coritos';

const sections = [
    { title: 'Coritos', data: coritos.map(c => ({ ...c, type: 'corito' })) },
    { title: 'Himnos', data: himnos.map(h => ({ ...h, type: 'himno' })) }
];

const normalizeText = (text) => {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/,/g, '')
        .toLowerCase();
};

export function Main() {
    const [items, setItems] = useState(sections);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const [customMessage, setCustomMessage] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        setLoading(true);
        setLoadingError(false);
        setCustomMessage('');

        if (!query) {
            setItems(sections);
            setLoading(false);
            return;
        }

        const lowerCaseQuery = normalizeText(query);
        const filteredSections = sections.map(section => {
            const filteredData = section.data.filter(item => {
                if (item.type === 'corito') {
                    return (
                        normalizeText(item.corito.toString()).includes(lowerCaseQuery) ||
                        normalizeText(item.titulo).includes(lowerCaseQuery) ||
                        normalizeText(item.coro).includes(lowerCaseQuery)
                    );
                } else {
                    return (
                        normalizeText(item.himno.toString()).includes(lowerCaseQuery) ||
                        normalizeText(item.titulo).includes(lowerCaseQuery) ||
                        Object.values(item.letra).some(letra =>
                            normalizeText(letra).includes(lowerCaseQuery)
                        )
                    );
                }
            });
            return { ...section, data: filteredData };
        }).filter(section => section.data.length > 0);

        if (filteredSections.length === 0) {
            setLoadingError(true);
        } else {
            setItems(filteredSections);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (loading) {
                setLoadingError(true);
                setLoading(false);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [loading]);

    const clearSearch = () => {
        setSearchQuery('');
        setItems(sections);
        setLoading(false);
        setLoadingError(false);
        setCustomMessage('');
    };

    return (
        <View className="flex-1 bg-gray-100 p-2">
      
            <View className="relative">
                <TextInput
                    className="mb-5 mt-5 p-3 mx-5 border-2 border-primary rounded-lg bg-white shadow-lg text-lg text-primary"
                    placeholder="Buscar himno o corito..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={clearSearch}
                        className="absolute right-10 top-1/2 transform -translate-y-1/2"
                    >
                        <Text className="text-xl text-gray-500">X</Text>
                    </TouchableOpacity>
                )}
            </View>

            {customMessage ? (
                <View className="flex-1 items-center p-4">
                    <View className="flex-row justify-center bg-blue-100 p-4 rounded-xl shadow-lg">
                        <Text className="text-2xl font-bold text-blue-600 mr-2">💛</Text>
                    </View>
                </View>
            ) : (
                <>
                    {loadingError ? (
                        <View className="flex-1 items-center p-4">
                            <View className="flex-row justify-center bg-red-100 p-4 rounded-xl shadow-lg">
                                <Text className="text-2xl font-bold text-red-600 mr-2">😞</Text>
                                <Text className="text-xl text-red-600">No se encontraron resultados</Text>
                            </View>
                        </View>
                    ) : (
                        <>
                            {loading ? (
                                <View className="flex-1 justify-center items-center">
                                    <ActivityIndicator size="large" color="#F59E0B" />
                                    <Text className="text-xl text-gray-500 mt-4">Cargando...</Text>
                                </View>
                            ) : (
                                <SectionList
                                    sections={items}
                                    keyExtractor={(item) => (item.type === 'corito' ? `c_${item.corito}` : `h_${item.himno}`)}
                                    renderItem={({ item, index }) => (
                                        <AnimatedHimnoPreview himno={item} index={index} />
                                    )}
                                    renderSectionHeader={({ section: { title } }) => (
                                        <Text className="text-4xl font-himnBold text-primary mt-4 ml-5">{title}</Text>
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