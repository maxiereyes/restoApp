import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../utils/firebase'

const Reviews = ({idRestaurant}) => {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const q = query(
            collection(db, 'reviews'),
            where('idRestaurant', '==', idRestaurant),
            orderBy('createdAt', 'desc')
        )

        onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs)
        })
    }, [])

    return (
        <View>
            <Text>Reviews</Text>
        </View>
    )
}

export default Reviews

const styles = StyleSheet.create({})