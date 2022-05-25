import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Text } from '@rneui/base'
import { getAuth, updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const InfoUser = ({setLoading, setLoadingText}) => {
  const { uid, photoURL, displayName, email } = getAuth().currentUser
  const [avatar, setAvatar] = useState(photoURL)

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      uploadImage(result.uri)
    }
  }

  const uploadImage = async (uri) => {
    setLoadingText('Actualizando Avatar')
    setLoading(true)

    const response = await fetch(uri)
    const blob = await response.blob()

    const storage = getStorage()
    const storageRef = ref(storage, `avatar/${uid}`)
    
    try {
      const uploadResponse = await uploadBytes(storageRef, blob)  
      updatePhotoUrl(uploadResponse.metadata.fullPath)
    } catch (error) {
      console.log(error)
    } 
  }

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage()
    const imageRef = ref(storage, imagePath)

    const imageUrl = await getDownloadURL(imageRef)

    const auth = getAuth()
    updateProfile(auth.currentUser, { photoURL: imageUrl})

    setAvatar(imageUrl)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Avatar size={'large'} rounded icon={{type: 'material', name: 'person'}} containerStyle={styles.avatar} source={{uri: avatar}}>
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
          <Text style={styles.display}>{displayName || 'Anonimo'}</Text>
          <Text>{email}</Text>
        </View>
    </View>
  )
}

export default InfoUser

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 30
  },
  avatar: {
    marginRight: 20,
    backgroundColor: 'green'
  },
  display: {
    fontWeight: 'bold',
    paddingBottom: 5
  }
})