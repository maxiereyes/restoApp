import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils'
import RestaurantsScreen from '../screens/Restaurants/RestaurantsScreen'
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurantScreen'
import RestaurantDetailScreen from '../screens/Restaurants/RestaurantDetailScreen'

const Stack = createNativeStackNavigator()

export const RestaurantStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.restaurant.restaurants} component={RestaurantsScreen} options={{title: "Restaurantes"}} />
            <Stack.Screen name={screen.restaurant.addRestaurant} component={AddRestaurantScreen} options={{title: "Nuevo Restaurante"}} />
            <Stack.Screen name={screen.restaurant.deatilRestaurant} component={RestaurantDetailScreen} options={{title: "Restaurante"}} />
        </Stack.Navigator>
    )
}