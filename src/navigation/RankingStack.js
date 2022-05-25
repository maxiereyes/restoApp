import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RankingScreen from '../screens/RankingScreen'
import { screen } from '../utils'

const Stack = createNativeStackNavigator()

export const RankingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.ranking.rankings} component={RankingScreen} options={{title: "Ranking"}} />
        </Stack.Navigator>
    )
}