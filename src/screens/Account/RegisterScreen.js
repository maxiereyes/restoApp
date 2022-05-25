import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'
import RegisterForm from './RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const RegisterScreen = () => {
  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <Image source={require('../../../assets/RESTOAPP.png')} style={styles.image} />

        <View style={styles.content}>
            <RegisterForm />
        </View>
    </KeyboardAwareScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 250,
        width: '100%',
        marginBottom: 20
    },
    content: {
        marginHorizontal: 20
    }
})