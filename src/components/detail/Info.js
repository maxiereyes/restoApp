import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, ListItem, Icon } from '@rneui/base'
import { map } from 'lodash'
import Map from '../map/Map'

const Info = ({restaurant}) => {
    const listInfo = [
        {
            text: restaurant.address,
            iconName: "map-marker",
            typeIcon: 'material-community'
        },
        {
            text: restaurant.phone,
            iconName: "phone",
            typeIcon: 'material-community'
        },
        {
            text: restaurant.email,
            iconName: "at",
            typeIcon: 'material-community'
        }
    ]

    return (
        <View style={{marginTop: 20 }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 15}}>Informacion sobre el restaurante</Text>
            <Map location={restaurant.location} name={restaurant.name}/>
            {
                map(listInfo, (item, index) => (
                    <ListItem key={index} bottomDivider>
                        <Icon type={item.typeIcon} name={item.iconName} color='#00a680' />
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.text}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

export default Info

const styles = StyleSheet.create({})