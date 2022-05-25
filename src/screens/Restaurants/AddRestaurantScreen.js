import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RestaurantInfoForm from './RestaurantInfoForm'
import { useFormik } from 'formik'
import { Button } from '@rneui/base'
import { validationSchemaAddResto } from '../../utils/validations'
import UploadImageForm from './UploadImageForm'
import BannerRestaurant from './BannerRestaurant'
import Toast from 'react-native-toast-message'
import {v4 as uuid} from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'
import { db } from '../../utils/firebase'

const AddRestaurantScreen = () => {
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      location: null,
      images: []
    },
    validationSchema: validationSchemaAddResto(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue
        newData.id = uuid()
        newData.createdAt = new Date()
        const myDb = doc(db, 'restaurants', newData.id)
        await setDoc(myDb, newData)
        navigation.goBack()
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error al crear restaurante'
        })
        console.log(error)
      }
    }
  })
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BannerRestaurant formik={formik} />

      <RestaurantInfoForm formik={formik} />

      <UploadImageForm formik={formik}/>

      <Button title={'Guardar'} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting} containerStyle={{marginHorizontal: 20}}/>
    </ScrollView>
  )
}

export default AddRestaurantScreen

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#00a680',
    marginTop: 20
  }
})