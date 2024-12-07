import { FlatList, View, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { formatTitle } from '../utils/utils';

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
                    renderItem={({ item, index }) => <AnimatedHimnoPreview himno={item.himno} titulo={formatTitle(item.titulo)} />}
                />
            )}
        </>
    );
}                   
