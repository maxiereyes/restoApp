import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchemaChangePass, validationSchemaLogin } from '../../utils/validations'
import { getAuth, updatePassword, EmailAuthCredential, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import Toast from 'react-native-toast-message'

const ChangePasswordForm = ({onClose, onReload}) => {
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const showHiddenOldPassword = () => setShowOldPassword(prevState => !prevState)
    const showHiddenNewPassword = () => setShowNewPassword(prevState => !prevState)
    const showHiddenRepeatPassword = () => setShowRepeatPassword(prevState => !prevState)

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            repeatPassword: ''
        },
        validationSchema: validationSchemaChangePass(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                const credentials = EmailAuthProvider.credential(currentUser.email, formValue.password)
                await reauthenticateWithCredential(currentUser, credentials)
                await updatePassword(currentUser, formValue.newPassword)
                onClose()
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al cambiar contraseña'
                })
                console.log(error)
            }
        }
    })

    return (
        <View style={styles.container}>
        <Input 
            placeholder='Contraseña Actual'
            rightIcon={{
                type: 'material-community',
                name: showOldPassword ? 'eye-off-outline' : 'eye-outline',
                color: '#c2c2c2',
                onPress: showHiddenOldPassword
            }}
            secureTextEntry={showOldPassword ? false : true}
            onChangeText={text => formik.setFieldValue('password', text)}
            errorMessage={formik.errors.password}
        />
        <Input 
            placeholder='Nueva Contraseña'
            rightIcon={{
                type: 'material-community',
                name: showNewPassword ? 'eye-off-outline' : 'eye-outline',
                color: '#c2c2c2',
                onPress: showHiddenNewPassword
            }}
            secureTextEntry={showNewPassword ? false : true}
            onChangeText={text => formik.setFieldValue('newPassword', text)}
            errorMessage={formik.errors.newPassword}
        />
        <Input 
            placeholder='Repetir Nueva Contraseña'
            rightIcon={{
                type: 'material-community',
                name: showRepeatPassword ? 'eye-off-outline' : 'eye-outline',
                color: '#c2c2c2',
                onPress: showHiddenRepeatPassword
            }}
            secureTextEntry={showRepeatPassword ? false : true}
            onChangeText={text => formik.setFieldValue('repeatPassword', text)}
            errorMessage={formik.errors.repeatPassword}
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

export default ChangePasswordForm

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