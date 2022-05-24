import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import RestaurantsScreen from '../screens/RestaurantsScreen'
import FavoriteScreen from '../screens/FavoriteScreen'
import RankingScreen from '../screens/RankingScreen'
import SearchScreen from '../screens/SearchScreen'
import AccountScreen from '../screens/AccountScreen'
import { screen } from '../utils'

const Tab = createBottomTabNavigator()

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({route}) => (
            {
                tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "#646464",
                tabBarIcon: ({ color, size }) => tabBarIconOptions(route, color, size)
            }
        )}>
            <Tab.Screen name={screen.restaurant.tab} component={RestaurantsScreen} options={{title: "Restaurantes"}} />
            <Tab.Screen name={screen.favorites.tab} component={FavoriteScreen} options={{title: "Favoritos"}} />
            <Tab.Screen name={screen.ranking.tab} component={RankingScreen} options={{title: "Ranking"}} />
            <Tab.Screen name={screen.search.tab} component={SearchScreen} options={{title: "Buscar"}} />
            <Tab.Screen name={screen.account.tab} component={AccountScreen} options={{title: "Cuenta"}} />
        </Tab.Navigator>
    )
}

const tabBarIconOptions = (route, color, size) => {
    let iconName;

    if (route.name === screen.restaurant.tab) {
        iconName = 'compass-outline'
    }

    if (route.name === screen.favorites.tab) {
        iconName = 'heart-outline'
    }

    if (route.name === screen.ranking.tab) {
        iconName = 'star-outline'
    }

    if (route.name === screen.search.tab) {
        iconName = 'magnify'
    }

    if (route.name === screen.account.tab) {
        iconName = 'home-outline'
    }

    return <Icon type="material-community" name={iconName} color={color} size={size} />
}