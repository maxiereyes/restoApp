import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text, Image } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'

const ListRestaurants = ({data}) => {
    const navigation = useNavigation()

    const goToResto = (resto) => {
        navigation.navigate(screen.restaurant.deatilRestaurant, {
            id: resto.id
        })
    }
    
    return (
        <View>
            <FlatList 
                data={data}
                renderItem={(doc) => {
                    const restaurant = doc.item.data()
                    return (
                        <TouchableOpacity onPress={() => goToResto(restaurant)}>
                            <View style={{flexDirection: 'row', margin: 10}}>
                                <Image source={{uri: restaurant.images[0]}} style={{width: 80, height: 80, marginRight: 15}} />
                                <View>
                                    <Text style={{fontWeight: 'bold'}}>{restaurant.name}</Text>
                                    <Text style={{color: '#828282', paddingRight: 100, marginTop: 3}}>{restaurant.address}</Text>
                                    <Text style={{color: '#828282', paddingRight: 100, marginTop: 3}}>{restaurant.description}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default ListRestaurants

const styles = StyleSheet.create({})