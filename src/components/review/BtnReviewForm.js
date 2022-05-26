import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Text, Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import { size } from 'lodash'

const BtnReviewForm = ({idRestaurant}) => {
    const navigation = useNavigation()
    const [hasLogged, setHasLogged] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const auth = getAuth()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db, 'reviews'),
                where('idRestaurant', '==', idRestaurant),
                where('idUser', '==', auth.currentUser.uid)
            )

            onSnapshot(q, (snapshot) => {
                if (size(snapshot.docs) > 0) setHasReview(true)
            })
        }
    }, [hasLogged])

    if (hasLogged && hasReview) {
        return (
            <View style={{marginTop: 20}}>
                <Text style={{textAlign: 'center', color: '#c2c2c2'}}>Ya has enviado un review a este restaurante</Text>
            </View>
        )
    }
  
    return (
        <View style={{margin: 15}}>
            {
                hasLogged ? 
                <Button 
                    title={"Escribe una opinion"} 
                    icon={{type: 'material-community', name: 'square-edit-outline', color: '#00a680'}} 
                    buttonStyle={{backgroundColor: 'transparent'}}
                    titleStyle={{color: '#00a680', fontWeight: 'bold'}}
                    onPress={() => navigation.navigate(screen.restaurant.addReviewRestaurant, {id: idRestaurant})}
                    /> : 
                <Text style={{textAlign: 'center', color: '00a680', padding: 20}} onPress={goToLogin}>
                    Para escribir una opinion es necesario estar logeado, 
                    <Text style={{color: '#00a680', fontWeight: 'bold'}} > pulsa AQUI para iniciar sesion</Text>
                </Text>
            }
        </View>
    )
}

export default BtnReviewForm

const styles = StyleSheet.create({})