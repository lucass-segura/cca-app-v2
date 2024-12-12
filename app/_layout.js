import { Slot } from 'expo-router';
import { View } from 'react-native';
import "../global.css";
import { useFonts } from 'expo-font'

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
        <View>
            <Slot />
        </View>
    );
}