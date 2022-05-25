import { StyleSheet, View, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Icon, Avatar, Text } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import LoadingModal from '../../components/shared/LoadingModal'
import { map, filter } from 'lodash'

const UploadImageForm = ({formik}) => {
    const [loading, setLoading] = useState(false)
  
    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.cancelled) {
            setLoading(true)
            uploadImage(result.uri)
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const storage = getStorage()
        const storageRef = ref(storage, `restaurant/${uuid()}`)
        const result = await uploadBytes(storageRef, blob)
        await updatePhotosRestaurant(result.metadata.fullPath)
    }

    const updatePhotosRestaurant = async (imagePath) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)

        const imageUrl = await getDownloadURL(imageRef)

        formik.setFieldValue('images', [...formik.values.images, imageUrl])

        setLoading(false)
    }

    const removeImage = (img) => {
        Alert.alert('Eliminar Imagen', '¿Estas seguro de eliminar esta imagen?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
             {
                 text: 'Eliminar',
                 onPress: () => {
                     const result = filter(formik.values.images, (image) => image !== img)
                     formik.setFieldValue('images', result)
                 }
             }
        ], {cancelable: false})
    }


  return (
    <>
        <ScrollView style={styles.viewImages} horizontal showsHorizontalScrollIndicator={false}>
            <Icon 
                type='material-community'
                name='camera-plus'
                color='#a7a7a7'
                containerStyle={styles.containerIcon}
                onPress={openGallery}
            />

            {
                map(formik.values.images, (image) => (
                    <Avatar source={{uri: image}} key={image} containerStyle={styles.avatar} onPress={() => removeImage(image)} />
                ))
            }
        </ScrollView>

        <Text style={{color: 'red', marginHorizontal: 20, marginTop: 10, fontSize: 12}}>{formik.errors.images}</Text>

        <LoadingModal show={loading} text='Cargando Imagen' />
    </>
  )
}

export default UploadImageForm

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: '#e3e3e3',
        width: 70,
        height: 70
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 10
    }
})