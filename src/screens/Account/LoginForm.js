import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchemaLogin } from '../../utils/validations'
import Toast from 'react-native-toast-message'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils'

const LoginForm = () => {
    const navigation = useNavigation()
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
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
                navigation.navigate(screen.account.account)
            } catch (error) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Usuario o Contraseña incorrectos.'
                })
                console.log(error)
            }
        }
    })

  return (
    <View style={styles.container}>
      <Input 
        placeholder='Correo electronico' 
        containerStyle={styles.input} 
        onChangeText={text => formik.setFieldValue('email', text)} 
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
        errorMessage={formik.errors.email}
        />
      <Input 
        placeholder='Contraseña' 
        containerStyle={styles.input} 
        onChangeText={text => formik.setFieldValue('password', text)} 
        secureTextEntry={showPassword ? false : true}
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />}
        errorMessage={formik.errors.password}
        />
      <Button title={'Iniciar Sesion'} containerStyle={styles.btnContainer} buttonStyle={styles.btn} onPress={formik.handleSubmit} loading={formik.isSubmitting}/>
    </View>
  )
}

export default LoginForm

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
    btnContainer: {
        marginTop: 20,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
})