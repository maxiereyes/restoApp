import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavoriteScreen from '../screens/FavoriteScreen'
import { screen } from '../utils'

const Stack = createNativeStackNavigator()

export const FavoriteStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.favorites.favorites} component={FavoriteScreen} options={{title: "Favoritos"}} />
        </Stack.Navigator>
    )
}