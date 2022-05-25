import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchemaLogin } from '../../utils/validations'
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import Toast from 'react-native-toast-message'

const ChangeEmailForm = ({onClose, onReload}) => {
    const [showPassword, setShowPassword] = useState(false)

    const showHiddenPassword = () => setShowPassword(prevState => !prevState)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchemaLogin(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password)
                await reauthenticateWithCredential(currentUser, credentials)
                await updateEmail(currentUser, formValue.email)
                onReload()
                onClose()
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Email o Contraseña incorrecto'
                })
                console.log(error)
            }
        }
    })

    return (
        <View style={styles.container}>
        <Input 
            placeholder='Correo electronico'
            rightIcon={{
                type: 'material-community',
                name: 'at',
                color: '#c2c2c2'
            }}
            onChangeText={text => formik.setFieldValue('email', text)}
            errorMessage={formik.errors.email}
        />
        <Input 
            placeholder='Contraseña'
            rightIcon={{
                type: 'material-community',
                name: showPassword ? 'eye-off-outline' : 'eye-outline',
                color: '#c2c2c2',
                onPress: showHiddenPassword
            }}
            secureTextEntry={showPassword ? false : true}
            onChangeText={text => formik.setFieldValue('password', text)}
            errorMessage={formik.errors.password}
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

export default ChangeEmailForm

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