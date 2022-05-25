import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RestaurantDetailScreen = ({route}) => {
    const {params} = route
  
    return (
        <View>
        <Text>{params.id}</Text>
        </View>
    )
}

export default RestaurantDetailScreen

const styles = StyleSheet.create({})