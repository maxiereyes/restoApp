import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'

const LoginScreen = () => {
    const navigation = useNavigation()

    const goToRegister = () => navigation.navigate(screen.account.signUp)

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
        <Image source={require('../../../assets/RESTOAPP.png')} style={{...styles.image}} />
        <Text>LoginScreen</Text>

        <View>
            <Text onPress={goToRegister}>Registrarse</Text>
        </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 250,
        width: '100%',
    }
})