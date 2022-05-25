import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InfoUser from './InfoUser'
import { Button } from '@rneui/base'
import { getAuth, signOut } from 'firebase/auth'
import LoadingModal from '../../components/shared/LoadingModal'
import AccountOptions from './AccountOptions'

const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [_, setReload] = useState(false)

  const onReload = () => setReload(prevState => !prevState)

  const logout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <View style={styles.container}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload} />
      <Button title={'Cerrar Sesion'} buttonStyle={styles.btn} titleStyle={styles.title} onPress={logout} />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}

export default UserLoggedScreen

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 10
  },
  title: {
    color: '#00a680'
  }
})