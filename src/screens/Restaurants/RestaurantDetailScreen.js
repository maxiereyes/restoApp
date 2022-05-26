import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../utils/firebase'
import Carousel from '../../components/shared/Carousel'
import Loading from '../../components/shared/Loading'
import Header from '../../components/header/Header'
import Info from '../../components/detail/Info'
import BtnReviewForm from '../../components/review/BtnReviewForm'
import Reviews from '../../components/review/Reviews'


const RestaurantDetailScreen = ({route}) => {
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        setRestaurant(null)
        onSnapshot(doc(db, 'restaurants', route.params.id), (doc) => {
            setRestaurant(doc.data())
        })
    }, [route.params.id])

    if (!restaurant) return <Loading show text="Cargando Restaurante" />

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <Carousel images={restaurant?.images} width={Dimensions.get('window').width} height={250} />

            <Header restaurant={restaurant} />
            <Info restaurant={restaurant} />
            <BtnReviewForm idRestaurant={restaurant.id} />
            <Reviews idRestaurant={restaurant.id} />
        </ScrollView>
    )
}

export default RestaurantDetailScreen

const styles = StyleSheet.create({})