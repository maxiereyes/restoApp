import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from '../../components/shared/Modal'
import * as Location from 'expo-location'
import Toast from 'react-native-toast-message'
import MpaView from 'react-native-maps'
import MapView from 'react-native-maps'
import { Button } from '@rneui/base'

const MapForm = ({show, close, formik}) => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0.0001,
        longitude: 0.0001,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001
    })
    
    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Tienes que ir a ajustes de la app y activar la localizacion'
                })
                return
            }

            const location = await Location.getCurrentPositionAsync({})
            setCurrentLocation({
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
                latitudeDelta: 0.0001,
                longitudeDelta: 0.0001
            })
        })()
    }, [])

    const saveLocation = () => {
        formik.setFieldValue('location', currentLocation)
        close()
    }

    return (
        <Modal show={show} close={close} >
                <MapView initialRegion={currentLocation} showsUserLocation style={styles.mapStyle} onRegionChange={(location) => setCurrentLocation(location)}>
                    <MapView.Marker draggable coordinate={currentLocation} />
                </MapView>
                <View style={styles.mapActions}>
                    <Button title={'Guardar'} containerStyle={styles.btnContainer} buttonStyle={styles.btnSave} onPress={saveLocation} />
                    <Button title={'Cerrar'} containerStyle={styles.btnContainer} buttonStyle={styles.btnClose} onPress={close}/>
                </View>
        </Modal>
    )
}

export default MapForm

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: 550
    },
    mapActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnContainer: {
        width: '45%'
    },
    btnSave: {
        backgroundColor: '#00a680'
    } ,
    btnClose: {
        backgroundColor: '#a60d0d'
    } 
})