import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { screen } from '../utils'
import AccountScreen from '../screens/Account/AccountScreen'
import LoginScreen from '../screens/Account/LoginScreen'
import RegisterScreen from '../screens/Account/RegisterScreen'

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.account.account} component={AccountScreen} options={{title: "Cuenta"}} />
            <Stack.Screen name={screen.account.login} component={LoginScreen} options={{title: "Iniciar Sesion"}} />
            <Stack.Screen name={screen.account.signUp} component={RegisterScreen} options={{title: "Crea Tu Cuenta"}} />
        </Stack.Navigator>
    )
}