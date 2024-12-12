import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import "../global.css";

export default function Detail() {

    return (
        <View className="flex-1 justify-center items-center">
            <View>
                <Text className="text-black font-bold mb-8 text-2xl">
                    Detalles
                </Text>
            </View>
            <Link href="/" className="text-blue-500 underline">
                <Text className="text-blue-500 underline">
                    Volver al inicio
                </Text>
            </Link>
        </View>
    );
}
