import * as Yup from 'yup'

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string().email('El email no es correcto').required('El email es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
        repeatPassword: Yup.string().required('La contraseña es obligatoria').oneOf([Yup.ref('password')], 'Las contraseñas tienen que ser iguales').min(6, 'La contraseña debe tener al menos 6 caracteres')
    })
}

export const validationSchemaLogin = () => {
    return Yup.object({
        email: Yup.string().email('El email no es correcto').required('El email es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria'),
    })
}

export const validationSchemaName = () => {
    return Yup.object({
        name: Yup.string().required('El nombre y apellido es obligatorio'),
    })
}

export const validationSchemaChangePass = () => {
    return Yup.object({
        password: Yup.string().required('La contraseña es obligatoria'),
        newPassword: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
        repeatPassword: Yup.string().required('La contraseña es obligatoria').oneOf([Yup.ref('newPassword')], 'Las contraseñas tienen que ser iguales').min(6, 'La contraseña debe tener al menos 6 caracteres')
    })
}

export const validationSchemaAddResto = () => {
    return Yup.object({
        name: Yup.string().required('Campo obligatorio'),
        address: Yup.string().required('Campo obligatorio'),
        phone: Yup.string().required('Campo obligatorio'),
        email: Yup.string().email('No es una email valido').required('Campo obligatorio'),
        description: Yup.string().required('Campo obligatorio'),
        location: Yup.object().required('Localizacion requerida'),
        images: Yup.array().required('Imagen requerida').min(1, 'Debe subir al menos 1 imagen')
    })
}

export const validationSchemaAddReview = () => {
    return Yup.object({
        name: Yup.string().required('Campo obligatorio'),
        comment: Yup.string().required('Campo obligatorio'),
    })
}