import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchema } from '../../utils/validations'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { screen } from '../../utils'

const RegisterForm = () => {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [showRepeatPassword, setShowRepeatPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
                navigation.navigate(screen.account.account)
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al registrarse, intentelo mas tarde'
                })
                console.log(error)
            }
        }
    })

    const showHiddenPassword = () => setShowPassword(prevState => !prevState)
    const showHiddenRepeatPassword = () => setShowRepeatPassword(prevState => !prevState)

  return (
    <View style={styles.container}>
        <Input 
            errorMessage={formik.errors.email}
            onChangeText={text => formik.setFieldValue('email', text)} 
            placeholder='Correo electronico' 
            containerStyle={styles.input} 
            rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />} />
        <Input 
            errorMessage={formik.errors.password}
            onChangeText={text => formik.setFieldValue('password', text)} 
            placeholder='Contraseña' 
            containerStyle={styles.input} 
            rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
            secureTextEntry={showPassword ? false : true} 
            />
        <Input 
            errorMessage={formik.errors.repeatPassword}
            onChangeText={text => formik.setFieldValue('repeatPassword', text)} 
            placeholder='Repetir Contraseña' 
            containerStyle={styles.input} 
            rightIcon={<Icon type='material-community' name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenRepeatPassword} />} 
            secureTextEntry={showRepeatPassword ? false : true} />
        <Button title={'Unirse'} containerStyle={styles.btn} buttonStyle={styles.btnContent} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
    </View>
  )
}

export default RegisterForm

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    input: {
        width: '100%',
        marginTop: 20
    },
    icon: {
        color: '#c1c1c1'
    },
    btn: {
        marginTop: 20,
        width: '95%'
    },
    btnContent: {
        backgroundColor: '#00a680'
    }
})