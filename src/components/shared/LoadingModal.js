import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import { Overlay, Text } from '@rneui/base'

const LoadingModal = (props) => {
    const {show, text} = props

    return (
        <Overlay 
            isVisible={show} 
            overlayStyle={styles.overlay}    
        >
            <View style={styles.view}>
                <ActivityIndicator size={'large'} color="#00a680" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

LoadingModal.defaultProps = {
    show: false
}

export default LoadingModal

const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10    
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#00a680",
        textTransform: 'uppercase',
        marginTop: 10
    }
})