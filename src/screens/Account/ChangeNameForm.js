import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchemaName } from '../../utils/validations'
import { getAuth, updateProfile } from 'firebase/auth'
import Toast from 'react-native-toast-message'

const ChangeNameForm = ({onClose, onReload}) => {
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: validationSchemaName(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await updateProfile(auth.currentUser, { displayName: formValue.name })
                onReload()
                onClose()
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Nombre y apellido incorrectos'
                })
                console.log(error)
            }
        }
    })

    return (
        <View style={styles.container}>
        <Input 
            placeholder='Nombre y Apellido'
            rightIcon={{
                type: 'material-community',
                name: 'account-circle-outline',
                color: '#c2c2c2'
            }}
            onChangeText={text => formik.setFieldValue('name', text)}
            errorMessage={formik.errors.name}
        />
        <Button 
            title={'Cambiar'} 
            containerStyle={styles.btnContainer} 
            buttonStyle={styles.btn}  
            loading={formik.isSubmitting}
            onPress={formik.handleSubmit}    
        />
        </View>
    )
}

export default ChangeNameForm

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10
    },
    btnContainer: {
        width: '95%',
        marginTop: 10
    },
    btn: {
        backgroundColor: '#00a680'
    }
})