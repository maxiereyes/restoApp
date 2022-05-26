import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps'
import openMap from 'react-native-open-maps'

const Map = ({location, name}) => {

    const openAppMap = () => {
        openMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        })
    }

  return (
    <MapView initialRegion={location} style={{height: 160, width: '100%', marginBottom: 10}} onPress={openAppMap}>
        <Marker coordinate={location}  />
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})