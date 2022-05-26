import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, AirbnbRating } from '@rneui/base'

const Header = ({restaurant}) => {
  return (
    <View style={{margin: 15}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{restaurant.name}</Text>
          <AirbnbRating 
            size={20} 
            startingValue={restaurant.ratingMedia || 0} 
            isDisabled={true} 
            showRating={false}
            defaultRating={restaurant.ratingMedia || 0}
            />
      </View>
      <Text style={{marginTop: 10, color: '#828282'}}>{restaurant.description}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})