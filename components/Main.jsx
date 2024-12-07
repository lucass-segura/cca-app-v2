import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { formatTitle } from '../utils/utils';
import HimnoPreview from './HimnoPreview.jsx';
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
                <ScrollView>
                    {himno.map((himno) => (
                        <View className="mt-3" key={himno.himno}>
                            <HimnoPreview
                                himno={himno.himno}
                                titulo={formatTitle(himno.titulo)}
                            />
                        </View>
                    ))}
                </ScrollView>
            )}
        </>
    );
}
