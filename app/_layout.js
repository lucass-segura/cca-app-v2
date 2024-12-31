import { Stack } from 'expo-router';
import { View } from 'react-native';
import "../global.css";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
        'MarkaziText-Bold': require('../assets/fonts/MarkaziText-Bold.ttf'),
        'MarkaziText-SemiBold': require('../assets/fonts/MarkaziText-SemiBold.ttf'),
        'MarkaziText-Medium': require('../assets/fonts/MarkaziText-Medium.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View className="flex-1">
            {/* Configurar el StatusBar globalmente en la app */}
            <StatusBar style="dark" />
            
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f3f4f6',
                    },
                    headerTitleStyle: {
                        fontFamily: 'MarkaziText-SemiBold',
                        fontSize: 35,
                    },
                    headerTitle: "Himnario de Música",
                }} />
        </View>
    );
}
