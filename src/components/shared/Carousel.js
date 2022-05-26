import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CarouselSnap, { Pagination } from 'react-native-snap-carousel'
import { Image } from '@rneui/base'
import { size } from 'lodash'

const Carousel = ({images, width, height, hideDots}) => {
    const [activeDot, setActiveDot] = useState(0)
    const renderItem = ({item}) => {
        return (
            <Image source={{uri: item}} style={{height, width}} />
        )
    }

    const pagination = () => {
        return (
            <Pagination 
                dotsLength={size(images)}
                activeDotIndex={activeDot}
                inactiveDotOpacity={0.8}
                inactiveDotScale={0.6}
                containerStyle={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: 70, paddingBottom: 0}}
                dotStyle={{backgroundColor: '#00a680'}}
            />
        )
    }

  return (
    <View style={{position: 'relative'}}>
      <CarouselSnap 
        layout='default'
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDot(index)}
      />
      {
          !hideDots && pagination()
      }
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})