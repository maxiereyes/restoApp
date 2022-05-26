import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Input, Text, Button, AirbnbRating } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchemaAddReview } from '../../utils/validations'
import Toast from 'react-native-toast-message'
import { v4 as uuid } from 'uuid'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, query, collection, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import { useNavigation } from '@react-navigation/native'
import { map, mean } from 'lodash'

const AddReviewForm = ({route}) => {
    const navigation = useNavigation()
    const formik = useFormik({
        initialValues: {
            name: '',
            comment: '',
            rating: 1
        },
        validationSchema: validationSchemaAddReview(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                const newData = formValue
                newData.id = uuid()
                newData.idRestaurant = route.params.id
                newData.idUser = auth.currentUser.uid
                newData.avatar = auth.currentUser.photoURL
                newData.createdAt = new Date()

                await setDoc(doc(db, 'reviews', newData.id), newData)
                await updateRestaurant()
                navigation.goBack()
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al enviar opinion'
                })
                console.log(error)
            }
        }
    })

    const updateRestaurant = async () => {
        const q = query(
            collection(db, 'reviews'),
            where('idRestaurant', '==', route.params.id)
        )

        onSnapshot(q, async (snapshot) => {
            const reviews = snapshot.docs
            const arrayStars = map(reviews, (review) => review.data().rating)
            const mediaStars = mean(arrayStars)

            const restaurantRef = doc(db, 'restaurants', route.params.id)

            await updateDoc(restaurantRef, {
                ratingMedia: mediaStars
            })
        })
    }

    return (
        <View style={{marginHorizontal: 10, flex: 1, marginTop: 30, justifyContent: 'space-between', marginVertical: 20}}>
            <View>
            <AirbnbRating 
                defaultRating={1}
                size={30}
                reviews={['Muy Malo', 'Malo', 'Bueno', 'Muy Bueno', 'Excelente']}
                starContainerStyle={{marginBottom: 20}}
                onFinishRating={(value) => formik.setFieldValue('rating', value)}
            />
            <Input 
                placeholder='Nombre' 
                onChangeText={text => formik.setFieldValue('name', text)}
                errorMessage={formik.errors.name}
                />
            <Input 
                placeholder='Comentario' 
                multiline
                onChangeText={text => formik.setFieldValue('comment', text)}
                style={{height: 100}}
                errorMessage={formik.errors.comment}
                />
                </View>
            <View>
                <Button title={'Enviar Opinion'} buttonStyle={{backgroundColor: '#00a680'}} onPress={formik.handleSubmit} loading={formik.isSubmitting} containerStyle={{marginHorizontal: 10}} />
             </View>
        </View>
    )
}

export default AddReviewForm

const styles = StyleSheet.create({})