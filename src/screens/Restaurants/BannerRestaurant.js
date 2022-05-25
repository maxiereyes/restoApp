import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'

const BannerRestaurant = ({formik}) => {

    const bannerImage = formik.values.images[0]

    return (
        <View style={{marginBottom: 20}}>
            <Image 
                source={{uri: bannerImage || 'https://repuestosmdi.com/wp-content/uploads/2018/10/image.png' }}
                style={{height: 200, width: Dimensions.get('window').width}}
            />
        </View>
    )
}

export default BannerRestaurant

const styles = StyleSheet.create({})