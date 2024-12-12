import { FlatList, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { AnimatedHimnoPreview } from './HimnoPreview.jsx';
import { himnos } from '../lib/himnos';

export function Main() {
    const [himno, setHimno] = useState([])

    useEffect(() => {
        setHimno(himnos);
    }, []);

    return (
        <>
            {himno.length === 0 ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={himnos}
                    keyExtractor={himno.himno}
                    renderItem={({ item }) => <AnimatedHimnoPreview himno={item}  />}
                />
            )}
        </>
    );
}                   
