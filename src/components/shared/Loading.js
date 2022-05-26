import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import { Text } from '@rneui/base'

const Loading = ({show, text}) => {
    if (!show) return null
  
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator  size={'large'} color='#00a680' />
            {text && <Text style={{color: '#00a680', textTransform: 'uppercase', marginTop: 10}}>{text}</Text>}
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})