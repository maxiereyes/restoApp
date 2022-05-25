import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'
import LoginForm from './LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
    const navigation = useNavigation()

    const goToRegister = () => navigation.navigate(screen.account.signUp)

  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <Image source={require('../../../assets/RESTOAPP.png')} style={{...styles.image}} />

        <View style={{marginHorizontal: 20}}>
            <LoginForm />
            <Text style={{textAlign: 'center', marginTop: 20}}>
                ¿Aun no tienes cuenta? <Text  onPress={goToRegister} style={{...styles.btnRegister}}>Registrate</Text>
            </Text>
        </View>
    </KeyboardAwareScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 250,
        width: '100%',
    },
    btnRegister: {
        color: '#00a680',
        fontWeight: 'bold'
    }
})