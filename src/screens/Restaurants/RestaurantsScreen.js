import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'

const RestaurantsScreen = () => {
  const navigation = useNavigation()

  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant)

    // other way
    //navigation.navigate(screen.account.tab, {screen: screen.account.account})
  }

  return (
    <View>
      <Text>Restaurants</Text>
      <Button title='Crear Restaurante' onPress={goToAddRestaurant} />
    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({})