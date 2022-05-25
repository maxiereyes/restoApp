import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { screen } from '../utils'
import { RestaurantStack } from "./RestaurantStack";
import { FavoriteStack } from "./FavoriteStack";
import { RankingStack } from "./RankingStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";

const Tab = createBottomTabNavigator()

export function AppNavigation() {
    return (
        <Tab.Navigator screenOptions={({route}) => (
            {
                headerShown: false,
                tabBarActiveTintColor: "#00a680",
                tabBarInactiveTintColor: "#646464",
                tabBarIcon: ({ color, size }) => tabBarIconOptions(route, color, size)
            }
        )}>
            <Tab.Screen name={screen.restaurant.tab} component={RestaurantStack} options={{title: "Restaurantes"}} />
            <Tab.Screen name={screen.favorites.tab} component={FavoriteStack} options={{title: "Favoritos"}} />
            <Tab.Screen name={screen.ranking.tab} component={RankingStack} options={{title: "Ranking"}} />
            <Tab.Screen name={screen.search.tab} component={SearchStack} options={{title: "Buscar"}} />
            <Tab.Screen name={screen.account.tab} component={AccountStack} options={{title: "Cuenta"}} />
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