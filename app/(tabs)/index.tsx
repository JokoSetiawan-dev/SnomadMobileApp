import { Text, View} from 'react-native';
import { Link } from 'expo-router';
import LogoutButton from "@/components/LogoutButton"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthCheck } from '@/store/hooks/useAuthCheck';

export default function Index() {

    return (
        <SafeAreaView className='h-full'>
            <View>
            <Text>Home screen</Text>
            <Link href="/profile">
                Go to Profile screen
            </Link>
            <LogoutButton/>
        </View>
        </SafeAreaView>
    );
}