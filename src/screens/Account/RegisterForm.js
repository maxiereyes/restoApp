import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input, Icon, Button } from '@rneui/base'
import { useFormik } from 'formik'
import { validationSchema } from '../../utils/validations'

const RegisterForm = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValue) => {
            console.log('Formulario enviado')
            console.log(formValue)
        }
    })

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
            rightIcon={<Icon type='material-community' name='eye-outline' iconStyle={styles.icon} />} secureTextEntry={true} />
        <Input 
            errorMessage={formik.errors.repeatPassword}
            onChangeText={text => formik.setFieldValue('repeatPassword', text)} 
            placeholder='Repetir Contraseña' 
            containerStyle={styles.input} 
            rightIcon={<Icon type='material-community' name='eye-outline' iconStyle={styles.icon} />} secureTextEntry={true} />
        <Button title={'Unirse'} containerStyle={styles.btn} buttonStyle={styles.btnContent} onPress={formik.handleSubmit}/>
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