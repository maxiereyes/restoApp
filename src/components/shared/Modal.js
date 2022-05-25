import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'

const Modal = ({show, close, children}) => {
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
        {children}
    </Overlay>
  )
}

export default Modal

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '90%',
        backgroundColor: '#fff'
    }
})