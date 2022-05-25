import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { Text, Button, Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'

const UserGuestScreen = () => {
  const navigation = useNavigation()
  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }

  return (
    <ScrollView centerContent={true} style={styles.container}>
      <Image source={require('../../../assets/user_guest.jpg')} style={styles.image} />
      <Text style={styles.title}>Consultar tu perfil de restoApp</Text>
      <Text style={{...styles.description}}>¿Como describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.</Text>
      <Button title={'Ver tu perfil'} onPress={goToLogin} buttonStyle={styles.btn}/>
    </ScrollView>
  )
}

export default UserGuestScreen

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: '100%',
    marginBottom: 40
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: 20
  },
  btn: {
    backgroundColor: '#00a680'
  }
})