import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '@rneui/base'
import MapForm from './MapForm'

const RestaurantInfoForm = ({formik}) => {
  const [showModal, setShowModal] = useState(false)

  const onOpenModalMap = () => {
    setShowModal(prevState => !prevState)
  }

  return (
    <>
        <View style={{marginTop: 20, marginHorizontal: 10}}>
        <Input 
            placeholder='Nombre'
            onChangeText={text => formik.setFieldValue('name', text)} 
            errorMessage={formik.errors.name}
            />
        <Input 
            placeholder='Direccion' 
            rightIcon={{
                type: 'material-community',
                name: 'map-marker-radius',
                color: getColorIconMap(formik),
                onPress: onOpenModalMap
            }}
            onChangeText={text => formik.setFieldValue('address', text)} 
            errorMessage={formik.errors.address}
            />
        <Input 
            placeholder='Telefono' 
            onChangeText={text => formik.setFieldValue('phone', text)} 
            errorMessage={formik.errors.phone}
            />
        <Input 
            placeholder='Correo electronico' 
            onChangeText={text => formik.setFieldValue('email', text)} 
            errorMessage={formik.errors.email}
            />
        <Input 
            placeholder='Descripcion' 
            onChangeText={text => formik.setFieldValue('description', text)} 
            multiline
            inputContainerStyle={styles.areaText}
            errorMessage={formik.errors.description}
            />
        </View>
        <MapForm show={showModal} close={onOpenModalMap} formik={formik} />
    </>
  )
}

export default RestaurantInfoForm

const styles = StyleSheet.create({
    areaText: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    }
})

const getColorIconMap = (formik) => {
    if (formik.errors.location) return '#ff0000'

    if (formik.values.location) return '#00a680'

    if (!formik.values.location) return '#c2c2c2'
}